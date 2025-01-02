# Asafarim Workspace

Date: 2024-12-14
Updated: 2024-12-14


## **General Information**

- **Workspace Name**: `asm-fs`
- **Package Manager**: Yarn 4.5.1
- **NX Version**: 18.3.5
- **Repository**: [GitHub Repo](https://github.com/AliSafari-IT/asm-fs)
- **Description**: Fullstack project/task manager application.

## **Workspace Structure**

- **Applications**:
  - Backend: `apps/backends/ASafariM.Server`
  - Frontend: `apps/frontends/asafarim-client`
- **Libraries**:
  - `libs/Domain`: Domain models and logic.
  - `libs/Infrastructure`: Data access layer and backend-specific shared libraries.
- **Testing**:
  - `tests/UnitTests`: For backend and domain layer tests.
  - `tests/IntegrationTests`: For integration tests involving API endpoints or services.

## **Technologies Used**

- **Frontend**: React 18.3.1 with Fluent UI components.
- **Backend**: .NET Core (via `@nx-dotnet/core`).
- **State Management**: Not explicitly mentioned, primarily **Redux Toolkit** but initially using **React Context**.
- **Testing Frameworks**:
  - Frontend: **Vitest** (via Vite).
  - Backend: Likely xUnit (using `@nx-dotnet/core`).

---

## **Nx & Clean-Architecture**

1. **Frontend considerations**

   - Apply `@nx/react` alongside `@nx/web` for advanced React-based optimization in NX.
   - Consider adding TailwindCSS for a lightweight styling alternative to Fluent UI.
   - Add **React Router** for frontend routing:

     ```bash
     yarn add react-router-dom @types/react-router-dom
     ```

2. **Backend Setup**

   - Clean Architecture layers in `apps/backends/ASafariM.Server` are:
       - **Domain Layer**: Core logic, models.
       - **Application Layer**: Use cases, services.
       - **Infrastructure Layer**: Database, email, etc.
       - **WebAPI Layer**: Controllers, DTOs, endpoints.
   - Leverage `@nx-dotnet/core` for generating .NET apps and libraries.

3. **Testing Improvements**

   - Add **TestCafe** for end-to-end testing.
   - Backend tests can use `Moq` for mocking dependencies in unit tests.

4. **Task Automation**
   - We can add reusable generators and commands for our NX workspace:
     - Example: A generator to create CRUD functionality for new entities.

---

## **Workspace Scripts**

```json
{
  "name": "@asm-fs/asafarim",
  "packageManager": "yarn@4.5.1",
  "version": "0.0.1",
  "description": "Fullstack ASM-Project/Task Manager Application using NX Workspace",
  "repository": "https://github.com/AliSafari-IT/asm-fs",
  "author": "Ali Safari",
  "nxVersion": "18.3.5",
  "devDependencies": {
    "@fluentui/react": "^8.121.11",
    "@fluentui/react-components": "^9.56.2",
    "@vitest/ui": "^1.3.1",
    "vite": "~5.0.0",
    "vitest": "^1.3.1"
  },
  "scripts": {
    "clean": "rm -rf node_modules && rm -rf .yarn/cache",
    "reset:yarn": "rm -rf .yarn && rm -rf node_modules && rm -rf yarn.lock && yarn install",
    "dev:backend": "yarn workspace @asm-fs/asafarim-server start",
    "dev:frontend": "yarn copy-changelogs && yarn workspace @asm-fs/asafarim-client dev",
    "build:backend": "yarn workspace @asm-fs/asafarim-server build",
    "build:frontend": "yarn copy-changelogs && yarn workspace @asm-fs/asafarim-client build",
    "test:backend": "yarn workspace @asm-fs/asafarim-server test",
    "test:frontend": "yarn workspace @asm-fs/asafarim-client test",
    "test": "yarn test:backend && yarn test:frontend",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,scss,md}\"",
    "copy-changelogs": "xcopy /Y /I \"E:\\asm-fs\\docs\\ChangeLogs\\*.md\" \"E:\\asm-fs\\apps\\frontends\\asafarim-client\\src\\pages\\Changelog\\changelogMds\""
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "axios": "^1.7.7",
    "jest": "^29.7.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "license": "MIT",
  "private": true,
  "engines": {
    "node": ">=16.14.0"
  },
  "workspaces": [
    "apps/backends/ASafariM.Server",
    "apps/frontends/asafarim-client"
  ]
}

```

---
