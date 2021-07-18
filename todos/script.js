const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const todosEl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    })
}

console.log(todos);
function addTodo(todo) {
    let todoText = inputEl.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;
        todosEl.appendChild(todoEl);
        inputEl.value = "";

        updateLS();

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();

            updateLS();
        });
    }


}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
})

function updateLS() {
    const todoEls = document.querySelectorAll('li');
    const todos = [];

    todoEls.forEach((todo) => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));

}