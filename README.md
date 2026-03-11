# Pacifickode CRM

A full-stack **Employee and Department Management System** built using **ReactJS, ASP.NET Core Web API, SQL Server and ADO.NET**.
The application allows users to manage departments and employees through a web interface with full CRUD operations.

This project demonstrates **full-stack development, REST API integration, database design, and component-based frontend architecture**.

Repository:
https://github.com/WaruniGunasena/PacifickodeCRM

# Project Overview

Pacifickode CRM is a simple internal system that enables organizations to maintain department and employee records.

The system consists of two main modules:

### Department Management

Users can:

* Create departments
* Edit department information
* Delete departments
* View department list
* Pagination and search functionality

Each department includes:

* Department Code
* Department Name
* Description

---

### Employee Management

Users can:

* Add new employees
* Edit employee details
* Delete employees
* View employee list
* Pagination and search functionality

Each employee contains:

* First Name
* Last Name
* Email
* Date of Birth
* Age (Automatically calculated from DOB)
* Salary
* Department

Employees are assigned to departments through a **Department relationship**.

---

# Technology Stack

### Frontend

* ReactJS
* Vite
* React Router
* Axios
* CSS

### Backend

* ASP.NET Core Web API (.NET 8)
* ADO.NET
* RESTful API architecture

### Database

* SQL Server

### Tools

* Visual Studio
* Antigravity / VS Code
* Git & GitHub
* Swagger (API testing)

---

# System Architecture

The application follows a **3-layer architecture**:

```
React Frontend
      ↓
ASP.NET Core Web API
      ↓
ADO.NET
      ↓
SQL Server Database
```

### Frontend

Responsible for UI rendering and user interaction.

### Backend API

Handles business logic and exposes endpoints for data operations.

### Database Layer

Stores department and employee data in SQL Server.

---

# Project Structure

```
PacifickodeCRM
│
├── PacifickodeCRMBackend
│   ├── Controllers
│   ├── Interfaces
│   ├── Services
│   ├── Models
│   ├── Data
│   └── Program.cs
│
└── pacifickode-crm-frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

---

# Database Design

### Departments Table

| Column         | Type              |
| -------------- | ----------------- |
| DepartmentId   | INT (Primary Key) |
| DepartmentCode | VARCHAR           |
| DepartmentName | VARCHAR           |
| Description    | VARCHAR           |

---

### Employees Table

| Column       | Type              |
| ------------ | ----------------- |
| EmployeeId   | INT (Primary Key) |
| FirstName    | VARCHAR           |
| LastName     | VARCHAR           |
| Email        | VARCHAR           |
| DateOfBirth  | DATE              |
| Age          | INT               |
| Salary       | DECIMAL           |
| DepartmentId | INT (Foreign Key) |

Relationship:

```
Department (1) ---- (Many) Employees
```

---

# API Endpoints

## Department API

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | /api/department      | Get all departments |
| POST   | /api/department      | Create department   |
| PATCH    | /api/department/{id} | Update department   |
| DELETE | /api/department/{id} | Delete department   |

---

## Employee API

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/employee      | Get all employees |
| POST   | /api/employee      | Add employee      |
| PATCH    | /api/employee/{id} | Update employee   |
| DELETE | /api/employee/{id} | Delete employee   |

---

# React Routing

Navigation between application pages is handled using **React Router**.

Example routes:

```
/departments
/employees
/add-department
/add-employee
/edit-department/:id
/edit-employee/:id
```

---

# Validations

The application implements both **frontend and backend validations**.

### Frontend

* Required field validation
* Email format validation
* Salary numeric validation
* Form input validation
* User not allow to add employees with same email address
* User not allow to add departments with same department code

### Backend

* Required field checks
* Data integrity validation
* Age automatically calculated from Date of Birth

---

# Code Reusability

The project structure promotes reusable and maintainable code:

* React components(Modal,Input,Data Table) reused across pages
* API service layer for HTTP requests
* Backend interfaces and services
* Separation of controllers, services and data logic

---

# Running the Project

## Backend

Open the backend project in **Visual Studio**.

Configure the database connection in:

```
appsettings.json
```

Example:

```
Server=localhost;Database=EmployeeDepartmentDB;Trusted_Connection=True;
```

Run the project.

The API will start on:

```
https://localhost:xxxx/api
```

Swagger UI will also be available for API testing.

---

## Frontend

Navigate to the frontend folder:

```
pacifickode-crm-frontend
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Future Improvements

Possible enhancements include:

* Authentication and authorization
* Deployment to cloud platforms

---

# Author

Waruni Gunasena

GitHub:
https://github.com/WaruniGunasena

---
