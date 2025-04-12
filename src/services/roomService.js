// src/services/roomService.js
import axios from 'axios';
import api from '../utils/api'; // same instance used for login/signup

const BASE_URL = 'http://localhost:5000/api/rooms';

export const fetchAllRooms = async () => {
    const response = await api.get(BASE_URL);
    return response.data;
};

export const fetchRoomById = async (id) => {
    try {
        console.log('Fetching room with ID:', id); // Debugging line
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error('Error fetching room:', error);
        throw error; // Re-throw error for handling in component
    }
};
export const createRoom = async (roomData) => {
    const response = await api.post(BASE_URL, roomData);
    return response.data;
};

export const updateRoom = async (id, roomData) => {
    try {
        const token = localStorage.getItem('token'); // or get from Redux if stored there
        const response = await axios.put(
            `${BASE_URL}/${id}`,
            roomData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating room:', error);
        throw error;
    }
};


export const deleteRoom = async (id) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
};
