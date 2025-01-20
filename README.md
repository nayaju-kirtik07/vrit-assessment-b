# Kanban Board

A simple, interactive Kanban board built with React and TypeScript.

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/nayaju-kirtik07/vrit-assessment-b.git
   ```

2. Navigate to the project directory:

   ```sh
   cd vrit-assessment-b
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Technology Choices and Rationale

- **React**: Component-based architecture allows for modular and reusable code. The virtual DOM ensures efficient rendering and updates.
- **TypeScript**: Adds static typing to catch errors early, improves code quality, and enhances developer experience with better autocompletion and refactoring tools.
- **CSS Modules**: Ensures style encapsulation and avoids naming conflicts.
- **localStorage**: Provides simple client-side storage without requiring a backend.

---

## Known Limitations & Trade-offs

1. **Client-side Storage**: Data is stored only in the user's browser, limiting sharing across devices.
2. **Performance with Large Datasets**: May face issues handling a large number of tasks or columns.
3. **Basic Styling**: Current CSS is minimal and may not align with all design preferences.
4. **No User Authentication**: Anyone with access to the URL can modify the board.
5. **Limited Undo Functionality**: No built-in way to undo actions like deleting columns or tasks.

---

## Future Improvements

- **Backend Integration**: Store data on a server for multi-user collaboration and cross-device sync.
- **Drag and Drop Library**: Use `react-beautiful-dnd` for smooth interactions.
- **User Authentication**: Implement user accounts for personalized boards.
- **Rich Text Editing**: Enable formatted task descriptions.
- **Subtasks & Checklists**: Add nested task management.
- **Search & Filter**: Implement task search and filtering.
- **Data Export/Import**: Allow users to save and restore board data.
- **Theming**: Enable user-customizable themes.
- **Undo/Redo Functionality**: Implement an action history stack.
- **Performance Optimizations**: Use virtualization for large task lists.
- **Accessibility Enhancements**: Improve keyboard navigation and screen reader support.

---

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.
