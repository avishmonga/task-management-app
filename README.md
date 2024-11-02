# MERN Task Management App

This is a **Task Management System** built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The app allows users to create, edit, view, and delete tasks. It supports task filtering and sorting based on status and due date.

## Deployed Project

The project is deployed and can be accessed at: [https://task-management-app-frontend-kik5.onrender.com/](https://task-management-app-frontend-kik5.onrender.com).

## Features

- **Task Creation & Editing**: Users can create new tasks or edit existing ones.
- **Task Deletion**: Confirmation modal to delete tasks.
- **Filtering & Sorting**: Filter tasks by status (pending, completed) and sort by due date.
- **Responsive UI**: The app is fully responsive and adapts to all screen sizes.

## Tech Stack

- **Frontend**: React.js (with Hooks), Tailwind CSS, Headless UI
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Database**: MongoDB (using Mongoose for schema management)

## Getting Started

### Prerequisites

- **Node.js** (>= v20.0)
- **MongoDB** (locally installed or cloud service like MongoDB Atlas)
- **NPM or Yarn** for dependency management

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install backend dependencies**:

```bash
    cd backend
    npm install
```

3. **Install frontend dependencies**:

```bash
    cd frontend
    npm install
```

4. **Environment Variables:**:

```bash
    MONGO_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret_key
```

5. **Run the backend server:**:

```bash
    cd backend
    npm start
```

6. **Run the frontend server:**:

```bash
    cd frontend
    npm start
```

The frontend app will be running on http://localhost:3000.
