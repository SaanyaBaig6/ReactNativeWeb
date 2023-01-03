import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import {api} from '../services/api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

// Create the root reducer separately so we can extract the RootState type direclty from it
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (
  preloadedState?: PreloadedState<RootState> | undefined,
) =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
    preloadedState,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = ReturnType<typeof createStore>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
