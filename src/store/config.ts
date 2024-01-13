import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, Store} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import modules from './reducers';
export let store: Store;

const createStore = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
    whitelist: ['app'],
  };

  const persistedReducer = persistReducer(persistConfig, modules);

  // const logger = createLogger()

  store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        // .concat(logger)
        .concat(thunk),
    preloadedState: {},
    enhancers: defaultEnhancers => [...defaultEnhancers],
  });

  return store;
};

export default createStore;

export type AppDispatch = typeof store.dispatch;
