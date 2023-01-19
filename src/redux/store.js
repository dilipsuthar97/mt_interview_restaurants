import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

import rootReducer from '_redux/reducers';
import rootSaga from '_redux/sagas';

// root reducer with persist config
const reducers = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['common', 'auth'],
  },
  rootReducer,
);

// middlewares setup
const sagaMiddleware = createSagaMiddleware();
const middlewares = [];
const enhancers = [];

/**
 * Only use redux logger if app is in debug more and not in relase mode
 * It will imprive app performance
 */
if (__DEV__ && typeof atob !== 'undefined') {
  middlewares.push(sagaMiddleware, logger); // With logger
} else {
  middlewares.push(sagaMiddleware); // without logger
}
enhancers.push(applyMiddleware(...middlewares));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export const store = createStore(reducers, composeEnhancers(...enhancers));

// persistStore contains all the data from store
export const persistor = persistStore(store);
// run saga
sagaMiddleware.run(rootSaga);
