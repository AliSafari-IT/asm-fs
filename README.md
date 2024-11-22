# ASafariM.Project/TaskManager

ASafariM.TaskManager is a fullstack task management application designed for efficient project and task handling. It features role-based permissions, task privacy controls, timeline tracking, and a responsive design. Built using an NX workspace, the project integrates a robust backend with .NET Core and a dynamic React frontend.

---

## Features

### General Features

- **Responsive Design**: Mobile-first, supports light/dark themes.
- **Role-Based Permissions**: Admins, Managers, and Users with specific access levels.
- **Real-Time Notifications**: Updates for tasks, projects, and announcements.
- **Task Privacy**: Toggle task visibility (public/private).
- **Timeline**: Track activity logs for tasks, projects, and comments.
- **Audit Logs**: Maintain accountability with action tracking.

### Pages

1. **GuestHomePage**: Public landing page with announcements and call-to-action buttons.
2. **UserHomePage**: Personalized dashboard for logged-in users.
3. **ContactPage**: Contact form for user queries.
4. **PrivacyPage**: Privacy policy and terms of service.
5. **AnnouncementPage**: View public announcements.
6. **TasksPage**: CRUD tasks, manage dependencies, and privacy.
7. **ProjectsPage**: Manage projects, tasks, and tech stacks.
8. **AccountPage**:
   - Register, Login, and Profile Management.
   - Notification and theme preferences.
9. **TimelinePage**: View activity logs.
10. **SettingsPage**: Update user-specific settings.
11. **AdminDashboardPage**: Manage users, roles, tasks, and projects.

---

## Tech Stack

### Backend

- **Framework**: ASP.NET Core 8
- **Database**: MySQL (via EF Core)
- **Authentication**: JWT-based authentication
- **API Documentation**: Swagger/OpenAPI
- **Testing**: xUnit + Moq

### Frontend

- **Framework**: React with TypeScript
- **Styling**: TailwindCSS and Fluent UI
- **State Management**: Redux Toolkit (planned)
- **Testing**: Vitest + React Testing Library

### DevOps

- **Workspace Management**: NX Workspace
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions
- **Deployment**: NGINX (Frontend & Backend)

---

## Workspace Structure

### Applications

- `apps/backends/ASafariM.Server`: .NET backend for APIs and business logic.
- `apps/frontends/asafarim-client`: React frontend for UI.

### Libraries

- `libs/Domain`: Core domain models and business logic.
- `libs/Infrastructure`: Shared infrastructure code (e.g., data access, email services).

### Testing

- `tests/UnitTests`: Backend unit tests.
- `tests/IntegrationTests`: Integration tests for API and services.

---

## Prerequisites

Ensure the following tools are installed:

- **Node.js** (v16+)
- **Yarn** (v4.5.1)
- **.NET SDK** (v8.0+)
- **MySQL** (v8.0+)

---

## Getting Started

### Installation

#### Clone the Repository

```bash
git clone https://github.com/asm-fs/asm-fs.git
cd asm-fs
```

#### Install Dependencies

```bash
yarn install
```

#### Setup Backend

1. Navigate to the backend:

   ```bash
   cd apps/backends/ASafariM.Server
   ```

2. Apply database migrations:

   ```bash
   dotnet ef database update
   ```

3. Run the backend:

   ```bash
   dotnet run
   ```

#### Setup Frontend

1. Navigate to the frontend:

   ```bash
   cd apps/frontends/asafarim-client
   ```

2. Start the development server:

   ```bash
   yarn dev
   ```

---

## Usage

### User Roles

- **Admin**: Full access to manage tasks, projects, and user roles.
- **Manager**: Limited to managing tasks and projects.
- **User**: Restricted to tasks and projects they own or are assigned to.

### Key Features

- **Task Management**: Add, edit, delete, and toggle privacy for tasks.
- **Project Management**: Handle projects with associated tasks and tags.
- **Timeline View**: Track activities like task updates and comments.

---

## Workspace Scripts

### Development

```bash
# Start backend
yarn dev:backend

# Start frontend
yarn dev:frontend
```

### Build

```bash
# Build backend
yarn build:backend

# Build frontend
yarn build:frontend
```

### Testing

```bash
# Run unit tests
yarn test:unit

# Run integration tests
yarn test:integration
```

### Formatting and Linting

```bash
yarn format
yarn lint
```

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit our changes and push to our fork.
4. Open a pull request.

---

## Deployment

1. Build the frontend:

   ```bash
   yarn build:frontend
   ```

2. Publish the backend:

   ```bash
   dotnet publish -c Release -o ./publish
   ```

3. Deploy both to a server (e.g., NGINX or Docker).

---

## License

This project is licensed under the [MIT License](LICENSE).

---
