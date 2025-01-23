import mongoose from "mongoose";
import Task from "../models/taskModel.js";

const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const checkOwnershipOrAdmin = (task, user) => {
  return task.createdBy.toString() === user._id.toString() || user.isAdmin;
};

const createTask = async (req, res, next) => {
  const { title, description, dueDate, status } = req.body;

  try {
    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title, description, and due date are required" });
    }

    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    const currentDate = new Date();
    if (parsedDate < currentDate) {
      return res
        .status(400)
        .json({ message: "Due date must be a future date" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate: parsedDate,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error in creating task:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (req, res, next) => {
  try {
    const query = req.user.isAdmin ? {} : { createdBy: req.user._id };
    const tasks = await Task.find(query).populate("createdBy", "name");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in fetching tasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTask = async (req, res, next) => {
  const { id: _id } = req.params;

  try {
    if (!validateObjectId(_id)) {
      return res.status(404).json({ message: `No task with id: ${_id}` });
    }

    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!checkOwnershipOrAdmin(task, req.user)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error in fetching task:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res, next) => {
  const { id: _id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    if (!validateObjectId(_id)) {
      return res.status(404).json({ message: `No task with id: ${_id}` });
    }

    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({
        message: "Title, description,due date and status are required",
      });
    }

    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    const currentDate = new Date();
    if (parsedDate < currentDate) {
      return res
        .status(400)
        .json({ message: "Due date must be a future date" });
    }

    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!checkOwnershipOrAdmin(task, req.user)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this task" });
    }

    task.title = title;
    task.description = description;
    task.dueDate = parsedDate;
    task.status = status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error in updating task:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res, next) => {
  const { id: _id } = req.params;

  try {
    if (!validateObjectId(_id)) {
      return res.status(404).json({ message: `No task with id: ${_id}` });
    }

    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!checkOwnershipOrAdmin(task, req.user)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(_id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleting task:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
