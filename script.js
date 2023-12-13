const date = document.querySelector("#date-sec")
const list = document.querySelector("#task-list")
const input = document.querySelector("#input")
const btnEnter = document.querySelector("#enter")


//ADD TASKS//

function addTask(tarea){
    const element = `
                    <i class="far fa-circle co" data="realizado" id="0"></i>
                    <p class="text ">${tarea}</p>
                    <i class="fas fa-trash de" data="realizado" id="0"></i>
                    `
    list.insertAdjacentHTML("beforeend", element)
}

btnEnter.addEventListener('click', ()=>{

    const task =input.value
    if(task){
        addTask(task)
    }
})