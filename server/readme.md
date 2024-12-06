# Drive Now - Car Rental System

Welcome to **Drive Now**! This guide will help you set up and run both the server and client sides of the Car Rental System application locally on your machine.

## Table of Contents

- [Project Overview](#project-overview)
- [Live URL](#live-url)
- [Features](#features)
- [Technology Used](#technology-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Running the Application](#running-the-application)

## Project Overview

The Car Rental System is a web application designed to facilitate the booking and rental of cars. Users can view available cars, book them for a specific period, and return them after use. Administrators can manage the car inventory and user information.

## Live URL

Check out the live version of the application here: [Drive Now](https://your-live-url.com)

## Features

- **User Authentication**: Sign up, log in, and manage user profiles.
- **Car Management**: Retrieve, add, update, and delete car information.
- **Booking System**: Book cars for specific periods and calculate the rental cost.
- **Admin Panel**: Manage bookings and car inventory.

## Technology Used

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT** for Authentication
- **Bcrypt** for Password Hashing
- **Zod** for Validation
- **TypeScript**
- **Dotenv**

### Frontend

- **React**
- **Tailwind CSS**
- **Framer Motion** for Animations

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 20 or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6 or higher)

## Installation

### Server

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Rupok-Koiry/ph-assignment-03
   cd ph-assignment-03/server
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

### Client

1. **Navigate to the client directory**:

   ```sh
   cd ../client
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

## Setting Up Environment Variables

Create a `.env` file in both the `server` and `client` directories and add the required environment variables:

### Server

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=mongodb+srv://<user_name>:<user_password>@cluster0.etdfbfi.mongodb.net/ph-university?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=12
JWT_SECRET=rupok2024
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=30
```

### Client

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
```

## Running the Application

### Server

To run the server in development mode with hot-reloading:

```sh
cd server
npm run start:dev
```

The server will be accessible at http://localhost:8000.

### Client

To run the client in development mode:

```sh
cd client
npm start
```

The client will be accessible at http://localhost:5176.

Thank you for using **Drive Now**! Happy riding! 🚗💨
