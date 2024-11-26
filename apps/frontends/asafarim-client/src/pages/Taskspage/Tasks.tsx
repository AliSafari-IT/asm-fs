import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch tasks from the server
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    // Replace with your API call
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const createTask = async () => {
    // Replace with your API call
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
    setNewTask({ title: '', description: '' });
  };

  const updateTask = async (id: string, updatedTask: Task) => {
    // Replace with your API call
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    // Replace with your API call
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={createTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => updateTask(task.id, { ...task, isCompleted: !task.isCompleted })}>
              {task.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
