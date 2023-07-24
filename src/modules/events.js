// import displayTasks from './display.js';

// Function to retrieve the task list from local storage
const getTaskListFromLocalStorage = () => {
  const taskListString = localStorage.getItem('taskList');
  return taskListString ? JSON.parse(taskListString) : [];
};

// Function to save the task list to local storage
const saveTaskListToLocalStorage = (taskList) => {
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

// export default handleKeyPress;
export { getTaskListFromLocalStorage, saveTaskListToLocalStorage };
