// App.jsx 

<App>
    <ThemeToggle />
    <TaskForm onAdd={addTask}/>
    <TaskList
        tasks={tasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggleDone={toggleDone}
        onReorder={reorderTasks}
    />
</App>