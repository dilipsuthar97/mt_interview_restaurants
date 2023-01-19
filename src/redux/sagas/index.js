import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import RestaurantSaga from './RestaurantSaga';

const rootSaga = function* rootSaga() {
  yield all([AuthSaga(), RestaurantSaga()]);
};

export default rootSaga;
