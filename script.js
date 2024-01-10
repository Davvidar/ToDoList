const date = document.querySelector("#date-sec")
const list = document.querySelector("#task-list")
const input = document.querySelector("#input")
const descriptionInput = document.querySelector('#inputD')
const btnEnter = document.querySelector("#enter")
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineT = 'lineT'
let id 
let listArray

// FECHA //
const DATE = new Date()
date.innerHTML = DATE.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' })

// ADD TASKS //
function addTask(task, id, done, removed, description) {
    if (removed) { return; }

    const DONE = done ?check : uncheck
    const LINE = done ?lineT : ''

    const liElement = `
                <li class="item half" draggable="true" id="liElement">
                    <i class="fas fa-grip-lines"></i>
                    <i class=" far ${DONE}" data="done" id='${id}'></i>

                    <div class="tab details">
                        <input id="tab${id}" type="checkbox" name="tabs">
                            <label for="tab${id}">
                                 <p class="text ${LINE}" data-id="${id}">${task}</p>
                            </label>
                    <div class="tab-content">
                     <p class="text ${LINE}" data-id="${id}">${description}</p>
                        
                    </div>
                </div>
                    <i class="far fa-edit" onclick="openModal()"></i>
                    <i class="fas fa-trash de" data="removed" id='${id}'></i>
                  </li>   
    `;
    list.insertAdjacentHTML("beforeend", liElement);
}

btnEnter.addEventListener('click', () => {
    const task = input.value;
    const description = descriptionInput.value;
    if (task) {
        addTask(task, id, false, false, description);
        listArray.push({
            
            name: task,
            id: id,
            done: false,
            removed: false,
            description: description
        });
        localStorage.setItem('ToDo', JSON.stringify(listArray));
        input.value = "";
        descriptionInput.value = ""
        id++;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const task = input.value;
        const description = descriptionInput.value;
        if (task) {
            addTask(task, id, false, false, description);
            listArray.push({
                
                name: task,
                id: id,
                done: false,
                removed: false,
                description: description
            });
            localStorage.setItem('ToDo', JSON.stringify(listArray));
            input.value = "";
            descriptionInput.value = ""
            id++;
        }
    }
});

function taskDone(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineT);
    listArray[element.id].done = listArray[element.id].done ? false : true;
}

list.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData === 'done') {
        taskDone(element);
    } else if (elementData === 'removed') {
        taskUndone(element);
    }
    localStorage.setItem('ToDo', JSON.stringify(listArray));
});

function taskUndone(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listArray[element.id].removed = true;
}
// Obtener el name de usuario almacenado en el almacenamiento de sesión

let username = sessionStorage.getItem('username');

// Actualizar el mensaje de bienvenida en el perfil
if (username) {
    document.getElementById('welcomeMessage').innerText = 'Hola, ' + username + '!';
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
        addTask(i.name, i.id, i.done, i.removed, i.description);
    });
}

//MODAL
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function guardarTarea() {
    let taskModal = document.getElementById('tarea').value;
    let descripion = document.getElementById('descripcion').value;

    console.log('Tarea:', tarea);
    console.log('Descripción:', descripcion);

    // Cerrar el modal después de guardar
    closeModal();
}



