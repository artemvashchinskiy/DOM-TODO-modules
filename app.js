import { applySavedTheme, toggleTheme } from './modules/theme.js';
import { renderTasks } from './modules/taskRender.js';
import { bindDragEvents } from './modules/dragDrop.js';
import { bindForm } from './modules/eventHandlers.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

applySavedTheme(themeToggle);
themeToggle.addEventListener('change', () => toggleTheme(themeToggle));

renderTasks(list);
bindDragEvents(list);
bindForm(form, input, list);
