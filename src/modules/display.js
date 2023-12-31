import { getTaskListFromLocalStorage, saveTaskListToLocalStorage } from './events.js';

// Function to update the text of a task
const updateTaskText = (index, newText, isChecked) => {
  const taskList = getTaskListFromLocalStorage();
  const taskToEdit = taskList.find((task) => task.index === index);

  if (!taskToEdit) {
    return;
  }

  taskToEdit.text = newText;
  taskToEdit.checked = isChecked || false;
  saveTaskListToLocalStorage(taskList);
};

const findParentListItem = (index) => {
  const customDeleteIcon = document.getElementById(`deleteBtn${index}`);
  if (!customDeleteIcon) {
    return null;
  }
  return customDeleteIcon.closest('li');
};

const deleteTask = (index) => {
  const taskList = getTaskListFromLocalStorage();

  if (index >= 1 && index <= taskList.length) {
    taskList.splice(index - 1, 1);

    // Update the indexes of remaining tasks
    taskList.forEach((task, i) => {
      task.index = i + 1;
    });

    saveTaskListToLocalStorage(taskList);
  }
};

const displayTasks = (taskList) => {
  const taskListElement = document.querySelector('.taskList');
  if (!taskListElement) {
    return;
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
    customDeleteIcon.classList.add('custom-delete-icon');

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(customDeleteIcon);

    // Add blur event listener to the taskText to save the task when the user finishes editing
    taskText.addEventListener('blur', () => {
      const newText = taskText.textContent.trim();
      if (newText !== task.text) {
        updateTaskText(task.index, newText, task.checked);
      }
    });

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
};

export default displayTasks;