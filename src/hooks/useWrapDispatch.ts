import {PayloadActionCreator} from '@reduxjs/toolkit';
import {useAppDispatch} from 'hooks';
import {useCallback} from 'react';

export const useWrapDispatch = <
  T extends (...args: any) => any,
  P extends any[] = Parameters<T>,
>(
  func: T extends PayloadActionCreator<string, any> ? T : (...args: any) => any,
) => {
  const dispatch = useAppDispatch();

  const wrapper = useCallback(
    (...args: P) => {
      dispatch(func(...args));
    },
    [dispatch],
  );

  return wrapper;
};
