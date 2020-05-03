const toDoList = document.querySelector(".js-todoList"),
    toDoForm = document.querySelector(".js-todoForm"),
    toDoInput = toDoForm.querySelector("input");

const TODOS_LS = "toDos";

let toDos = [];

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo) {
          paintToDos(todo.text);
        });
    }
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();
    const toDoText = toDoInput.value;
    paintToDos(toDoText);
    toDoInput.value = "";
}

function handleDeleteTask(event) {
    const buttonContainer = event.target.parentNode;
    const selectedLi = buttonContainer.parentNode;
    deleteSelectedLi(selectedLi);
    deleteToDo(selectedLi);
    saveToDos();
}

function deleteSelectedLi(selectedLi) {
    const list = selectedLi.parentNode;
    selectedLi.style.opacity = 0;
    setTimeout(function() {
        list.removeChild(selectedLi);
    }, 400);
}
  
function deleteToDo(selectedLi) {
    toDos = toDos.filter(function(todo) {
        return todo.id !== selectedLi.id;
    });
}

function paintToDos(text) {
    const li = document.createElement("li");
    const newId = ID();
  
    const delButton = document.createElement("button");
    delButton.innerText = "✖️";
    delButton.addEventListener("click", handleDeleteTask);
    const span = document.createElement("span");
    span.innerText = text;
    const div = document.createElement("div");
    div.appendChild(delButton);
  
    li.id = newId;
    li.appendChild(span);
    li.appendChild(div);
    li.style.opacity = 0;
  
    toDoList.appendChild(li);
    toDos.push({
      text: text,
      id: newId
    });
    saveToDos();

    setTimeout(function() {
        li.style.opacity = 1;
    }, 300);
}
  

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
  
var ID = function() {
    return (
        "_" +
        Math.random()
        .toString(36)
        .substr(2, 9)
    );
};    
  
init();
  