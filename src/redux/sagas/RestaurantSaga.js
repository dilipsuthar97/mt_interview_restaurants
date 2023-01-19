import {put, call, takeEvery, all, select} from 'redux-saga/effects';
import {GetRestaurants, getRestaurants} from '_redux/actions';
import Api from '_services';

const getRestaurantsSaga = function* getRestaurantsSaga({params}) {
  try {
    const response = yield call(Api.common.getRestaurants);
    yield put(getRestaurants.success(response.data));
  } catch (error) {
    yield put(getRestaurants.failed(error));
  }
};

function* RestaurantSaga() {
  yield all([takeEvery(GetRestaurants.REQUEST, getRestaurantsSaga)]);
}

export default RestaurantSaga;
