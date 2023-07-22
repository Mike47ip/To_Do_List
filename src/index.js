import './style.css';
import displayTasks from './modules/display.js';
import addTask from './modules/addTask.js';
import { clearCompletedTasks, getTaskListFromLocalStorage } from './modules/events.js';

// Load the initial tasks on page load
const addButton = document.getElementById('keyboard_return');
addButton.addEventListener('click', addTask);

const clearButton = document.getElementById('clearCompletedButton'); // Use the "id" attribute
clearButton.addEventListener('click', clearCompletedTasks);

const initialTaskList = getTaskListFromLocalStorage();
displayTasks(initialTaskList);
