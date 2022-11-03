import { createSlice } from '@reduxjs/toolkit';

import { IProfile } from '../auth/interfaces';

export enum Status {
  Found,
  NotFound,
  UnSetted,
};

export interface IActiveProfileSlice {
  status: Status;
  profile: IProfile | null;
};

const initialState: IActiveProfileSlice = {
  status: Status.UnSetted,
  profile: null,
};

export const activeProfileSlice = createSlice({
  name: 'activeProfile',
  initialState,
  reducers: {
    onFoundActiveProfile: (state, { payload }) => {
      state.profile = payload;
      state.status = Status.Found;
    },
    onNotFoundActiveProfile: ( state ) => {
      state.profile = null;
      state.status = Status.NotFound;
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  onFoundActiveProfile,
  onNotFoundActiveProfile,
} = activeProfileSlice.actions;
