import './style.css';
import displayTasks from './modules/display.js';
import addTask from './modules/addTask.js';
import { getTaskListFromLocalStorage, saveTaskListToLocalStorage } from './modules/events.js';

// Function to clear all completed tasks (checkbox checked)
const clearCompletedTasks = () => {
  const taskList = getTaskListFromLocalStorage();

  // Use the filter() method to create a new array containing only the incomplete tasks
  const incompleteTasks = taskList.filter((task) => !task.checked);

  incompleteTasks.forEach((task, i) => {
    task.index = i + 1;
  });

  // Save the updated task list to local storage
  saveTaskListToLocalStorage(incompleteTasks);

  // Display the updated task list
  displayTasks(incompleteTasks);
};

// Load the initial tasks on page load
const addButton = document.getElementById('keyboard_return');
addButton.addEventListener('click', addTask);

const clearButton = document.getElementById('clearCompletedButton'); // Use the "id" attribute
clearButton.addEventListener('click', clearCompletedTasks);

const initialTaskList = getTaskListFromLocalStorage();
displayTasks(initialTaskList);
