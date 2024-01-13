import CodePush from 'react-native-code-push';
import {Alert} from 'react-native';
import {useEffect} from 'react';

export const useCodePush = () => {
  interface Progress {
    receivedBytes: number;
    totalBytes: number;
  }

  const codePushAlert = () =>
    Alert.alert(
      'Thông báo cập nhật',
      'Có bản cập nhật cho phiên bản hiện tại. Bấm OK để khởi động lại ứng dụng',
      [
        {
          text: 'OK',
          onPress: () => {
            CodePush.allowRestart();
            CodePush.restartApp();
          },
        },
      ],
      {cancelable: false},
    );

  const codePushOptions = {
    installMode: CodePush.InstallMode.IMMEDIATE,
    mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESUME,
    rollbackRetryOptions: {
      delayInHours: 0,
      maxRetryAttempts: 0,
    },
    updateDialog: {
      title: 'Cập nhật',
      mandatoryUpdateMessage:
        'Ứng dụng sẽ được cập nhật để cung cấp các tính năng mới.',
      mandatoryContinueButtonLabel: 'Cập nhật',
      optionalUpdateMessage: 'Cần cập nhật để cung cấp các tính năng mới.',
      optionalInstallButtonLabel: 'Cập nhật',
      optionalIgnoreButtonLabel: 'Cập nhật',
    },
  };

  const codePushSyncStatus = (status: number) => {
    switch (status) {
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        CodePush.disallowRestart();
        Alert.alert('Cập nhật', 'Tệp cập nhật đang được tải xuống.', [], {
          cancelable: false,
        });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        CodePush.notifyAppReady();
        codePushAlert();
        break;
    }
  };

  const codePushProgress = (progress: Progress) => {
    console.log(
      'Downloading ' + progress.receivedBytes + ' of ' + progress.totalBytes,
    );
  };

  const updateCheckCodePush = CodePush.checkForUpdate().then(
    async update => {
      if (update) {
        await CodePush.sync(
          codePushOptions,
          codePushSyncStatus,
          codePushProgress,
          err => {
            console.error('codePushSync error', err);
          },
        );
      }
    },
    err => {
      console.error('codePushCheck error', err);
    },
  );

  useEffect(() => {
    updateCheckCodePush;
  });
};
