import {Platform} from 'react-native';
import env from 'react-native-config';

//let url = 'http://localhost:4000/';
let url = 'https://test-andoom.herokuapp.com/';

if (Platform.OS === 'web') {
  const {REACT_APP_API_URL} = process.env;
  url = REACT_APP_API_URL;
} else {
  // Load Mobile env
  const {REACT_APP_API_URL} = env;
  url = REACT_APP_API_URL;
}

export default {
  url,
  baseURL: 'http://localhost:4000/',
  // baseURL: 'https://test-andoom.herokuapp.com/',
  apiDocs: `${url}api-docs/`,
  pathApi: 'api/',
  myprivatekey: 'myprivatekey',
  FACEBOOK_APP_ID: '873298023421774',
  GOOGLE_APP_ID:
    '405680342370-r0ktkaio1g124q4kq39qqa35p7u6lnnr.apps.googleusercontent.com',
};
