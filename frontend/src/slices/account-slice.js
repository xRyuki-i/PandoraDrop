import { createSlice } from '@reduxjs/toolkit';
import fetchStates from '../store/fetchStates';

const accountSlice = createSlice({
    name: 'account',
    initialState: { loggedIn: false },
    reducers: {
        fetch (state) {
            state.status = fetchStates.fetching;
        },
        fetch_error (state, action) {
            state.status = fetchStates.error;
            state.message = action.payload;
            state.loggedIn = false;
        },
        fetch_success(state, action) {
            state.message = action.payload;
            state.status = fetchStates.success;
            state.loggedIn = true;
        },
        fetch_logout_success(state, action){
            state.status = fetchStates.success;
            state.message = action.payload;
            state.loggedIn = false;
        },
        fetch_authenticated_success(state, action){
            state.status = fetchStates.success;
            state.message = action.payload;
            state.loggedIn = action.payload;
        }
    }
});

export const accountActions = accountSlice.actions;

export default accountSlice;