# Video Game API

## Overview
This repository provides a modularized **Video Game API** designed with a clean architecture approach, dividing the solution into three distinct layers:
1. **API Layer**: Exposes RESTful endpoints for client interaction.
2. **Business Logic Layer (BLL)**: Encapsulates the core application logic and coordinates the flow between the API and Data Access Layer.
3. **Data Access Layer (DAL)**: Manages database interactions using **Entity Framework Core** and **Microsoft SQL Server**.

## Features
- **Entity Framework Core**: Enables seamless database management with support for migrations.
- **Microsoft SQL Server**: Database backend for secure and efficient data storage.
- **Automapper**: Simplifies the mapping of models to Data Transfer Objects (DTOs) for cleaner and more efficient code.
- **Layered Architecture**: Ensures separation of concerns, promoting maintainability and scalability.

---

## Project Structure

### API Layer
- Hosts the controllers and exposes RESTful endpoints.
- Uses dependency injection to integrate with the BLL.
- Controllers are located in [`TestAPI/Controllers`](TestAPI/Controllers).
- Example: [`VideoGameController`](TestAPI/Controllers/VideoGameController.cs) handles CRUD operations for video games.

### Business Logic Layer (BLL)
- Contains service classes that implement core application logic.
- Abstracts and validates requests from the API before interacting with the DAL.
- Services are located in [`BLL/Services`](BLL/Services).
- Example: [`VideoGameService`](BLL/Services/VideoGameService.cs) implements methods to manage video games.

### Data Access Layer (DAL)
- Manages database interactions using **Entity Framework Core**.
- Contains repository interfaces and implementations.
- Uses **Microsoft SQL Server** as the database backend.
- Migrations and entities are located in [`DAL/Migrations`](DAL/Migrations) and [`DAL/Entites`](DAL/Entites) respectively.
- Example: [`VideoGameDbContext`](DAL/Data/VideoGameDbContext.cs) defines the database context.

---

## Technical Details

### API Layer
- **Entity Framework Core**: Used to interact with the **Microsoft SQL Server** database. Configured in [`DAL/DAL.csproj`](DAL/DAL.csproj).
- **Automapper**: Used to map between domain models and DTOs. Configured in [`BLL/Services/VideoGameService.cs`](BLL/Services/VideoGameService.cs).
- **Dependency Injection**: Used to inject services and repositories into controllers. Example: [`VideoGameController`](TestAPI/Controllers/VideoGameController.cs).

### Business Logic Layer (BLL)
- **Services**: Implement core application logic. Example: [`VideoGameService`](BLL/Services/VideoGameService.cs).
- **Validation**: Ensures data integrity before interacting with the DAL. Example: [`ValidateVideoGame`](BLL/Services/VideoGameService.cs) method in [`VideoGameService`](BLL/Services/VideoGameService.cs).

### Data Access Layer (DAL)
- **Entity Framework Core**: Manages database interactions. Example: [`VideoGameDbContext`](DAL/Data/VideoGameDbContext.cs).
- **Migrations**: Used to manage database schema changes. Example: [`Initial`](DAL/Migrations/20241206083809_Initial.Designer.cs).
- **Repositories**: Abstract database operations. Example: [`IVideoGameRepository`](DAL/Repository/Interface/IVideoGameRepository.cs).

---

## Frontend

### Overview
The frontend is built using **React**, **TypeScript**, and **Vite**. It uses **React-Query** for data fetching, mutating and caching, **React-Hook-Form** for form handling, and **Tailwind CSS** for styling.

### Project Structure
- **Components**: Located in [`VideoGameApp/src/components`](VideoGameApp/src/components).
- **Main Entry**: [`VideoGameApp/src/App.tsx`](VideoGameApp/src/App.tsx).

### Technical Details
- **React-Query**: Used for data fetching and caching. Example: [`useQuery`](VideoGameApp/src/components/VideoGames.tsx) to fetch video games.
- **React-Hook-Form**: Used for form handling. Example: [`useForm`](VideoGameApp/src/components/AddGameForm.tsx) to handle form submissions.
- **Tailwind CSS**: Used for styling. Configured in [`VideoGameApp/src/index.css`](VideoGameApp/src/index.css).

### Query Invalidation
- **Query Invalidation on Mutation Success**: Ensures stale data is refetched after a mutation. Example: [`queryClient.invalidateQueries`](VideoGameApp/src/components/AddGameForm.tsx) to refetch video games after adding a new game.

---

## Getting Started

### Prerequisites
- **.NET 8.0 SDK**
- **Node.js** and **npm**

### Setup

1. **Clone the repository**:
    - Use the code below:
        ```sh
        git clone https://github.com/your-repo/videogame-api.git
        cd videogame-api
        ```

2. **Backend**:
    - Navigate to the [`TestAPI`](TestAPI) directory:
        ```sh
        cd TestAPI
        ```
    - Restore dependencies and run the application:
        ```sh
        dotnet restore
        dotnet run
        ```

3. **Frontend**:
    - Navigate to the [VideoGameApp](http://_vscodecontentref_/0) directory:
        ```sh
        cd VideoGameApp
        ```
    - Install dependencies and start the development server:
        ```sh
        npm install
        npm run dev
        ```

---

## Conclusion
This project demonstrates a clean architecture approach to building a modularized Video Game API with a React frontend. It leverages modern technologies like **Entity Framework Core**, **Automapper**, **React-Query**, and **React-Hook-Form** to create a maintainable and scalable application.