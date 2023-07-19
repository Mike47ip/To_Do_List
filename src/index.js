import './style.css';

const listArray = [
  {
    description: 'Go on holidays',
    completed: false,
    index: '1',
  },
  {
    description: 'Wash utensils',
    completed: false,
    index: '2',
  },
  {
    description: 'Watch movies',
    completed: false,
    index: '3',
  }, {
    description: 'Pray to God',
    completed: false,
    index: '3',
  },
];

const taskcontainer = document.querySelector('.tasklist');
taskcontainer.innerHTML = '';

const displayList = () => {
  listArray.forEach((list) => {
    const li = document.createElement('li');
    li.classList.add('newlist');
    li.innerHTML = `
    <ul class="list">
      <li>
       <input type="checkbox" name="checkbox" id="check" />
       <label for="label">${list.description}</label
       ><span class="material-symbols-outlined"> more_vert </span>
      </li>
     </ul>`;
    taskcontainer.appendChild(li);
  });
};

displayList();
