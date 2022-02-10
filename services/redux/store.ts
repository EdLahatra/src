import {applyMiddleware, createStore, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import storage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store: any = createStore(
  pReducer,
  compose(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);

export default store;
