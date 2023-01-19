import {GetRestaurants} from '../actions/RestaurantAction';

export const INITIAL_STATE = {
  error: null,
  restaurantList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GetRestaurants.REQUEST:
      return {
        ...state,
        isGetRestaurantsSuccess: null,
        error: null,
      };
    case GetRestaurants.SUCCESS:
      return {
        ...state,
        isGetRestaurantsSuccess: true,
        restaurantList: action.payload,
      };
    case GetRestaurants.FAILED:
      return {
        ...state,
        isGetRestaurantsSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const restaurantSelector = state => state.restaurant;
