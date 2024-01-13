import {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';

export const useCamera = () => {
  const [photo, setPhoto] = useState({uri: '', type: '', name: ''});

  const takePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.didCancel) return;

    const assets = result?.assets?.map(asset => {
      const localUri = asset.uri;
      const uri = 'file://' + localUri?.split('//').pop();
      const name = localUri?.split('/').pop() ?? '';

      return {
        uri,
        type: 'multipart/form-data',
        name,
      };
    });

    assets && setPhoto(assets[0]);
    if (assets) return assets[0];
  };

  return {
    photo,
    setPhoto,
    takePhoto,
  };
};
