// modules/taskRender.js
import { getTasks, saveTasks, updateTasks } from './taskData.js';

export function renderTasks(listElement) {
  const tasks = getTasks();
  listElement.innerHTML = '';

  const active = tasks.filter(t => !t.done).reverse();
  const completed = tasks.filter(t => t.done).reverse();

  active.forEach(task => listElement.appendChild(createTaskEl(task)));
  if (active.length && completed.length) {
    const sep = document.createElement('div');
    sep.className = 'text-bold text-green-400 mt-10 mb-10';
    sep.textContent = '✓ Completed Tasks';
    listElement.appendChild(sep);
  }
  completed.forEach(task => listElement.appendChild(createTaskEl(task)));
}

function createTaskEl(task) {
  const li = document.createElement('li');
  li.className = 'bg-gray-700 p-3 rounded flex justify-between items-center draggable';
  li.draggable = true;
  li.dataset.id = task.id;

  li.innerHTML = task.editing
    ? `<input value="${task.text}" class="flex-1 mr-2 px-2 py-1 bg-gray-600 rounded" />
       <button class="save-btn text-green-400 mr-2">💾</button>
       <button class="cancel-btn text-yellow-400">↩️</button>`
    : `<span class="${task.done ? 'line-through text-green-100 opacity-40' : ''}">${task.text}</span>
       <div class="space-x-2">
         <button class="edit-btn text-yellow-300">✏️</button>
         <button class="remove-btn text-red-400">❌</button>
         <button class="cross-procrastination p-3 bg-green-500 text-white">✅</button>
       </div>`;

  bindTaskEvents(li, task);
  return li;
}

function bindTaskEvents(li, task) {
  li.querySelector('.remove-btn')?.addEventListener('click', () => {
    const newTasks = getTasks().filter(t => t.id !== task.id);
    updateTasks(newTasks);
    renderTasks(li.parentElement);
  });

  li.querySelector('.edit-btn')?.addEventListener('click', () => {
    task.editing = true;
    saveTasks();
    renderTasks(li.parentElement);
  });

  li.querySelector('.cancel-btn')?.addEventListener('click', () => {
    task.editing = false;
    saveTasks();
    renderTasks(li.parentElement);
  });

  li.querySelector('.save-btn')?.addEventListener('click', () => {
    const input = li.querySelector('input');
    if (input.value.trim()) {
      task.text = input.value.trim();
      task.editing = false;
      saveTasks();
      renderTasks(li.parentElement);
    }
  });

  li.querySelector('.cross-procrastination')?.addEventListener('click', () => {
    task.done = !task.done;
    saveTasks();
    renderTasks(li.parentElement);
  });
}
