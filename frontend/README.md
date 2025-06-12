# Shivalik Graphics E-commerce Frontend

This is the React frontend for the Shivalik Graphics E-commerce platform, developed for internship work at Shivalik Graphics. The app enables users to browse, customize, and place orders for print materials and designs, as well as manage their profile and addresses.

---

## Features

- User-friendly interface for ordering books and custom print products
- Product customization (paper quality, size, binding, etc.)
- Secure authentication and OTP-based flows
- Address management
- Order tracking and history
- Integrates with backend API for dynamic data

---

## Tech Stack

- **Frontend:** React (with functional components)
- **Styling:** (Add here if you used Tailwind, Material-UI, CSS, etc.)
- **API Integration:** Uses REST endpoints from the backend

---

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
    ```
    git clone <repository-url>
    cd <project-folder>
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm start
    ```

    The app will run at `http://localhost:3000` by default.

---

## API Configuration

- Make sure the backend server is running (default: `http://localhost:4000`)
- If the backend runs on a different URL/port, update your API base URLs in the frontend code (commonly in an `api.js` or `.env` file):

    ```
    REACT_APP_BACKEND_URL=http://localhost:4000
    ```

---

## Project Structure

/src
/components # Reusable UI components
/pages # Main app pages (e.g., Home, Product, Cart)
/routes # Route definitions (if using react-router)
/api # API integration files
App.js
index.js
...
public/
package.json
README.md


---

## Usage

- Register or log in as a user
- Browse services and customize your order
- Add your delivery address
- Place orders and track status from your dashboard

---

## License

This frontend was created as part of an internship at **Shivalik Graphics**.
