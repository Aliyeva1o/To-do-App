const todosForm = document.querySelector('form')
const todoInput = document.querySelector('input')
const todosList=document.querySelector( '.todos__section__list')

const todoLastItem=document.querySelector('.todos__section__list__item')
const todoItemCheckbox = document.querySelector('.todos__section__list__item__checkbox')

// const todosClear= document.querySelector('.clearing__todos')



//  todosClear.addEventListener('click', function(e) {
//     console.log(e.target);
//     const element = document.getElementsByClassName("checked");
//     while (element.length > 0) {
//         element.remove();
//     }
//   })
// ;

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(allTodos);

if (allTodos.length > 0) {
  allTodos.forEach((todo) => {
    let listItem = createTodo(todo.todoContent, todo.id);
    todosList.insertAdjacentHTML("afterbegin", listItem);
  });
}
 
let listItems=[...allTodos]
let countOfTodos = allTodos.length; 
toggleFilterside(listItems, countOfTodos);
todosForm.addEventListener('submit', function(event){
    event.preventDefault();
    countOfTodos++;
    let listItem = createTodo(todoInput.value,countOfTodos);
    todosList.insertAdjacentHTML('afterbegin', listItem)
    listItems.push({
        id: countOfTodos,
        todoContent: todoInput.value,
        isCompeted: false,
      });
    
      localStorage.setItem("todos", JSON.stringify(listItems));
      todoInput.value = "";
      toggleFilterside(listItems, countOfTodos);
})

function getElement(element){
    if (!(element.firstElementChild.classList.contains("checked"))) {
        element.firstElementChild.classList.add('checked')
        let img = document.createElement('img');
        img.src='./assets/img/checked.svg';
        img.alt='checked'

        element.firstElementChild.appendChild(img);
        element.lastElementChild.style.textDecoration='line-through'
        element.lastElementChild.style.color='#9495A5'
    }
    else {
        element.firstElementChild.classList.remove("checked");
        element.firstElementChild.firstElementChild.remove();
        element.lastElementChild.style.textDecoration='none'
        element.lastElementChild.style.color='black'
    }
}
function createTodo(inputValue,todoID) {
    return ` <li onClick='getElement(this)' class="todos__section__list__item" id=${todoID}>
    <div class="todos__section__list__item-checkbox checked">

    </div>

    <p class="todos__section__list__item-text">
      ${inputValue}
    </p>
  </li>`;
}


function toggleFilterside(todos, todosLength) {
    todoLastItem.firstElementChild.firstElementChild.textContent = todosLength;
  
    if (todos.length !== 0) {
      todoLastItem.classList.remove("hidden");
    } else {
      todoLastItem.classList.add("hidden");
    }
  }
  


