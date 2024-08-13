# Employee Management System

This is an Employee Management System built using React for the frontend and Node.js with Express for the backend. It allows users to perform CRUD operations (Create, Read, Update, Delete) on employee records.

## Features

- **View Employees:** Display a list of all employees with their details.
- **Create Employee:** Add a new employee to the system.
- **Edit Employee:** Update existing employee details.
- **Delete Employee:** Remove an employee from the system.
- **Responsive Design:** The application is mobile-friendly and works well on various devices.

## Technology Stack

- **Frontend:**
  - React
  - Axios for HTTP requests
  - React Router for navigation
  - Bootstrap for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose for data storage

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/employee-management-system.git
   cd employee-management-system
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```

4. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the frontend application:**
   ```bash
   npm start
   ```

6. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

- **GET /api/v1/employees:** Get a list of all employees.
- **POST /api/v1/employees:** Add a new employee.
- **PUT /api/v1/employee/:id:** Update an existing employee.
- **DELETE /api/v1/employee/:id:** Delete an employee.

## Project Structure

```
employee-management-system/
│
├── backend/             # Node.js + Express backend
│   ├── controllers/     # Controller files for API
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── app.js           # Entry point for backend
│   └── ...
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js       # Main React component
│   │   └── index.js     # Entry point for React
│   └── ...
│
├── README.md            # This file
└── ...
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
