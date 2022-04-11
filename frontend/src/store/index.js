import { configureStore } from '@reduxjs/toolkit';
import accountSlice from '../slices/account-slice';

const store = configureStore({
    reducer: {
        account: accountSlice.reducer
    }
});

export default store;