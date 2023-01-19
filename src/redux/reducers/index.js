import {combineReducers} from 'redux';
import AuthReducer, {INITIAL_STATE as AUTH_INITIAL_STATE} from './AuthReducer';
import CommonReducer from './CommonReducer';
import RestaurantReducer from './RestaurantReducer';

let appReducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,
  restaurant: RestaurantReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'logout_success') {
    state = {
      common: state.common,
      auth: AUTH_INITIAL_STATE,
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
