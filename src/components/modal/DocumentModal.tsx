import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {View} from 'react-native';
import React, {Fragment} from 'react';
import {borderRadius, height, margin, padding} from 'utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppText, CustomButton, Row, Spacing} from 'components';
import {useWrapDispatch} from 'hooks';
import {SET_MODAL} from 'store/reducers/app';
import {Colors} from 'const';

export interface ImageAsset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}

export interface FileAsset {
  uri: string;
  name: string | null;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
}

interface Props {
  onClosed?: () => void;
  onSave: (props: {
    type: number;
    imageValue?: ImageAsset[];
    fileValue?: FileAsset;
  }) => void;
  pickerType?: 'File' | 'Image' | 'All';
  limit?: number;
}

export const DocumentModal = ({
  onClosed,
  onSave,
  pickerType = 'All',
  limit,
}: Props) => {
  const inset = useSafeAreaInsets();

  const modal = useWrapDispatch(SET_MODAL);

  const cameraOptions: ImageLibraryOptions & CameraOptions = {
    mediaType: 'photo',
    selectionLimit: limit ?? 0,
    saveToPhotos: true,
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.5,
  };

  const close = () => {
    onClosed && onClosed();
    modal({open: false, children: <Fragment />});
  };

  const onPicker = async (type: 'Camera' | 'Lib' | 'File') => {
    try {
      //PICK IMAGE WITH CAMERA
      if (type == 'Camera') {
        await launchCamera(cameraOptions, response => {
          onSave({type: 0, imageValue: response.assets ?? []});
          close();
        });
      }

      //SELECT IMAGE IN LIBRARY
      if (type == 'Lib') {
        await launchImageLibrary(cameraOptions, response => {
          onSave({type: 0, imageValue: response.assets ?? []});
          close();
        });
        return;
      }

      //PICK FILE
      await DocumentPicker.pickSingle({}).then(response => {
        onSave({type: 1, fileValue: response as FileAsset});
        close();
      });
    } catch (error) {
      console.log('PICKER_ERROR', error);
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: Colors.WHITE,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        },
        padding(18, 18, 18 + inset.bottom, 18),
        borderRadius(12, 12),
      ]}>
      <Row justifyContent="space-between">
        <AppText f16_bold flex={1}>
          Chọn phương thức
        </AppText>
        <Row onPress={close}>
          <AppText f16 color={Colors.RED5}>
            Đóng
          </AppText>
        </Row>
      </Row>

      <Spacing height={1} bg={Colors.N3} {...margin(14, 0)} width={'100%'} />

      <View style={padding(0, 6)}>
        {(pickerType === 'Image' || pickerType === 'All') && (
          <>
            <CustomButton
              label="Chụp ảnh"
              onPress={() => {
                onPicker('Camera');
              }}
              style={{marginBottom: height(16)}}
            />

            <CustomButton
              label="Chọn ảnh từ thư viện"
              onPress={() => {
                onPicker('Lib');
              }}
              style={{marginBottom: height(16)}}
            />
          </>
        )}

        {(pickerType === 'All' || pickerType === 'File') && (
          <CustomButton
            style={{marginBottom: height(16)}}
            label="Chọn file"
            onPress={() => {
              onPicker('File');
            }}
          />
        )}
      </View>
    </View>
  );
};
