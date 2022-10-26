import { createSlice } from '@reduxjs/toolkit';

import { IProfile } from '../auth/interfaces';

export enum Status {
  Found,
  NotFound,
  UnSetted,
};

export interface IActiveProfileSlice {
  status: Status;
  activeProfile: IProfile | null;
};

const initialState: IActiveProfileSlice = {
  status: Status.UnSetted,
  activeProfile: null,
};

export const activeProfileSlice = createSlice({
  name: 'activeProfile',
  initialState,
  reducers: {
    onFoundActiveProfile: (state, { payload }) => {
      state.activeProfile = payload;
      state.status = Status.Found;
    },
    onNotFoundActiveProfile: ( state ) => {
      state.activeProfile = null;
      state.status = Status.NotFound;
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  onFoundActiveProfile,
  onNotFoundActiveProfile,
} = activeProfileSlice.actions;
