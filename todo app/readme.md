Basic Todo App

A simple and interactive Todo app built with vanilla JavaScript for practicing front-end development concepts such as DOM manipulation, event handling, and localStorage.
Features
Add new Todo items.
Mark Todo items as completed.
Delete Todo items.
Persist Todo items using localStorage.
Technologies Used
HTML
CSS
JavaScript (Vanilla)
Installation
Clone or download the repository.
git clone https://github.com/yourusername/todo-app.git
Open the index.html file in your browser.
open index.html
File Structure
todo-app/
├── index.html       # Main HTML file
├── styles.css       # Styling for the app
└── app.js           # JavaScript file for app logic
index.html
Contains the basic structure and layout of the Todo app.
styles.css
Contains basic styling for the Todo app to make it look neat and organized.
app.js
Contains the JavaScript logic for adding, deleting, and marking Todo items.
Usage
Adding a Todo:
Type your task in the input field and click the "Add Todo" button (or press Enter).
Marking a Todo as completed:
Click on the Todo item to toggle its completion status (marked with a strikethrough).
Deleting a Todo:
Click the "Delete" button next to the Todo item to remove it.
Persistence:
Your Todo items will remain even after a page reload, thanks to localStorage.
Code Explanation
HTML:
The structure of the app consists of an input field, a button to add new Todo items, and a list to display the Todo items.
CSS:
The app has minimal styling to ensure a clean and functional UI.
JavaScript:
DOM manipulation is used to create new list items, update the state (marking as completed), and delete items.
localStorage is used to save the list of todos so that when you refresh the page, your todos remain intact.
Example of app.js
document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const addButton = document.getElementById("addButton");
    const todoList = document.getElementById("todoList");

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Render todos
    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.textContent = todo.text;
            li.classList.toggle("completed", todo.completed);

            // Toggle completion
            li.addEventListener("click", () => {
                todo.completed = !todo.completed;
                updateLocalStorage();
                renderTodos();
            });

            // Delete todo
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                todos.splice(index, 1);
                updateLocalStorage();
                renderTodos();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    // Update localStorage
    function updateLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Add a new todo
    addButton.addEventListener("click", () => {
        const newTodo = {
            text: todoInput.value,
            completed: false,
        };
        todos.push(newTodo);
        todoInput.value = ""; // Clear input
        updateLocalStorage();
        renderTodos();
    });

    // Initial rendering of todos
    renderTodos();
});
How to Contribute
Feel free to fork the repository and make your changes! If you have any improvements or suggestions, open an issue or create a pull request.
