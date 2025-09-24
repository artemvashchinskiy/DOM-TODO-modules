// modules/theme.js
export function applySavedTheme(toggleEl) {
  const saved = localStorage.getItem('theme') || 'dark';
  toggleEl.checked = saved === 'dark';
  document.documentElement.classList.toggle('dark', saved === 'dark');
}

export function toggleTheme(toggleEl) {
  const isDark = toggleEl.checked;
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
