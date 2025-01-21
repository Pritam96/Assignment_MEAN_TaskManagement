const createTask = async (req, res, next) => {
  res.status(200).send("create a new task");
};

const getTasks = async (req, res, next) => {
  res.status(200).send("get all tasks");
};

const getTask = async (req, res, next) => {
  const { id } = req.params;
  res.status(200).send(`get task by ID: ${id}`);
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  res.status(200).send(`update task by ID: ${id}`);
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  res.status(200).send(`delete task by ID: ${id}`);
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
