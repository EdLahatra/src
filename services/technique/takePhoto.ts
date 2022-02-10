import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
} from 'react-native-image-picker';

import {uploadFile} from './uploadFile';

const options: CameraOptions = {
  quality: 1,
  mediaType: 'photo',
  includeBase64: true,
  maxHeight: 400,
  maxWidth: 400,
};

export const takePhotosApi = async (camera = true): Promise<string> => {
  if (camera) {
    return new Promise((resolve, reject) => {
      launchCamera(options, async (response: any) => {
        if (response.didCancel) {
          reject('');
        } else if (response.error) {
          reject('');
        } else {
          const uri = response.uri;
          const type = response.type;
          const name = response.fileName;
          const source = {
            uri,
            type,
            name,
          };
          const url = await uploadFile(source);
          resolve(url);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      launchImageLibrary(options, async (response: any) => {
        if (response.didCancel) {
          reject('');
        } else if (response && response.error) {
          reject('');
        } else {
          const uri = response.uri;
          const type = response.type;
          const name = response.fileName;
          const source = {
            uri,
            type,
            name,
          };
          const url = await uploadFile(source);
          resolve(url);
        }
      });
    });
  }
};
