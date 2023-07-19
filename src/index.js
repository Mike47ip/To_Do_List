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
    description: 'Pray',
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
    <ul class="Tasklist">
    <li>
     <input type="checkbox" name="checkbox" id="check" />${list.description}<span
      class="material-symbols-rounded"
     >
      delete
     </span>
    </li>
   </ul>`;
    taskcontainer.appendChild(li);
  });
};

displayList();
