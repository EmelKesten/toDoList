const div = document.querySelector(".div");
const input = document.getElementById("myInput");
const toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
const completeBtn = document.getElementById("completed");
const inProgressBtn = document.getElementById("inProgress");

let index = localStorage.getItem("index") || 0;

completeBtn.addEventListener("click", () => {
  if(completeBtn.checked){
  div.innerHTML = "";
  toDoList.forEach((item, i) => {
    if (item.done) {
      div.innerHTML += `<li class="list-group-item list-group-item-success">${item.text}</li>`;
    }
  }
  );
}
 else{
  div.innerHTML = "";
   toDoList.forEach((item, i) => {
     buildHtml(item);
 })
}
}
);
inProgressBtn.addEventListener("click", () => {
  if(inProgressBtn.checked){
  div.innerHTML = "";
  toDoList.forEach((item, i) => {
    if (!item.done) {
      div.innerHTML += `<li class="list-group-item list-group-item-success">${item.text}</li>`;
    }
  }
  );
}
  else{
  div.innerHTML = "";
    toDoList.forEach((item, i) => {
      buildHtml(item);
  }
  );
}
}
);


function buildHtml(item) {
  const { index, text, done } = item || {};
  const miniDiv = document.createElement("div");
  miniDiv.className = "miniDiv";
  const checkbox = document.createElement("input");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.value = index;
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = index;
  checkbox.addEventListener("click", (e) => {
    isChecked(e);
  });
  deleteBtn.addEventListener("click", (e) => {
    deleteToDo(e);
  })
  if (done) {
    miniDiv.classList.add("done");
    checkbox.checked = true;
  }
  miniDiv.appendChild(checkbox);
  if(text.startsWith("http")){
    const p = document.createElement("a");
    p.href = text;
    p.innerHTML = text;
    p.target = "_blank";
    miniDiv.appendChild(p);
  }
  else{
    const p = document.createElement("p");
    p.innerHTML = text;
    miniDiv.appendChild(p);
  }
  miniDiv.appendChild(deleteBtn);
  div.appendChild(miniDiv);
}

if (toDoList.length > 0) {
  toDoList.forEach((item) => {
    buildHtml(item);
  });
}

function createToDo(input) {
  toDoList.push({
    text: input.value,
    done: false,
    index: index,
  });
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  div.innerHTML = "";
  index++;
  localStorage.setItem("index", index);
  toDoList.forEach((item) => {
    buildHtml(item);
  });
}

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (input.value) {
      createToDo(input);
      input.value = "";
    }
  }
});

const checkbox = document.querySelectorAll(".checkbox");

function isChecked(e) {
  const index = e.target.value;
  const item = toDoList.find((item) => {
    return item.index == index;
  });
  item.done = !item.done;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  if (item.done) {
    e.target.parentElement.classList.add("done");
  } else {
    e.target.parentElement.classList.remove("done");
  }
}

function deleteToDo(e) {
  const i = e.target.value;
  const item = toDoList.find((item) => {
    return item.index == i;
  });
  toDoList.splice(toDoList.indexOf(item), 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  div.innerHTML = "";
  toDoList.forEach((item) => {
    buildHtml(item);
  });
  if(toDoList.length == 0){
    index = 0;
    localStorage.setItem("index", index);
  }
}