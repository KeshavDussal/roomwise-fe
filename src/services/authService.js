import api from '../utils/api';

export const signup = async (userData) => {
    const response = await api.post('http://localhost:5000/api/auth/signup', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('http://localhost:5000/api/auth/login', credentials);
    console.log("Login API Response:", response.data); // 👈 Add this line
    return response.data;
};