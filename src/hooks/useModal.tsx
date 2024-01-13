import React from 'react';
import {SET_LOADING, SET_MODAL} from 'store/reducers/app';
import {useWrapDispatch} from './useWrapDispatch';
import {
  AlertModal,
  ConfirmModal,
  DocumentModal,
  FileAsset,
  ImageAsset,
} from 'components';

export const useModal = () => {
  const mod = useWrapDispatch(SET_MODAL);
  const load = useWrapDispatch(SET_LOADING);

  const alert = (text: string, title?: string) =>
    mod({open: true, children: <AlertModal text={text} title={title} />});

  const confirm = (
    text: string,
    onConfirm: () => void,
    title?: string,
    onClosed?: () => void,
  ) =>
    mod({
      open: true,
      children: (
        <ConfirmModal
          text={text}
          onConfirm={onConfirm}
          title={title}
          onClosed={onClosed}
        />
      ),
    });

  const documents = (
    onSave: (props: {
      type: number;
      imageValue?: ImageAsset[];
      fileValue?: FileAsset;
    }) => void,
    onClosed?: () => void,
    pickerType?: 'File' | 'Image' | 'All',
    limit?: number,
  ) =>
    mod({
      open: true,
      children: (
        <DocumentModal
          onSave={onSave}
          pickerType={pickerType}
          limit={limit}
          onClosed={onClosed}
        />
      ),
    });

  const loading = (visible: boolean) => load(visible);

  return {alert, confirm, documents, loading};
};
