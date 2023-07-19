import './style.css';

const listArray = [
  {
    description: 'Go on holidays',
    completed: true,
    index: '1',
  },
  {
    description: 'Wash utensils',
    completed: true,
    index: '2',
  },
  {
    description: 'Wash movies',
    completed: true,
    index: '3',
  },
];

const taskcontainer = document.querySelector('tasklist');
taskcontainer.innerHTML = '';

const displayList = () => {
  listArray.forEach((list) => {
    const li = document.createElement('li');
    li.classList.add('newlist');
    li.innerHTML = ~=`
    `

  })
};