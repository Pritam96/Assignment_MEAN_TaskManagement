# Task Management System

## Overview

This is a simple task management system with user authentication, task creation, and management features. The application uses a ReactJS frontend, Node.js backend, and MongoDB for database management. RESTful APIs handle all user and task-related operations.

## Features

### User Management

- **Register and Login**: Users can register and log in to access the system. Passwords are securely hashed using bcrypt.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).

### Task Management

- **Create Tasks**: Each task includes:
  - Title
  - Description
  - Due Date
  - Status (Pending, In Progress, Completed)
- **View Tasks**: Users can view their own tasks.
- **Update Tasks**: Modify task details (e.g., status, description, due date).
- **Delete Tasks**: Remove tasks that are no longer needed.

### Role-Based Access (Optional)

- **Admin**: Can view tasks for all users.
- **User**: Can manage only their tasks.

## Tech Stack

### Backend:

- **Node.js**
- **Express.js**
- **bcrypt**: Password hashing
- **JWT (JSON Web Token)**: Secure authentication

### Database:

- **MongoDB**: Storing user and task information

### Frontend:

- **ReactJS**
- **Chakra UI**: For building a responsive and accessible UI

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or Yarn
- MongoDB (local or cloud-based)

### Steps to Setup Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pritam96/Assignment_MEAN_TaskManagement.git
   cd Assignment_MEAN_TaskManagement
   ```

2. **Set up the backend:**

   ```bash
   cd server
   npm install
   ```

   Create an `.env` file inside the server directory and add the following:

   ```plaintext
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. **Start the backend server:**

   ```bash
   npm run dev
   ```

4. **Set up the frontend:**

   ```bash
   cd ../client
   npm install
   npm start
   ```

### Auto-Seeding Default Admin User

When initializing the application, it will **auto-seed** a default admin user with the following credentials:

- **Email**: `admin@example.com`
- **Password**: `admin123`

This user is created if it doesn't already exist in the database.

## API Documentation

### Base URL:

- `http://localhost:5000`

### User Routes

- **Register a User**  
  **Endpoint**: `POST /api/users/register`  
  **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response**:

  - Success: `201 Created`
  - Error: `400 Bad Request`

- **Login**  
  **Endpoint**: `POST /api/users/login`  
  **Request Body**:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response**:

  - Success: `200 OK`
  - Error: `401 Unauthorized`

- **Logout**  
  **Endpoint**: `POST /api/users/logout`  
  **Response**:
  - Success: `200 OK`

### Task Routes

- **Create a New Task**  
  **Endpoint**: `POST /api/tasks`  
  **Authorization**: Bearer Token required  
  **Request Body**:

  ```json
  {
    "title": "New Task",
    "description": "Description of the task",
    "dueDate": "2025-01-31T00:00:00Z"
  }
  ```

  **Response**:

  - Success: `201 Created`
  - Error: `400 Bad Request`

- **Get All Tasks**  
  **Endpoint**: `GET /api/tasks`  
  **Authorization**: Bearer Token required  
  **Response**:

  - Success: `200 OK`
  - Error: `401 Unauthorized`

- **Get a Task by ID**  
  **Endpoint**: `GET /api/tasks/:id`  
  **Authorization**: Bearer Token required  
  **Response**:

  - Success: `200 OK`
  - Error: `404 Not Found`

- **Update a Task**  
  **Endpoint**: `PUT /api/tasks/:id`  
  **Authorization**: Bearer Token required  
  **Request Body**:

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Description",
    "dueDate": "2025-02-01T00:00:00Z",
    "status": "completed"
  }
  ```

  **Response**:

  - Success: `200 OK`
  - Error: `404 Not Found`

- **Delete a Task**  
  **Endpoint**: `DELETE /api/tasks/:id`  
  **Authorization**: Bearer Token required  
  **Response**:
  - Success: `200 OK`
  - Error: `404 Not Found`

## Assumptions

- Authentication and authorization are handled via JWT in headers.
- Admin functionalities are optional and require additional configuration.
- API error handling is standardized with appropriate status codes.
