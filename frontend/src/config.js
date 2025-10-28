// Centralized API URL for the frontend. Uses REACT_APP_API_URL with fallback.
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default API_URL;
