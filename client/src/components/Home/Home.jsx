import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Badge,
  Stack,
  Fieldset,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useState } from "react";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";

const Home = () => {
  const loggedUser = { name: "User", isAdmin: true };
  const [tasks, setTasks] = useState([
    {
      id: 101,
      title: "Task 1",
      description: "This is a sample task",
      dueDate: new Date("2022-01-31"),
      status: "pending",
      createdBy: "User1",
    },
    {
      id: 102,
      title: "Task 2",
      description: "This is a sample task",
      dueDate: new Date("2022-01-30"),
      status: "completed",
      createdBy: "User1",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  console.log(newTask);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert("Please fill in all fields before adding a task.");
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        ...newTask,
        dueDate: new Date(newTask.dueDate),
      },
    ]);

    setNewTask({ title: "", description: "", dueDate: "", status: "pending" });
  };

  const handleEdit = (id) => {
    console.log(`Edit task with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleLogout = () => {
    console.log("User logged out");
    alert("You have been logged out.");
  };

  return (
    <Box maxW="xl" mx="auto" mt="8">
      <HStack justify="space-between" mb="6">
        <Heading as="h1" size="2xl">
          Task Management System
        </Heading>
        <HStack>
          <Text fontSize="lg" color="gray.600">
            Welcome, <strong>{loggedUser.name}</strong>
          </Text>
          <Button colorPalette="red" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </HStack>

      <Box p={4} borderWidth={1} borderRadius="md" shadow="sm" mb={6}>
        <Heading as="h2" size="lg" mb="4" textAlign="center">
          Create New Task
        </Heading>
        <Stack spacing={4}>
          <Fieldset.Root size="lg">
            <Fieldset.Legend>Task Details</Fieldset.Legend>
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
                    <option value="running">Running</option>
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
            <Button colorPalette="blue" onClick={handleAddTask}>
              Add Task
            </Button>
          </Fieldset.Root>
        </Stack>
      </Box>

      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Task List
      </Heading>
      <VStack spacing={4} align="stretch">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Box
              key={task.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              shadow="sm"
              bg={task.status === "completed" ? "green.50" : "gray.50"}
            >
              <HStack justify="space-between" mb={2}>
                <Heading as="h3" size="md" color="gray.900">
                  {task.title}
                </Heading>
                <Badge
                  colorPalette={
                    task.status === "completed" ? "green" : "yellow"
                  }
                >
                  {task.status}
                </Badge>
              </HStack>
              <Text mb={2} color="gray.800">
                {task.description}
              </Text>
              {loggedUser.isAdmin && (
                <Text fontSize="sm" color="gray.600">
                  Created By: {task.createdBy}
                </Text>
              )}
              <Text fontSize="sm" color="gray.600">
                Due Date: {task.dueDate.toDateString()}
              </Text>
              <HStack mt={4} spacing={4}>
                <Button
                  colorPalette="blue"
                  size="sm"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit
                </Button>
                <Button
                  colorPalette="red"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
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
      </VStack>
    </Box>
  );
};

export default Home;
