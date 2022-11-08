const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const cleatAll = document.querySelector(".clear-btn");

let editId;
let isEditedTask = false;
// 2
// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

// 8
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

// 3
function showTodo(filter) {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      // if todo is completed, set the isConmpleted value to check
      let isConmpleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isConmpleted} />
                            <p class="${isConmpleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)">|||</i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')"><i><img src="images/pencil.svg" alt="img"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i><img src="images/trash.svg" alt="img"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
      }
    });
  }
  // if li isn't empty, insert this value inside taskbox else insert span
  taskBox.innerHTML = li || `<span>You don't have any task</<span>`;
}

showTodo("all");
// 4
function showMenu(selectedTask) {
  // getting task menu div
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  // removing show class form task menu on the documnet click
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}
// 7
function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}
// 6
function deleteTask(deleteId) {
  // removing selcted task from array/todos
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
}
// 9
cleatAll.addEventListener("click", () => {
  // removing all items of array/todos
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
});

// 5
function updateStatus(selectedTask) {
  // getting paragraph that contains task
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // update the status of selected task to completed
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    // update the status of selected task to pending
    todos[selectedTask.id].status = "pending";
  }
  //saving the updated status to localstorage
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
// 1
// the main functon || event
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim(); //trim() prevent user from submitting empty value
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      // if isEditedTask isn't true
      if (!todos) {
        // if todos isn't exit, pass an empty array to todos
        todos = [];
      }
      let taskInfo = {
        // creating object for tasks
        name: userTask,
        status: "pending",
      };
      todos.push(taskInfo); // adding new task to todos
    } else {
      isEditedTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
  }
});