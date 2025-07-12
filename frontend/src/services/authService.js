import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth'; // Change if your backend runs on a different port

// Register a new user
export const registerUser = async ({ name, email, password }) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, {
    name,
    email,
    password,
    role: 'user', // default role
  });
  return response.data;
};

// Login as user or admin
export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

// Get the current logged-in user's data
export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Optional: Admin-only test route
export const adminOnlyTest = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/admin-only`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
