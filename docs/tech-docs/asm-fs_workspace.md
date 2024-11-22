# **Analysis of our Workspace**

## **General Information**

- **Workspace Name**: `asm-fs`
- **Package Manager**: Yarn 4.5.1
- **NX Version**: 18.3.5
- **Repository**: [GitHub Repo](https://github.com/asm-fs/asm-fs)
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
"scripts": {
    "dev:backend": "yarn nx serve ASafariM.Server",
    "dev:frontend": "yarn nx serve asafarim-client",
    "build:backend": "yarn nx build ASafariM.Server",
    "build:frontend": "yarn nx build asafarim-client",
    "test:unit": "yarn nx run-many --target=test --projects=UnitTests",
    "test:integration": "yarn nx run-many --target=test --projects=IntegrationTests",
    "lint": "yarn nx lint",
    "format": "yarn nx format:write",
    "migrate:db": "dotnet ef database update --project=apps/backends/ASafariM.Server",
    "generate:crud": "yarn nx g @nx-dotnet/core:app <name>"
}
```

---
