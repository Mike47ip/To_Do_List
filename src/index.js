import './style.css';

// Function to retrieve the task list from local storage
function getTaskListFromLocalStorage() {
  const taskListString = localStorage.getItem('taskList');
  return taskListString ? JSON.parse(taskListString) : [];
}

// Function to save the task list to local storage
function saveTaskListToLocalStorage(taskList) {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

// Function to update the text of a task
function updateTaskText(index, newText, isChecked) {
  const taskList = getTaskListFromLocalStorage();
  const taskToEdit = taskList.find((task) => task.index === index);

  if (!taskToEdit) {
    return;
  }

  taskToEdit.text = newText;
  taskToEdit.checked = isChecked || false; // Save the checkbox state in the task object
  saveTaskListToLocalStorage(taskList);
}

// Function to add a new task to the list
function addTask() {
  const newTaskInput = document.getElementById('inputPlaceholder');
  const newTaskText = newTaskInput.value.trim();

  if (!newTaskText) {
    return;
  }

  const taskList = getTaskListFromLocalStorage();

  const newTask = {
    text: newTaskText,
    index: taskList.length + 1,
    checked: false, // Set the checkbox state to false (unchecked) for new tasks
  };

  taskList.push(newTask);
  saveTaskListToLocalStorage(taskList);

  newTaskInput.value = '';
  displayTasks(taskList);
}

// Function to handle key press events on the input field
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// New Changes: Add function to find parent li element based on the clicked delete icon
function findParentListItem(index) {
  const customDeleteIcon = document.getElementById(`deleteBtn${index}`);
  if (!customDeleteIcon) {
    return null;
  }
  return customDeleteIcon.closest('li');
}

// Function to delete a task from the list
function deleteTask(index) {
  const taskList = getTaskListFromLocalStorage();

  if (index >= 1 && index <= taskList.length) {
    taskList.splice(index - 1, 1);

    // Update the indexes of remaining tasks
    taskList.forEach((task, i) => {
      task.index = i + 1;
    });

    saveTaskListToLocalStorage(taskList);
    displayTasks(taskList);
  }
}

function displayTasks(taskList) {
  const taskListElement = document.querySelector('.taskList');
  if (!taskListElement) {
    return; // Exit the function if the task list element is not found
  }
  taskListElement.innerHTML = '';

  taskList.forEach((task) => {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.type = 'checkbox';
    checkbox.checked = task.checked;

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const taskText = document.createElement('span');
    taskText.classList.add('taskText');
    taskText.textContent = task.text;
    taskText.setAttribute('contenteditable', 'true');

    const customDeleteIcon = document.createElement('span');
    customDeleteIcon.innerHTML = `<span id="deleteBtn${task.index}" class="material-symbols-outlined"> delete </span>`;
    customDeleteIcon.classList.add('custom-delete-icon'); // Add your custom class for the icon

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(customDeleteIcon);

    listItem.appendChild(taskContainer);

    // Add an event listener to the customDeleteIcon to delete the task when clicked
    customDeleteIcon.addEventListener('click', () => {
      const parentListItem = findParentListItem(task.index);
      if (parentListItem) {
        parentListItem.remove();
        deleteTask(task.index); // Call deleteTask function when the custom icon is clicked
      }
    });

    // Add an event listener to the checkbox to update the "checked" attribute
    checkbox.addEventListener('change', () => {
      updateTaskText(task.index, task.text, checkbox.checked);
    });

    taskListElement.appendChild(listItem);
  });
}

// Function to clear all completed tasks (checkbox checked)
function clearCompletedTasks() {
  const taskList = getTaskListFromLocalStorage();

  // Loop through the taskList in reverse to avoid index shifting issues
  for (let i = taskList.length - 1; i >= 0; i -= 1) {
    if (taskList[i].checked) {
      taskList.splice(i, 1); // Remove the completed task from the taskList
    }
  }

  // Save the updated task list to local storage
  saveTaskListToLocalStorage(taskList);

  // Display the updated task list
  displayTasks(taskList);
}

// Load the initial tasks on page load
const addButton = document.getElementById('keyboard_return');
addButton.addEventListener('click', addTask);

const clearButton = document.getElementById('clearCompletedButton'); // Use the "id" attribute
clearButton.addEventListener('click', clearCompletedTasks);

const initialTaskList = getTaskListFromLocalStorage();
displayTasks(initialTaskList);

const newTaskInput = document.getElementById('inputPlaceholder');
newTaskInput.addEventListener('keypress', handleKeyPress);
