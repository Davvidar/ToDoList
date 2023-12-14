const date = document.querySelector("#date-sec")
const list = document.querySelector("#task-list")
const input = document.querySelector("#input")
const btnEnter = document.querySelector("#enter")
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const linteThrough = 'line-through'
let id 
let listArray

// FECHA //
const DATE = new Date()
date.innerHTML = DATE.toLocaleDateString('es', { weekday: 'long', month: 'short', day: 'numeric' })

// ADD TASKS //
function addTask(task, id, realizado, eliminado, descripcion) {
    if (eliminado) { return; }

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? linteThrough : ''

    const liElement = `
        <li id="liElement">
            <i class="far ${REALIZADO}" data="realizado" id='${id}'></i>
            <p class="text ${LINE}" data-id="${id}">${task}</p>
            <i class="fas fa-trash de" data="eliminado" id='${id}'></i>
            <div class="dropdown">
                <button class="dropbtn">Descripción</button>
                <div class="dropdown-content">
                    <p>${descripcion}</p>
                </div>
            </div>
        </li>    
    `;
    list.insertAdjacentHTML("beforeend", liElement);
}

btnEnter.addEventListener('click', () => {
    const task = input.value;
    const descripcion = "Descripción de la tarea"; // Puedes obtener la descripción de alguna manera
    if (task) {
        addTask(task, id, false, false, descripcion);
        listArray.push({
            nombre: task,
            id: id,
            realizado: false,
            eliminado: false,
            descripcion: descripcion
        });
        localStorage.setItem('ToDo', JSON.stringify(listArray));
        input.value = "";
        id++;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const task = input.value;
        const descripcion = "Descripción de la tarea"; // Puedes obtener la descripción de alguna manera
        if (task) {
            addTask(task, id, false, false, descripcion);
            listArray.push({
                nombre: task,
                id: id,
                realizado: false,
                eliminado: false,
                descripcion: descripcion
            });
            localStorage.setItem('ToDo', JSON.stringify(listArray));
            input.value = "";
            id++;
        }
    }
});

function taskDone(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(linteThrough);
    listArray[element.id].realizado = listArray[element.id].realizado ? false : true;
}

list.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData === 'realizado') {
        taskDone(element);
    } else if (elementData === 'eliminado') {
        taskUndone(element);
    }
    localStorage.setItem('ToDo', JSON.stringify(listArray));
});

function taskUndone(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listArray[element.id].eliminado = true;
}

let data = localStorage.getItem('ToDo');
if (data) {
    listArray = JSON.parse(data);
    id = listArray.length;
    loadList(listArray);
} else {
    listArray = [];
    id = 0;
}

function loadList(DATA) {
    DATA.forEach(function (i) {
        addTask(i.nombre, i.id, i.realizado, i.eliminado, i.descripcion);
    });
}