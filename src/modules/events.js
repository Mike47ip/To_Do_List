import displayTasks from './display.js';

// Function to retrieve the task list from local storage
const getTaskListFromLocalStorage = () => {
  const taskListString = localStorage.getItem('taskList');
  return taskListString ? JSON.parse(taskListString) : [];
};

// Function to save the task list to local storage
const saveTaskListToLocalStorage = (taskList) => {
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

// Function to clear all completed tasks (checkbox checked)
const clearCompletedTasks = () => {
  const taskList = getTaskListFromLocalStorage();

  // Use the filter() method to create a new array containing only the incomplete tasks
  const incompleteTasks = taskList.filter((task) => !task.checked);

  // Save the updated task list to local storage
  saveTaskListToLocalStorage(incompleteTasks);

  // Display the updated task list
  displayTasks(incompleteTasks);
};

// export default handleKeyPress;
export { getTaskListFromLocalStorage, saveTaskListToLocalStorage, clearCompletedTasks };
