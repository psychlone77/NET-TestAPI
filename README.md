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

### Business Logic Layer (BLL)
- Contains service classes that implement core application logic.
- Abstracts and validates requests from the API before interacting with the DAL.

### Data Access Layer (DAL)
- Uses **Entity Framework Core** to handle database operations.
- Includes models and configurations for database tables.
- Provides repository classes to encapsulate data access logic.

---
