# User Management System

This project is a User Management System built with a **Node.js backend** using **Express**, **Prisma ORM**, and **PostgreSQL** for database management. The **frontend** is developed in **Vue.js**. The system supports user authentication, role-based access, user invitations, and CRUD operations for user accounts.

## Features

- **User Registration and Login**:
  - Users can register and log in with email and password.
  - Passwords are securely hashed using `bcrypt`.
  - `JWT` is used for authentication.

- **Role-Based Access Control**:
  - Three user roles: `ADMIN`, `MODERATOR`, and `GUEST`.
  - Admins have privileges like inviting users and performing all CRUD operations.

- **User Invitation**:
  - Admins can invite users via email.
  - Invitation tokens are valid for 24 hours.
  - Invitations are stored in the database for tracking.

- **CRUD Operations**:
  - Users can manage their own profiles.
  - Admins can manage all users.
  - Prevents the deletion of the last admin account.

- **API Documentation**:
  - Includes various endpoints for user registration, login, management, and invitations.

## Technologies Used

### Backend
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **Prisma**: ORM for database management.
- **PostgreSQL**: Database.
- **Nodemailer**: For sending emails.
- **JWT**: For secure token-based authentication.
- **Bcrypt**: For password hashing.

### Frontend
- **Vue.js**: Frontend framework for a responsive and dynamic UI.
- **Axios**: For API communication with the backend.

## Setup and Installation

### Prerequisites
- Node.js (>=16.0.0)
- PostgreSQL
- npm or yarn

### Environment Variables For backend
Create a `.env` file in the backend directory and add the following variables:
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_ID=your_email_address
EMAIL_PASS=your_email_password
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM=your_email_sender
FRONTEND_URL=http://localhost:8080



### Installation

1. Clone the repository:
    ```sh
    git clone repo_url
    cd repo_name
    ```

2. Install dependencies:
    ```sh
    cd client
    npm install
    cd ../backend
    npm install
    ```

3. Set up your environment variables in a `.env` file inside backend folder:
    ```env
    Create a `.env` file in the backend directory and add the following variables:
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_ID=your_email_address
EMAIL_PASS=your_email_password
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM=your_email_sender
FRONTEND_URL=http://localhost:8080
    ```

4. Run database migrations:
    ```sh
    npx prisma migrate dev --name <migration_name>
    ```

5. Copy backend url `VUE_APP_API_URL=http://localhost:3000` and place it inside client/src/lib/util.js

### Running the Application

1. Start the backend server:
    ```sh
    cd server
    npm start
    ```

2. Start the frontend development server:
    ```sh
    cd client
    npm run dev
    ```
### API Endpoints

#### Auth Routes
- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Login a user.

#### User Routes
- **GET** `/api/users/me`: Get details of the logged-in user.
- **GET** `/api/users/all`: Get all users (admin only).
- **PUT** `/api/users/edit/:id`: Edit a user's details.
- **DELETE** `/api/users/delete/:id`: Delete a user (admin only).

#### Invitation Routes
- **POST** `/api/mail/invite`: Send an invitation email to a new user.



### Usage

#### Register a User
1. Navigate to the registration page on the frontend.
2. Fill out the form and submit.
3. A user will be created in the database.

#### Login
1. Navigate to the login page.
2. Enter valid credentials to log in and receive a token.

#### Send an Invitation
1. Log in as an admin.
2. Use the invitation feature to invite a new user to the platform.

#### CRUD Operations
1. As an admin, access the list of users.
2. Edit or delete users as necessary.



