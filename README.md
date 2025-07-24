# Grumble User Backend

This is a Node.js Express backend for the Grumble complaints platform using MySQL and Sequelize ORM.

## Features
- REST API for complaints, companies, categories, users, and authentication
- Sequelize models for MySQL
- JWT-based authentication

## Setup
1. Copy `.env.example` to `.env` and fill in your MySQL credentials.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the server.

## Endpoints
- `/api/complaints`
- `/api/companies`
- `/api/categories`
- `/api/users`
- `/api/auth`

## License
MIT
