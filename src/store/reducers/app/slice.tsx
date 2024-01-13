import {ActivityIndicator} from 'react-native';
import {IConfigState, ILoading, IModal, IPopUp, IToast} from './types';
import {Fragment} from 'react';
import {createSlice} from '@reduxjs/toolkit';

const initialState: IConfigState = {
  loading: {
    isLoading: false,
  },
  modal: {
    open: false,
    children: <Fragment />,
  },
  popUp: {
    open: false,
    children: <Fragment />,
  },
  toast: {
    open: false,
    children: <Fragment />,
  },

  badge: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    SET_LOADING: (state: IConfigState, payload: {payload: boolean}) => {
      state.loading.isLoading = payload.payload;
    },
    SET_MODAL: (state: IConfigState, payload: {payload: IModal}) => {
      state.modal = payload.payload;
    },
    SET_TOAST: (state: IConfigState, payload: {payload: IToast}) => {
      state.toast = payload.payload;
    },
    SET_POPUP: (state: IConfigState, payload: {payload: IPopUp}) => {
      state.popUp = payload.payload;
    },
    SET_BADGE: (state: IConfigState, payload: {payload: boolean}) => {
      return {...state, badge: payload.payload};
    },
  },
});

export const {SET_LOADING, SET_MODAL, SET_TOAST, SET_POPUP, SET_BADGE} =
  appSlice.actions;

export default appSlice.reducer;
