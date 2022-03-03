

const localUrl = 'http://localhost:3000/';

async function getElement() {
  const response = await fetch(`${localUrl}todos`);
  const data = await response.json();
  return data;
}

function creatFetch(payload) {
  fetch(`${localUrl}todos`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })
}

function deleteFetch(id) {
  fetch(`${localUrl}todos/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

function updateFetch(payload,id) {
  fetch(`${localUrl}todos/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

const mainForm = document.querySelector('.main_form');
mainForm.addEventListener('submit', addTodo);

function addTodo(event) {
  event.preventDefault();
  let payload = {};
  for (let i = 0; i < event.target.length; i++) {
    let { name, type, checked, value } = event.target[i];
    if (type === 'checkbox') {
      payload[name] = checked;
    }
    else if (name) {
      payload[name] = value;
    }
  }
  creatFetch(payload);
  // updateFetch(payload);
}
async function addTodoModal(event) {
  event.preventDefault();
  let payload = {};
  for (let i = 0; i < event.target.length; i++) {
    let { name, type, checked, value, id } = event.target[i];
    if (type === 'checkbox') {
      payload[name] = checked;
    }
    else if (name) {
      payload[name] = value;
    }
  }
  const info = await getElement();
  let idValue = '';
  info.forEach(todo=>{
    idValue = todo.id;
  })
  // creatFetch(payload);
  updateFetch(payload, idValue);
}

async function creatListTodo() {
  const info = await getElement();
  let todoHtml = '';
  info.forEach(todo => {
    let { title, description, priority, id } = todo;
    todoHtml += `
    <li>
      <p><span>Title:</span> ${title}</p>
      ${description ? `<p><span>Description:</span> ${description}</p>` : ''}
      ${priority ? `<p>High priority!</p>` : ''} 
      <button id=${id}>Delete</button>
      <button class = 'update' value = 'update' id=${id}>Update</button>
    </li>
    `
  })
  const todoList = document.querySelector('.todo_list');
  todoList.innerHTML = todoHtml;
  todoList.addEventListener('click', event => {
    if (event.target.value == 'update') {
      const updateButton = document.querySelectorAll('.update');
      const outModal = document.querySelector('.out_window');

      updateButton.forEach(button => {
        button.addEventListener('click', () => {
          outModal.classList.add('active');
        });
      })

      const closeButton = document.querySelector('.button_close');

      closeButton.addEventListener('click', () => {
        outModal.classList.remove('active');
      })

      const modalForm = document.querySelector('.modal_form');
      modalForm.addEventListener('submit', addTodoModal);


    }
    else {
      deleteFetch(event.target.id);
    }
  })
}
creatListTodo();





