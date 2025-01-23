import { createContext, useContext, useState } from "react";
import axios from "axios";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async (token, sortOption) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `/api/tasks?sortField=${sortOption}`,
        config
      );
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single task
  const fetchTask = async (id, token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/tasks/${id}`, config);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch the task.");
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async (taskData, token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/api/tasks", taskData, config);
      setTasks((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message || "Failed to create the task.");
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (id, updatedData, token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put(`/api/tasks/${id}`, updatedData, config);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, ...data } : task))
      );
    } catch (err) {
      setError(err.message || "Failed to update the task.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id, token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/tasks/${id}`, config);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        error,
        setError,
        setLoading,
        fetchTasks,
        loading,
        fetchTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

export const useTasks = () => {
  return useContext(TasksContext);
};
