// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth
  SIGNUP: `${API_BASE_URL}/api/v1/user/signup`,
  SIGNIN: `${API_BASE_URL}/api/v1/user/signin`,
  UPDATE_USER: `${API_BASE_URL}/api/v1/user/update`,
  
  // User
  SEARCH_USERS: `${API_BASE_URL}/api/v1/user/bulk`,
  
  // Account
  GET_BALANCE: `${API_BASE_URL}/api/v1/account`,
  TRANSFER: `${API_BASE_URL}/api/v1/account/transfer`,
};

export default API_BASE_URL;
