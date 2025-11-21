# Shivalik Graphics E-commerce App

This is an e-commerce application built for Shivalik Graphics as part of an internship project. The platform allows users to purchase books, designs, and customize orders by choosing paper quality, binding type, and more. The app includes features such as user authentication (including OTP-based flows), address management, customizable order creation, and an admin dashboard.

---

## Features

- **User Signup/Signin** with OTP and password options  
- **Customizable Product Ordering:** Users can select paper quality, GSM, binding type, print color, etc.  
- **Address Management:** Users can add and manage their delivery addresses  
- **Order Management:** Place orders with full customization  
- **Admin Panel:** Manage users, orders, and materials  
- **Email Verification:** OTPs sent to users via email for verification and login

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose ODM)  
- **Email:** Nodemailer for sending OTP and order confirmation emails  
- **Admin:** AdminJS  
- **Frontend:** REACT JS

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database URI (local or cloud)
- Email credentials for sending OTPs (e.g., Gmail SMTP/app password)

### Environment Variables

Create a `.env` file in the root directory and add:
PORT=4000
MONGO_URL=your_mongodb_uri
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/laladwesh/personal-work
    cd backend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the server:
    ```
    npm start
    ```
    The backend will run on `http://localhost:4000` (or your specified port).

---

## API Endpoints

> All endpoints are prefixed with `/api/v1`

- `POST /signup` - Register new user  
- `POST /signin` - Login user with password  
- `POST /login-otp` - Login user with OTP  
- `POST /send-otp` - Send OTP for signup  
- `POST /send-login-otp` - Send OTP for login  
- `PUT /update-user` - Update user info  
- `POST /getaddress` - Get user's address  
- `POST /addaddress` - Add address  
- `GET /services/:id` - Get a service by ID  
- `GET /materials/:id/:category` - Get materials by service/category  
- `POST /new-order` - Place a new order  

---

## Project Structure

/admin_panel/ # AdminJS configuration
/config/ # Database config
/controllers/ # Request handler logic
/models/ # Mongoose schemas
/routes/ # Express route definitions
/utils/ # Utility functions (e.g. mailSender)
index.js # Main entry point
.env # Environment variables

---

## Admin Panel

- The admin dashboard can be accessed at the path set in `admin.options.rootPath` (e.g., `/admin`)
- Manage users, orders, materials, and services from the panel

---

## Notes

- Make sure your email credentials are correct and you have enabled "less secure app" or "app passwords" for Gmail if required
- In production, ensure environment variables and database URIs are secured
- For frontend README.md please go inside frontend folder , this README.md majorly have server setup instructions

---

## License

This project was created as part of an internship at **Shivalik Graphics**.

