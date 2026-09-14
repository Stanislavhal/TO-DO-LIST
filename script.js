const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const completedList = document.querySelector("#completed-list");
const clearCompletedButton = document.querySelector("#clear-completed");
const completedCount = document.querySelector("#completed-count");

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

tasks.forEach((task) => {
    createTask(task);
});

function createTask(task) {
    const li = document.createElement("li");
    
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;
    li.appendChild(taskTextElement);

    const doneButton = document.createElement("button");
    doneButton.textContent = "○";

    li.prepend(doneButton);

    doneButton.addEventListener("click", () => {
        task.completed = !task.completed;

        if(task.completed) {
            completedList.appendChild(li);
            doneButton.textContent = "✓";
            li.classList.add("completed");
        } else {
            taskList.appendChild(li);
            doneButton.textContent = "○"
            li.classList.remove("completed");
        }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCompletedCount();
});

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    li.appendChild(editButton);

    editButton.addEventListener("click", () => {
    const newText = prompt("Edit task:", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        taskTextElement.textContent = task.text;

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    li.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((item) => item !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    li.remove();
    updateCompletedCount();
});

    if (task.completed) {
        completedList.appendChild(li);
        doneButton.textContent = "✓";
        li.classList.add("completed");
    } else {
        taskList.appendChild(li);
    }
}

function updateCompletedCount() {
    completedCount.textContent = tasks.filter((task) => task.completed).length;
}

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(task);

    taskInput.value = "";
    updateCompletedCount();
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    completedList.innerHTML = "";
    updateCompletedCount();
});

updateCompletedCount();