import './style.css';

// Function to save the task list to local storage
function saveTaskListToLocalStorage(taskList) {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

// Function to retrieve the task list from local storage
function getTaskListFromLocalStorage() {
  const taskListString = localStorage.getItem('taskList');
  return taskListString ? JSON.parse(taskListString) : [];
}

// Function to update the text of a task
function updateTaskText(index, newText) {
  if (newText !== '') {
    const taskList = getTaskListFromLocalStorage();
    const taskToEdit = taskList.find((task) => task.index === index);

    if (!taskToEdit) {
      return;
    }

    taskToEdit.text = newText;
    saveTaskListToLocalStorage(taskList);
  }
}

function displayTasks(taskList) {
  const taskListElement = document.getElementById('tasklistDiv');
  taskListElement.innerHTML = '';

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
  taskList.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;
    listItem.setAttribute('contenteditable', 'true'); // Add the contenteditable attribute

    listItem.addEventListener('input', () => {
      updateTaskText(task.index, listItem.textContent.trim());
    });

    const deleteButton = document.createElement('button');
    deleteButton.onclick = () => deleteTask(task.index);

    listItem.appendChild(deleteButton);
    taskListElement.appendChild(listItem);
  });
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
  };

  taskList.push(newTask);
  saveTaskListToLocalStorage(taskList);

  newTaskInput.value = '';
  displayTasks(taskList);
}

// Load the initial tasks on page load
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addButton');
  addButton.innerText = 'Add Task';
  addButton.addEventListener('click', addTask);

  const initialTaskList = getTaskListFromLocalStorage();
  displayTasks(initialTaskList);
});
