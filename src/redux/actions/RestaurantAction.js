// types
export const GetRestaurants = {
  REQUEST: 'get_restaurants_request',
  SUCCESS: 'get_restaurants_success',
  FAILED: 'get_restaurants_failed',
};

// actions
export const getRestaurants = {
  request: params => ({
    type: GetRestaurants.REQUEST,
    params,
  }),
  success: data => ({
    type: GetRestaurants.SUCCESS,
    payload: data,
  }),
  failed: error => ({
    type: GetRestaurants.FAILED,
    payload: error,
  }),
};
