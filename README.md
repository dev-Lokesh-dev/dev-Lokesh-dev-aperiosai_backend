# aperiosai_backend
## Project Overview

 A secure and efficient backend API built with Node.js, Express, and MongoDB, designed to manage retailer data with features like search, filtering, geolocation, and WhatsApp integration.

## Features

- 🔍 Search Retailers: Case-insensitive search by name.
- 🏷️ Category Filtering: Filter retailers by multiple categories.
- 📍 Geolocation Support: Sort and filter retailers based on proximity using the Haversine formula.
- 💬 WhatsApp Integration: Generate direct WhatsApp links to contact retailers.
- 📄 Pagination: Efficient data retrieval with page and limit parameters.
- 🔒 JWT Authentication: Secure API endpoints using JSON Web Tokens.
- 🛡️ Input Validation: Robust request validation using Zod schemas.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB 

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dev-Lokesh-dev/dev-Lokesh-dev-aperiosai_backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variables:
    ```
    PORT=4000
    DB_URL=mongodb://localhost:27017/retailerdb
    DEFAULT_PAGE_SIZE=10
    JWT_SECRET = your_secret_key
    ```

## Running the Application

- Start the development server:
  ```bash
  npm run start
  ```
