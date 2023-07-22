import { getTaskListFromLocalStorage, saveTaskListToLocalStorage } from './events.js';
import displayTasks from './display.js';

// Function to add a new task to the list
const addTask = () => {
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
};

export default addTask;