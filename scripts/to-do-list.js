const todoList = JSON.parse(localStorage.getItem('todo')) || [{
  name: '',
  dueDate: ''}
];

renderTodoList();

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateElement = document.querySelector('.js-date-input');
  const dueDate = dateElement.value;

  todoList.push({
    name, dueDate}
  );
  
  renderTodoList();
  inputElement.value = '';
}


function renderTodoList(){
  let todoListHtml = '';

  todoList.forEach((todoObject, i) => {
    const {name, dueDate} = todoObject;
    
    todoString = JSON.stringify(todoList);
    localStorage.setItem('todo', todoString);

    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-button js-delete-button" onclick="
        deleteTodo(${i});
      ">Delete</button>`;
    todoListHtml += html;
  })

  document.querySelector('.js-list-content')
    .innerHTML = todoListHtml;
  
  document.querySelectorAll('.js-delete-button')
  
    .forEach((deleteButon, i) => {
      deleteButon.addEventListener('click', () => {
        todoList.splice(i, 1);
        renderTodoList();
      })
    });
  
}
