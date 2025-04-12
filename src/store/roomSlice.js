// src/store/roomSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchAllRooms,
    fetchRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from '../services/roomService';

export const getRooms = createAsyncThunk('rooms/getAll', async (_, { rejectWithValue }) => {
    try {
        return await fetchAllRooms();
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch rooms');
    }
});

export const getRoom = createAsyncThunk('rooms/getOne', async (id, { rejectWithValue }) => {
    try {
        return await fetchRoomById(id);
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch room');
    }
});

export const createNewRoom = createAsyncThunk('rooms/create', async (roomData, { rejectWithValue }) => {
    try {
        return await createRoom(roomData);
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to create room');
    }
});

export const updateExistingRoom = createAsyncThunk('rooms/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        return await updateRoom(id, data);
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to update room');
    }
});

export const deleteRoomById = createAsyncThunk('rooms/delete', async (id, { rejectWithValue }) => {
    try {
        await deleteRoom(id);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to delete room');
    }
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        selectedRoom: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearSelectedRoom: (state) => {
            state.selectedRoom = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getRooms.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getRooms.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.rooms = payload;
            })
            .addCase(getRooms.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload;
            })
            .addCase(getRoom.fulfilled, (state, { payload }) => {
                state.selectedRoom = payload;
            })
            .addCase(createNewRoom.fulfilled, (state, { payload }) => {
                state.rooms.push(payload);
            })
            .addCase(updateExistingRoom.fulfilled, (state, { payload }) => {
                state.rooms = state.rooms.map(room => room._id === payload._id ? payload : room);
            })
            .addCase(deleteRoomById.fulfilled, (state, { payload }) => {
                state.rooms = state.rooms.filter(room => room._id !== payload);
            });
    },
});

export const { clearSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;
