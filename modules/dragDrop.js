// modules/dragDrop.js
import { getTasks, updateTasks, saveTasks } from './taskData.js';

export function bindDragEvents(list) {
  let draggedItem = null;

  list.addEventListener('dragstart', e => {
    if (!e.target.classList.contains('draggable')) return;
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.target.classList.add('opacity-50', 'border-2', 'border-dashed', 'border-blue-400');
  });

  list.addEventListener('dragover', e => e.preventDefault());

  list.addEventListener('dragenter', e => {
    const target = e.target.closest('.draggable');
    if (!target || target === draggedItem) return;

    const rect = target.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;

    target.classList.toggle('border-t-4', e.clientY < middleY);
    target.classList.toggle('border-b-4', e.clientY >= middleY);
  });

  list.addEventListener('dragleave', e => {
    const el = e.target.closest('.draggable');
    el?.classList.remove('border-t-4', 'border-b-4', 'border-blue-500');
  });

  list.addEventListener('drop', e => {
    e.preventDefault();
    const target = e.target.closest('.draggable');
    if (!target || !draggedItem) return;

    const midY = target.getBoundingClientRect().top + target.offsetHeight / 2;
    const dropBefore = e.clientY < midY;

    list.querySelectorAll('.draggable').forEach(el => el.classList.remove('border-t-4', 'border-b-4', 'border-blue-500'));

    dropBefore
      ? list.insertBefore(draggedItem, target)
      : list.insertBefore(draggedItem, target.nextSibling);

    updateTaskOrder(list);
  });

  list.addEventListener('dragend', e => {
    e.target.classList.remove('opacity-50', 'border-2', 'border-dashed', 'border-blue-400');
    draggedItem = null;
  });
}

function updateTaskOrder(list) {
  const newOrder = [];
  list.querySelectorAll('.draggable').forEach(el => {
    const task = getTasks().find(t => t.id === el.dataset.id);
    if (task) newOrder.push(task);
  });
  updateTasks(newOrder);
  saveTasks();
}
