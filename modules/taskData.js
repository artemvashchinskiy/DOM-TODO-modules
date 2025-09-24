// modules/taskData.js
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function getTasks() {
  return tasks;
}

export function addTask(text) {
  const task = {
    text,
    editing: false,
    done: false,
    id: Date.now().toString()
  };
  tasks.push(task);
  saveTasks();
}

export function updateTasks(newTaskArray) {
  tasks = newTaskArray;
  saveTasks();
}

export function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
