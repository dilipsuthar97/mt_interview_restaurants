// types
export const Login = {
  REQUEST: 'login_request',
  SUCCESS: 'login_success',
  FAILED: 'login_failed',
};

// actions
export const login = {
  request: params => ({
    type: Login.REQUEST,
    params,
  }),
  success: data => ({
    type: Login.SUCCESS,
    payload: data,
  }),
  failed: error => ({
    type: Login.FAILED,
    payload: error,
  }),
};
