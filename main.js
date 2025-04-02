let ul = document.querySelector("ul");
let buttonSend = document.querySelector(".send-button");
let input = document.querySelector(".input-text");
let editing = null;
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  ul.innerHTML = "";
  tasks.forEach((task) => createTaskElement(task));
}
buttonSend.addEventListener("click", (e) => {
  e.preventDefault();
  let taskText = input.value.trim();
  if (taskText === "") {
    alert("narsa kirit");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (editing) {
    let oldText = editing.querySelector("p").textContent;
    let index = tasks.indexOf(oldText);
    if (index !== -1) {
      tasks[index] = taskText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    editing.querySelector("p").textContent = taskText;
    editing = null;
  } else {
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTaskElement(taskText);
  }
  input.value = "";
});
function createTaskElement(taskText) {
  let li = document.createElement("li");
  let p = document.createElement("p");
  let div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML =
    '<i class="fas fa-pen pen"></i> <i class="fas fa-trash trash"></i>';
  p.textContent = taskText;
  li.append(p, div);
  ul.prepend(li);
  div.querySelector(".trash").addEventListener("click", function () {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  div.querySelector(".pen").addEventListener("click", (e) => {
    editing = e.target.closest("li");
    input.value = editing.querySelector("p").textContent;
    input.focus();
  });
  p.addEventListener("click", () => {
    p.classList.toggle("line-through");
  });
}
function darkMode() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  document.querySelector(".input-text").style.color = "black";
  document.querySelector("#moon").style.display = "none";
  document.querySelector(".sun").style.display = "block";
}
function lightMode() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  document.querySelector(".input-text").style.color = "black";
  document.querySelector("#moon").style.display = "block";
  document.querySelector(".sun").style.display = "none";
}
document.querySelector("#moon").addEventListener("click", darkMode);
document.querySelector(".sun").addEventListener("click", lightMode);
document.querySelector("#search-icon").addEventListener("click", () => {
  let allP = document.querySelectorAll("p");
  let found = false;
  allP.forEach((one) => {
    if (one.textContent.toLowerCase() === input.value.toLowerCase()) {
      alert("Found");
      found = true;
    }
  });
  if (!found) {
    alert("Not found");
  }
});
loadTasks();
//salom