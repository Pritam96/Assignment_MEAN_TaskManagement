# Task Management System

## Overview

A simple task management system with user authentication, task creation, and management features. This project uses ReactJS for the frontend and a secure backend to manage user and task-related operations via RESTful APIs.

---

## Features

### 1. **User Management**

- **Register and Login**:  
  Users can register and log in to access the system.
- **Secure Passwords**:  
  Passwords are securely hashed using libraries like bcrypt for enhanced security.

### 2. **Task Management**

Logged-in users can perform the following actions:

- **Create a Task**:  
  Each task contains:
  - Title
  - Description
  - Due Date
  - Status (Pending, In Progress, Completed)
- **View Tasks**:  
  Users can view all their tasks.
- **Update Tasks**:  
  Modify task details, including the status or due date.
- **Delete Tasks**:  
  Remove tasks that are no longer needed.

### 3. **Role-Based Access (Optional)**

- Implement two roles:
  - **Admin**:
    - Can view all tasks from all users.
  - **User**:
    - Limited to managing their own tasks.

### 4. **API Endpoints**

- RESTful API endpoints for:
  - User management (register, login, etc.)
  - Task management (CRUD operations).

### 5. **Frontend (ReactJS)**

- **Login/Register Page**:  
  For user authentication.
- **Task Dashboard**:  
  Display all tasks with the ability to:
  - Create tasks.
  - Update tasks.
  - Delete tasks.
  - Filter tasks by status or due date.
- **Task Form**:  
  Simple and responsive form to add or edit tasks.

---

## Tech Stack

### Backend:

- Node.js
- Express.js
- bcrypt for password hashing
- JWT (JSON Web Token) for authentication

### Database:

- MongoDB (or any preferred database)

### Frontend:

- ReactJS

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pritam96/Assignment_MEAN_TaskManagement.git
   cd Assignment_MEAN_TaskManagement
   ```
2. Set up the server:
   ```bash
    cd server
    npm install
    cd ..
   ```
3. Set up the client:
   ```bash
    cd client
    npm install
   ```
