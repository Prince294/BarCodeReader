import { legacy_createStore as createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducer/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
