import { createSlice } from '@reduxjs/toolkit';
import {
  IProfile,
} from './interfaces';

export enum Status {
  Checking = 'checking',
  Authenticated = 'authenticated',
  NotAuthenticated = 'not-authenticated',
};

export interface IAuthSlice {
  userProfile: IProfile | null;
  status: Status;
};

const initialState: IAuthSlice = {
  status: Status.Checking,
  userProfile: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = Status.Authenticated;
      state.userProfile = payload;
    },
    onLogout: ( state ) => {
      state.status = Status.NotAuthenticated;
      state.userProfile = null;
    },
    onCheckingCredentials: ( state ) => {
      state.status = Status.Checking;
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  onLogin,
  onLogout,
  onCheckingCredentials
} = authSlice.actions;
