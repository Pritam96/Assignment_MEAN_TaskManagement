import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  Badge,
  Stack,
  Fieldset,
  Input,
  Textarea,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useEffect, useState } from "react";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import { useAuth } from "../../context/AuthProvider";
import { useTasks } from "../../context/TasksProvider";
import { toaster } from "../ui/toaster";
import moment from "moment";

const Home = () => {
  const { user, logoutAction } = useAuth();
  const { tasks, fetchTasks, loading, createTask, updateTask, deleteTask } =
    useTasks();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const [currentId, setCurrentId] = useState(null);
  const [sortBy, setSortBy] = useState("status");

  const loadTasks = async (sortOption) => {
    try {
      await fetchTasks(user.accessToken, sortOption);
    } catch (error) {
      toaster.create({
        title: "Error loading tasks.",
        description: error.message || "An unexpected error occurred.",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadTasks(sortBy);
  }, [sortBy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      toaster.create({
        title: "Validation error.",
        description: "Please fill in all fields before saving the task.",
        type: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      if (currentId) {
        // Update Task
        await updateTask(currentId, newTask, user.accessToken);
        toaster.create({
          title: "Task updated.",
          description: "Your task has been successfully updated.",
          type: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        // Create Task
        await createTask(newTask, user.accessToken);
        toaster.create({
          title: "Task created.",
          description: "Your task has been successfully created.",
          type: "success",
          duration: 4000,
          isClosable: true,
        });
      }

      // Reset form and ID
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
      });
      setCurrentId(null);
    } catch (error) {
      toaster.create({
        title: `Error ${currentId ? "updating" : "creating"} task.`,
        description: error.message || "An unexpected error occurred.",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      setNewTask({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split("T")[0],
        status: task.status,
      });
      setCurrentId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, user.accessToken);
      toaster.create({
        title: "Task deleted.",
        description: "The task has been successfully deleted.",
        type: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toaster.create({
        title: "Error deleting task.",
        description: error.message || "An unexpected error occurred.",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    logoutAction();
  };

  return (
    <Flex direction="column" height="100vh" width="100vw" p={4}>
      <HStack justify="space-between" mb="6">
        <Heading as="h1" size="2xl">
          Task Management System
        </Heading>
        <HStack>
          <Text fontSize="lg" color="gray.600">
            Welcome, <strong>{user?.name || "User"}</strong>
          </Text>
          <Button colorPalette="red" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} flex="1">
        <Box p={4} borderWidth={1} borderRadius="md" shadow="sm">
          <Heading as="h2" size="lg" mb="4" textAlign="center">
            Create New Task
          </Heading>
          <Stack spacing={4}>
            <Fieldset.Root size="lg">
              <Fieldset.Content>
                <Field label="Title">
                  <Input
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                  />
                </Field>
                <Field label="Description">
                  <Textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                  />
                </Field>
                <Field label="Status">
                  <NativeSelectRoot variant="filled">
                    <NativeSelectField
                      value={newTask.status}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="running">In Progress</option>
                      <option value="completed">Completed</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                <Field label="Deadline">
                  <Input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                  />
                </Field>
              </Fieldset.Content>
              <Button
                colorPalette={currentId ? "grey" : "blue"}
                onClick={handleAddTask}
                disabled={loading}
              >
                {currentId ? "Update Task" : "Add Task"}
              </Button>
            </Fieldset.Root>
          </Stack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" shadow="sm">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={4}
          >
            <Heading as="h2" size="lg" mb="4">
              Task List
            </Heading>

            <NativeSelectRoot variant="filled" width="200px">
              <NativeSelectField
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                placeholder="Sort by..."
              >
                <option value="status">Status</option>
                <option value="dueDate">Due Date</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>
          <Box overflowY="auto" maxH="75vh">
            {tasks.length > 0 ? (
              tasks.map((tsk) => (
                <Box
                  key={tsk._id}
                  p={4}
                  mb={3}
                  borderWidth={1}
                  borderRadius="md"
                  shadow="sm"
                  bg={
                    tsk.status === "completed"
                      ? "green.50"
                      : moment().isAfter(tsk.dueDate)
                      ? "gray.50"
                      : tsk.status === "pending"
                      ? "yellow.50"
                      : "red.50"
                  }
                >
                  <HStack justify="space-between" mb={2}>
                    <Heading as="h3" size="md" color="gray.900">
                      {tsk.title}
                    </Heading>
                    <Badge
                      colorPalette={
                        tsk.status === "completed"
                          ? "green"
                          : moment().isAfter(tsk.dueDate)
                          ? "gray"
                          : tsk.status === "pending"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {tsk.status}
                    </Badge>
                  </HStack>
                  <Text mb={2} color="gray.800">
                    {tsk.description}
                  </Text>
                  {user?.isAdmin && (
                    <Text fontSize="sm" color="gray.600">
                      Created By: {tsk.createdBy.name}
                    </Text>
                  )}
                  <Text fontSize="sm" color="gray.600">
                    Due Date: {moment(tsk.dueDate).fromNow()}
                  </Text>
                  <HStack mt={4} spacing={4}>
                    <Button
                      colorPalette="blue"
                      size="sm"
                      onClick={() => handleEdit(tsk._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorPalette="red"
                      size="sm"
                      onClick={() => handleDelete(tsk._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Box>
              ))
            ) : (
              <Text textAlign="center" color="gray.500">
                No tasks available.
              </Text>
            )}
          </Box>
        </Box>
      </Grid>
    </Flex>
  );
};

export default Home;
