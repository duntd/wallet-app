import store from 'store';
import {Provider} from 'react-redux';
import React from 'react';
import Prerequisites from './Prerequisites';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

export default ({children}: React.PropsWithChildren<any>) => {
  const _persistStore = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={_persistStore}>
        <Prerequisites>{children}</Prerequisites>
      </PersistGate>
    </Provider>
  );
};
