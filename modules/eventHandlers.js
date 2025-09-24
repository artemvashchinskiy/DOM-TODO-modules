// modules/eventHandlers.js
import { addTask } from './taskData.js';
import { renderTasks } from './taskRender.js';

export function bindForm(formEl, inputEl, listEl) {
  formEl.addEventListener('submit', e => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (text) {
      addTask(text);
      inputEl.value = '';
      renderTasks(listEl);
    }
  });
}
