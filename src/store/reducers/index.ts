import {combineReducers} from '@reduxjs/toolkit';
import app from './app';

const rootReducer = combineReducers({
  app,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
