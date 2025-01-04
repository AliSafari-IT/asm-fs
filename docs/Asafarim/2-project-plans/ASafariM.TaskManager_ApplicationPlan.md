# ASafariM.TaskManager Application Plan

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Entities and Relationships](#entities-and-relationships)
- [Technical Stack](#technical-stack)
- [Key Functionalities](#key-functionalities)
- [Development Steps](#development-steps)
- [Deployment Strategy](#deployment-strategy)

---

## Objective

The ASafariM.TaskManager is a fullstack application designed to help users efficiently manage projects and tasks while providing advanced features like task privacy, admin-controlled task assignments, and a responsive timeline for activity tracking.

---

## Features

1. **User Management**

   - User registration and login.
   - Role-based permissions (Admin, Manager, Developer, etc.).
   - User profile and settings customization.

2. **Project Management**

   - CRUD operations for projects.
   - Public visibility for all projects.
   - Association of tech stacks with projects.

3. **Task Management**

   - CRUD operations for tasks.
   - Privacy toggle for tasks (public/private).
   - Dependency tracking between tasks.

4. **Admin Control**

   - Admins can create or reassign tasks for any user and project.
   - Admin panel for task assignment and system management.

5. **Tags and Categorization**

   - Tags for tasks and projects.
   - Filtering and searching based on tags.

6. **Timeline View**

   - Responsive vertical timeline for logged-in users.
   - Tracks activities such as task updates, project changes, and comments.

7. **Notifications**

   - Notifications for task updates, project changes, and new assignments.

8. **File Attachments**

   - Support for uploading files to tasks.

9. **Audit Logs**

   - Logging of user actions for accountability.

10. **Tech Stack Management**
    - Maintain and display a list of technologies used in projects.

---

## Entities and Relationships

### Core Entities (15 Total)

1. **User**
2. **Role**
3. **Project**
4. **Task**
5. **Tag**
6. **TechStackList**
7. **Comment**
8. **Notification**
9. **AuditLog**
10. **FileAttachment**
11. **TaskAssignment**
12. **TimelineEvent**
13. **UserSettings**
14. **TaskDependency**
15. **ProjectActivity**

### Relationships

- **User ↔ Role**: One-to-One.
- **User ↔ TaskAssignment**: One-to-Many (Admin assigns tasks to users).
- **User ↔ Task**: One-to-Many for task creators and assignments.
- **Task ↔ TaskDependency**: One-to-Many (tasks depend on others).
- **Task ↔ Project**: Many-to-One (tasks belong to a project).
- **Project ↔ TechStackList**: One-to-Many.
- **TimelineEvent ↔ User**: Many-to-One (actions logged by users).

---

## Technical Stack

### Backend

- **Framework**: ASP.NET Core 8
- **Database**: MySQL (via EF Core)
- **Authentication**: JWT (Role-Based Access Control)
- **Testing**: xUnit + Moq
- **API Documentation**: Swagger/OpenAPI

### Frontend

- **Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Testing**: Jest + React Testing Library

### DevOps

- **Version Control**: GitHub
- **CI/CD**: GitHub Actions
- **Containerization**: Docker (optional)
- **Deployment**: NGINX or IIS

---

## Key Functionalities

### User Management

- Users can sign up, log in, and update their profiles.
- Admins can manage user roles and permissions.

### Project Management

- Users can create, edit, and view projects.
- Projects are public and associated with tech stacks.

### Task Management

- Users can create and manage their own tasks within their projects.
- Tasks can be public or private.
- Admins can assign or reassign tasks to any user.

### Timeline View

- Displays a vertical, responsive list of activities, including:
  - Task updates
  - Project changes
  - Comments and file attachments

### Notifications

- Users receive notifications for updates on their tasks or projects.

---

## Development Steps

### Step 1: Backend Development

1. Set up the core backend architecture with **ASP.NET Core 8**.
2. Create entities and database schema using **Entity Framework Core**.
3. Implement **JWT authentication** for user management.
4. Add APIs for managing:
   - Users
   - Projects
   - Tasks
   - Tags
   - Notifications

### Step 2: Frontend Development

1. Initialize a React app with **TypeScript**.
2. Create responsive pages for:
   - Dashboard
   - Project management
   - Task management
   - Timeline view
3. Implement API integration with Axios.

### Step 3: Testing

1. Write unit tests for backend services using **xUnit**.
2. Write frontend component tests using **Jest** and **React Testing Library**.
3. Perform integration tests for API endpoints.

### Step 4: Deployment

1. Deploy the backend on a cloud server (e.g., AWS, Azure).
2. Deploy the frontend using a static hosting service (e.g., Netlify, Vercel).

---

## Deployment Strategy

### Backend Deployment

- Use NGINX to serve the ASP.NET Core app.
- Use Docker to containerize the application (optional).
- Configure SSL for secure communication.

### Frontend Deployment

- Build the React app and serve it with NGINX or a CDN.
- Ensure frontend and backend domains support cross-origin requests (CORS).

### CI/CD

- Set up GitHub Actions to automate build, test, and deployment pipelines.

---

## Success Metrics

- Seamless task and project management for users.
- Robust role-based access control for admins.
- A responsive and intuitive UI for managing tasks and viewing the timeline.
- Reliable and secure system with proper audit logs.

---
