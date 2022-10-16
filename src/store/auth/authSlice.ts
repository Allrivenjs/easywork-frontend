import { createSlice } from '@reduxjs/toolkit';
import { IProfile } from './interfaces';

export interface IAuthSlice {
  profile: IProfile | null;
  status: string;
};

const initialState: IAuthSlice = {
  status: 'checking',
  profile: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = 'authenticated'; // 'not-authenticated', 'authenticated', 'checking'
      console.log(payload);
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated'; // 'not-authenticated', 'authenticated', 'checking'
    },
    onCheckingCredentials: ( state ) => {
      state.status = 'checking';
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  onLogin,
  onLogout,
  onCheckingCredentials
} = authSlice.actions;
