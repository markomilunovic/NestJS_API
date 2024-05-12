# NestJS API

This project is an NestJS API built with TypeScript, featuring user authentication, todo management, and user management functionalities.

## Table of Contents

- [Project Description](#project-description)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This API serves as a backend service for managing users and todo items. It includes features such as user registration, login and password reset, CRUD operations for todo items, and user management.

## Project Structure

The project directory is structured as follows:

- **auth**: Contains modules related to authentication. This includes:
  - **controllers**: Handles authentication requests.
  - **services**: Implements business logic for authentication processes.
  - **repositories**: Manages data access for authentication.
  - **dtos**: Defines Data Transfer Objects for request validation.
  - **strategies**: Contains strategies for authentication, such as JWT strategy.
  - **guards**: Holds guard classes for route protection and access control.
  - **utils**: Includes utility files like types for shared types and interfaces.
- **todo**: Manages todo-related functionalities with separate directories for:
  - **controllers**: Handles HTTP requests for todo operations.
  - **services**: Implements business logic for todo features.
  - **repositories**: Interacts with the database for todo data.
  - **dtos**: Manages Data Transfer Objects for validating todo inputs.
  - **utils**: Contains utility files such as types for shared types and interfaces.
- **user**: Handles user-related operations with folders for:

  - **controllers**: Manages HTTP request handling for user operations.
  - **services**: Implements business logic related to users.
  - **repositories**: Handles data access related to users.
  - **dtos**: Defines Data Transfer Objects for user data validation and transfer.
  - **utils**: Includes utility files like types for shared types and interfaces.

- **caching**: Contains caching mechanisms.
  - **interceptors**: Holds caching interceptors for managing data caching.
  - **services**: Manages Redis service for caching.
  - **decorators**: Contains a decorator used for caching functionalities.
- **models**: Defines Sequelize models for database tables.
- **database**: Includes subfolders for:
  - **migrations**: Contains migration scripts for database version control.
  - **seeders**: Stores seeder files used to populate the database with initial data for testing or development purposes.

## Installation

To install the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/markomilunovic/NestJS_API.git

# Navigate to the project directory
cd NestJS_API

# Install dependencies
npm install
```

To install the project using docker, follow these steps:

```bash
# Clone the repository
git clone https://github.com/markomilunovic/NestJS_API.git

# Navigate to the project directory
cd NestJS_API

# Build the docker image
docker-compose build
```

## Usage

To start the server locally, run the following command:

```bash
# To start the server normally
nest start

#To start the server in watch mode
nest start --watch
```

To start the server using docker, run the following commands:

```bash
# Build and start the Docker containers
docker-compose up

#Stop the running Docker containers
docker-compose down
```

## Endpoints

### Authentication

- **POST /auth/register:** Register a new user.
- **POST /auth/login:** Authenticate a user and generate access and refresh tokens.
- **POST /auth/forgot-password:** Request to reset the password.
- **POST /auth/reset-password:** Reset user password using a reset token.

### Todo Management

- **POST /todo:** Create a new todo item.
- **GET /todo:** Get all todo items.
- **GET /todo/:id:** Get a specific todo item.
- **PUT /todo/:id:** Update a specific todo item.
- **DELETE /todo/:id:** Delete a specific todo item.

### User Management

- **GET /user:** Get all users.
- **GET /user/:id:** Get a specific user.
- **PUT /user/:id:** Update a specific user.
- **DELETE /user/:id:** Delete a specific user.

## Environment Variables

The project uses the following environment variables:

- **DB_DIALECT:** Specifies the type of database.
- **DB_USERNAME:** Username for the database connection.
- **DB_PASSWORD:** Password for the database connection.
- **DB_NAME:** Name of the database.
- **DB_HOST:** Host address for the database.
- **DB_PORT**: The port number on which the database server is listening.
- **REDIS_PORT**: Port number for Redis.
- **REDIS_DB**: Redis database index.

<br>

- **ACCESS_TOKEN_SECRET:** Secret key for signing access tokens.
- **REFRESH_TOKEN_SECRET:** Secret key for signing refresh tokens.
- **RESET_TOKEN_SECRET:** Secret key for signing reset tokens.

<br>

- **ACCESS_TOKEN_EXP_TIME_IN_DAYS**: Number of days after which the JWT access token expires.
- **REFRESH_TOKEN_EXP_TIME_IN_DAYS**: Number of days after which the JWT refresh token expires.
- **RESET_TOKEN_EXP_TIME_IN_MINUTES**: Number of minutes after which the JWT reset token expires.

<br>

- **EMAIL_USER:** Sender email address for sending emails.
- **SENDGRID_API_KEY:** API key for SendGrid email service.

## Contributions

This project was developed by **Marko Milunović** during the internship at **Quantox Technology** with guidance from **Aleksa Ćamilović**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
