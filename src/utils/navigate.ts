import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const goBack = () => {
  if (!navigationRef.isReady()) return;

  navigationRef.canGoBack() && navigationRef.dispatch(CommonActions.goBack());
};

export const navigate = <P extends object>(name: string, params?: P) => {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(CommonActions.navigate(name, params));
};

export const navigateReset = <P extends object>(name: string, params?: P) => {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params}],
    }),
  );
};
