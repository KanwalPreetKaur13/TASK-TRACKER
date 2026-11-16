const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    span.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveAndRender();
    };

    li.append(span, delBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.push({ text: input.value.trim(), completed: false });
  input.value = '';
  saveAndRender();
});

saveAndRender();
