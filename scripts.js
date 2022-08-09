const inputElement = document.querySelector(".new-task-input");
const addButton = document.querySelector(".new-task-button");
const taskConteiner = document.querySelector('.task-conteiner');


function validaInput() {
  return inputElement.value.trim().length > 0;
};

function AddTesk() {
  const inputValido = validaInput();

  console.log(validaInput);

  if (!inputValido) {
    return inputElement.classList.add("error");
  }
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  const itemText = document.createElement('p');
  itemText.innerText = inputElement.value;

  const delItem = document.createElement('i');
  delItem.classList.add('fa-solid');
  delItem.classList.add('fa-trash-can');

  delItem.addEventListener('click', () => delTask(taskItem, itemText));

  taskItem.appendChild(itemText);
  taskItem.appendChild(delItem);

  taskConteiner.appendChild(taskItem);

  inputElement.value = "";

  updateLocalStorage();
};

function delTask(taskItem, itemText){
  const tasks = taskConteiner.childNodes;

  for (const task of tasks){
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(itemText);

    if(currentTaskIsBeingClicked);{
      taskItem.remove();
    }
  }

  updateLocalStorage();
};

function inputChange() {
  const inputValido = validaInput();

  if (inputValido) {
    return inputElement.classList.remove("error");
  }
};

function updateLocalStorage(){
  const tasks = taskConteiner.childNodes;

  const localStorageTasks = [... tasks].map(task =>{
    const content = task.firstChild;
    const isCompleted = content.classList.contains('completed');
    return{description:content.innerText, isCompleted: isCompleted};
  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

};

function refreshTasck(){
  const taksLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if(!taksLocalStorage) return;

  for (const task of taksLocalStorage){
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
  
    const itemText = document.createElement('p');
    itemText.innerText = task.description;
    
    if(task.isCompleted){
      itemText.classList.add('completed');
    }
  
    const delItem = document.createElement('i');
    delItem.classList.add('fa-solid');
    delItem.classList.add('fa-trash-can');
  
    delItem.addEventListener('click', () => delTask(taskItem, itemText));
  
    taskItem.appendChild(itemText);
    taskItem.appendChild(delItem);
  
    taskConteiner.appendChild(taskItem);
  }

}

refreshTasck();
addButton.addEventListener('click', () => AddTesk());
inputElement.addEventListener('change', () => inputChange());