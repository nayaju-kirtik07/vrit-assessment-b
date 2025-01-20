import React, { useState, useEffect } from "react";
import "./Kanban.css";

// Define types
type Task = {
  id: string;
  content: string;
};

type Column = {
  title: string;
  tasks: Task[];
};

type Columns = Record<string, Column>;

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(() => {
    const savedColumns = localStorage.getItem("kanban-columns");
    return savedColumns ? (JSON.parse(savedColumns) as Columns) : {};
  });
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [newTasks, setNewTasks] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns]);

  const handleAddColumn = (): void => {
    if (!newColumnTitle.trim()) return;
    const columnId = Date.now().toString();
    setColumns((prev) => ({
      ...prev,
      [columnId]: { title: newColumnTitle, tasks: [] },
    }));
    setNewColumnTitle("");
  };

  const handleDeleteColumn = (columnId: string): void => {
    setColumns((prev) => {
      const updatedColumns = { ...prev };
      delete updatedColumns[columnId];
      return updatedColumns;
    });
  };

  const handleAddTask = (columnId: string): void => {
    const taskContent = newTasks[columnId]?.trim();
    if (!taskContent) return;

    const newTask: Task = { id: Date.now().toString(), content: taskContent };
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask],
      },
    }));
    setNewTasks((prev) => ({ ...prev, [columnId]: "" }));
  };

  const handleDeleteTask = (columnId: string, taskId: string): void => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter((task) => task.id !== taskId),
      },
    }));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
    columnId: string
  ): void => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("columnId", columnId);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumnId: string
  ): void => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("columnId");

    if (sourceColumnId === targetColumnId) return;

    setColumns((prev) => {
      const task = prev[sourceColumnId].tasks.find((t) => t.id === taskId);
      if (!task) return prev;

      return {
        ...prev,
        [sourceColumnId]: {
          ...prev[sourceColumnId],
          tasks: prev[sourceColumnId].tasks.filter((t) => t.id !== taskId),
        },
        [targetColumnId]: {
          ...prev[targetColumnId],
          tasks: [...prev[targetColumnId].tasks, task],
        },
      };
    });
  };

  return (
    <div className="kanban-board">
      <div className="add-column-section">
        <input
          type="text"
          className="input-field"
          placeholder="Enter column title"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
        />
        <button type="button" className="add-column-button" onClick={handleAddColumn}>
          Add Column
        </button>
      </div>

      <div className="columns">
        {(Object.entries(columns) as [string, Column][]).map(
          ([columnId, column]) => (
            <div
              key={columnId}
              className="column"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              <div className="column-header">
                <h3>{column.title}</h3>
                <button type="button"
                  className="delete-column-button"
                  onClick={() => handleDeleteColumn(columnId)}
                >
                  Delete
                </button>
              </div>
              <div className="tasks">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, columnId)}
                  >
                    {task.content}
                    <button type="button"
                      className="delete-task-button"
                      onClick={() => handleDeleteTask(columnId, task.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="add-task-container">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter task"
                  value={newTasks[columnId] || ""}
                  onChange={(e) =>
                    setNewTasks((prev) => ({
                      ...prev,
                      [columnId]: e.target.value,
                    }))
                  }
                />
                <button type="button"
                  className="add-task-button"
                  onClick={() => handleAddTask(columnId)}
                >
                  Add Task
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
