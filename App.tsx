import Common from 'common';
import {Provider} from 'react-redux';
import store from 'store';
import 'react-native-gesture-handler';
import React from 'react';
import Root from 'routes/root-stack';
import {useCodePush} from 'hooks/useCodePush';
import codePush from 'react-native-code-push';
import {usePusher} from 'hooks';

const App = (): React.JSX.Element => {
  useCodePush();
  usePusher();

  return (
    <Provider store={store}>
      <Common>
        <Root />
      </Common>
    </Provider>
  );
};

export default codePush(App);
