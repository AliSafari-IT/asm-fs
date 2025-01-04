# **Project Charter: ASafariM.TaskManager**

---

## **Project Title**

The project title is: **ASafariM.TaskManager**

---

## **Project Purpose**

The purpose of the ASafariM.TaskManager project is to develop a robust, user-friendly, and efficient task management system that allows users to manage projects, tasks, and their associated metadata. The application will provide features such as task privacy, project visibility, admin-controlled task assignments, and a timeline to track activities.

This application is targeted at teams and individuals who need a streamlined solution for organizing their work, fostering collaboration, and enhancing productivity.

---

## **Business Objectives**

1. Provide users with the ability to manage their tasks and projects efficiently.
2. Allow admins to control task assignments and maintain system integrity.
3. Ensure task privacy for sensitive work while keeping projects publicly visible.
4. Offer a timeline feature to track activities for transparency and accountability.
5. Build an extensible and maintainable solution leveraging modern fullstack technologies.

---

## **Scope Statement**

The scope of this project includes:

- **User Management**: User registration, login, roles, and permissions.
- **Project Management**: CRUD operations for projects.
- **Task Management**:
  - CRUD operations for tasks.
  - Task privacy settings (public/private).
  - Task dependencies.
- **Admin Control**:
  - Exclusive task assignment rights for admins.
- **Tagging and Categorization**:
  - Tags for projects and tasks.
- **Timeline View**:
  - A vertical, responsive timeline for activity tracking.
- **Notifications**: Notifications for task and project updates.
- **File Attachments**: Support for uploading files to tasks.
- **Audit Logs**: Logs of user actions for accountability.
- **Tech Stack Management**: List of technologies associated with projects.

---

## **Key Deliverables**

1. **Backend (ASP.NET Core 8)**:

   - Secure API endpoints with JWT authentication.
   - Role-based access control (RBAC).
   - MySQL database integration with EF Core.
   - APIs for managing users, tasks, projects, tags, and notifications.

2. **Frontend (React + TypeScript)**:

   - Responsive UI using TailwindCSS.
   - Role-specific views (e.g., Admin Panel, User Dashboard).
   - Timeline page for tracking activity.
   - Task and project management interfaces.

3. **Deployment**:
   - Fully deployed backend and frontend on a cloud server.
   - Continuous Integration/Continuous Deployment (CI/CD) pipelines.

---

## **Assumptions**

1. All users must be registered to access the application.
2. Projects are always public, and tasks can be marked as private.
3. Only admins can assign tasks to users or change existing assignments.
4. All logged-in users have access to the timeline page.

---

## **Constraints**

1. **Time**: The project must be delivered within a predefined timeline (e.g., 3 months).
2. **Budget**: Limited to essential tools, libraries, and hosting services.
3. **Technological**: The application must use ASP.NET Core 8 for the backend and React TypeScript for the frontend.

---

## **Risks**

1. **Technical Complexity**: Ensuring seamless integration of backend and frontend.
2. **Scalability**: Managing performance with increasing users and tasks.
3. **Security**: Protecting private tasks and sensitive data.
4. **Timeline Risk**: Potential delays due to unforeseen challenges.

---

## **Key Stakeholders**

- **Project Owner**: Ali Safari
- **Development Team**:
  - Backend Developer
  - Frontend Developer
  - QA Engineer
- **Users**:
  - General Users
  - Admins
  - Project Managers

---

## **Success Criteria**

1. All planned features are implemented and functioning as expected.
2. The application is secure and scalable.
3. Users find the system intuitive and efficient.
4. The project is delivered within the timeline and budget.

---
