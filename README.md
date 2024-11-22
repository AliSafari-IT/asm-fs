# README.md

## Fullstack ASM NX Workspace

This project is a fullstack application built using NX Workspace, .NET 8, and various frontend frameworks including Angular, React, and Vue. The backend is developed with Clean Architecture principles using ASP.NET Core Identity for authentication. The default database is MySQL.

### Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Database Configuration](#database-configuration)
- [License](#license)

## Project Overview

The workspace includes:

- **Backends**:
  - `Asm.Auth`: .NET 8 application with Clean Architecture and ASP.NET Core Identity.
  - `Asm.NextJS`: Next.js application for creating blog and article posts.
  - `Asm.Laravel`: Placeholder for future Laravel application.
- **Frontends**:
  - `angular-app`: Angular application.
  - `react-app`: React application.
  - `vue-app`: Vue.js application.
- **Dist Folder**: Contains build outputs ready for deployment.

## Getting Started

### Prerequisites

- **Node.js** (Latest LTS version)
- **.NET 8 SDK**
- **MySQL Server**
- **NX CLI** (optional, for managing the workspace)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/fullstack-asm-nx.git
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd fullstack-asm-nx/backends/Asm.Auth
   ```

3. **Update Database Connection**

   Modify the `DefaultConnection` string in `appsettings.json`:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=asmDB;User=ali;Password=Ali+123456/;"
   }
   ```

4. **Apply Migrations**

   ```bash
   dotnet ef database update
   ```

5. **Run the Backend API**

   ```bash
   dotnet run
   ```

### Frontend Setup

#### Angular App

1. **Navigate to the Angular App**

   ```bash
   cd fullstack-asm-nx/frontends/angular-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   ng serve
   ```

#### React App

1. **Navigate to the React App**

   ```bash
   cd fullstack-asm-nx/frontends/react-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   npm start
   ```

#### Vue App

1. **Navigate to the Vue App**

   ```bash
   cd fullstack-asm-nx/frontends/vue-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   npm run serve
   ```

## Deployment

- Build all applications and place the outputs in the `dist/` directory.
- Deploy the contents of the `dist/` folder to your VPS domain `asafarim.com`.

## Future Enhancements

- Integration with the upcoming `Asm.Laravel` application.
- Enhanced authentication features across all frontend applications.
- Additional services in the backend to support new functionalities.

## Database Configuration

Ensure your MySQL server is running and accessible with the provided credentials. Update the connection string if necessary.

## License

This project is licensed under the MIT License.