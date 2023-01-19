import {put, call, takeEvery, all, select} from 'redux-saga/effects';
import {Login, login} from '_redux/actions';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const loginSaga = function* loginSaga({params}) {
  try {
    yield call(delay, 4000);
    if (params.email == 'test@test.com' && params.password == 'Password@123') {
      yield put(
        login.success({email: params.email, user: 'test', token: 'token'}),
      );
    } else {
      throw new NetworkError('Failed to login', 500);
    }
  } catch (error) {
    yield put(login.failed(error));
  }
};

function* AuthSaga() {
  yield all([takeEvery(Login.REQUEST, loginSaga)]);
}

export default AuthSaga;
