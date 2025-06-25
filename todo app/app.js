// Get the necessary DOM elements
let taskInput = document.getElementById('input1');
let addItem = document.getElementById('add');
let resultBox = document.querySelector('.result');

// Event listener for the Add button
addItem.addEventListener("click", () => {
    const taskValue = taskInput.value.trim();

    // Ensure that the task is not empty
    if (taskValue === "") {
        console.log("error found: task is empty");
        return;
    }

    // Create the task div container
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');

    // Create the task text span
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    taskDiv.appendChild(taskText);

    // Create the Done button
    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.classList.add('done-btn');
    doneBtn.addEventListener('click', () => {
        // Toggle the line-through effect when Done button is clicked
        taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    });

    // Create the Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        // Remove the task div when Cancel button is clicked
        taskDiv.remove();
    });

    // Append the buttons to the task div
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(doneBtn);
    buttonsDiv.appendChild(cancelBtn);
    taskDiv.appendChild(buttonsDiv);

    // Append the task div to the result container
    resultBox.appendChild(taskDiv);

    // Clear the input field
    taskInput.value = "";
});
