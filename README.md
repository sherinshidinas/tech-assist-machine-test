Coding Challenge: Secure SaaS User Management System

Objective

Develop a full-stack SaaS application for user registration, login, and profile viewing. Implement React for the front end, Node.js for the back end, and MySQL for data storage. Demonstrate deployment on the AWS free tier for a fully functional demo. 
Integrate automated testing to ensure code quality.

Technical Specifications

Front-End (React)

Dependencies:
  - axios: For API requests.
  - react-router-dom: For routing.
  - sass: For styling with SCSS.
    
Features:
  - Design a login screen that departs from the standard username/password format.
  - Create a user registration form capturing essential user information (e.g., email, password, name, company (optional)).
  - Implement input validation for email format, password strength, etc.
  - Upon successful login, display a user profile page showcasing the registered details.
    
Running Command:    npm start
 
Back-End (Node.js)

Dependencies:

  - bcrypt: For hashing passwords.
  - cookie-parser: For parsing cookies.
  - cors: For enabling cross-origin requests.
  - dotenv: For environment variable management.
  - express: For server and routing.
  - jsonwebtoken: For token-based authentication.
  - nodemon: For automatic server restarts during development.
    
  Features:
  
  - Set up a Node.js project with Express.js for routing.
  - Establish a secure connection to a MySQL database.
  - Create API endpoints for:
    - User registration with secure password hashing (e.g., bcryptjs).
    - User login with authentication against the database.
    - Retrieving user profile data based on login credentials.
  - Implement error handling and validation for secure and robust functionality.
    
Running Command:  npm start
 
Database (MySQL)

Schema Design:

  - Store user information (username/email, password hash, name, company).
  - Ensure appropriate data types and constraints for security and efficiency.

Getting Started:

Prerequisites:

- Node.js installed
- MySQL installed and running
- AWS account for deployment

Installation

Clone the repository:
  
   git clone https://github.com/yourusername/secure-saas-user-management-system.git
   cd secure-saas-user-management-system
 

Set up the front end:

   cd frontend
   npm install
  

Set up the back end:
  
   cd ../backend
   npm install

Configure environment variables:

   - Create a `.env` file in the backend directory with the following content:
     
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     JWT_SECRET=your_jwt_secret
   

Running the Application

Start the backend:
  
   cd backend
   npm start
  

Start the frontend:

   cd ../frontend
   npm start
  
Access the application:

   - Open your browser and navigate to `http://localhost:3000`

Deployment

- Deploy the backend and frontend on AWS EC2 following AWS deployment guides.
- Ensure that the MySQL database is accessible to the deployed application.






