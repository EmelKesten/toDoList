const div = document.querySelector('.div');
let input = document.getElementById("myInput");
const toDoList = [];

let index = localStorage.getItem('index') || 0;




if(localStorage.getItem('toDoList')){
  const localToDo = JSON.parse(localStorage.getItem('toDoList'));
  toDoList.push(...localToDo);
  toDoList.forEach((item)=>{
    const miniDiv = document.createElement('div');
    miniDiv.className = 'miniDiv';
    const p = document.createElement('p');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.value = item.index
    p.innerHTML = item.text;
    if(item.done){
      miniDiv.classList.add('done');
      checkbox.checked = true;
    }
    miniDiv.appendChild(checkbox)
    miniDiv.appendChild(p);
    div.appendChild(miniDiv);
})
}






function createToDo(input){
  toDoList.push({
    text: input.value,
    done: false,
    index: index
  });
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  div.innerHTML = "";
  index++;
  localStorage.setItem('index', index);
  toDoList.forEach((item)=>{
    const miniDiv = document.createElement('div');
    miniDiv.className = 'miniDiv';
    const p = document.createElement('p');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.value = item.index
    p.innerHTML = item.text;
    miniDiv.appendChild(checkbox)
    miniDiv.appendChild(p);
    div.appendChild(miniDiv);

})
}



input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if(input.value){
      createToDo(input);
      input.value = "";
    }

  }
})


const checkbox = document.querySelectorAll(".checkbox");

checkbox.forEach((item)=>{
  item.addEventListener('click', (e)=>{
    isChecked(e);
})
})

function isChecked(e){
  const index = e.target.value;
  const item = toDoList.find((item)=>{
    return item.index == index
  })
  item.done = !item.done;
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  if(item.done){
    e.target.parentElement.classList.add('done');
  }
  else{
    e.target.parentElement.classList.remove('done');
  }
}