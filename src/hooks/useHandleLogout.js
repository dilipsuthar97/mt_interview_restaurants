import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Navigation} from '_helpers';

const useHandleLogout = routeKey => {
  const dispatch = useDispatch();

  const logout = useCallback(error => {
    // dispatch(resetAuth(null));
    Navigation.reset(1, [{name: 'LoginPage', key: routeKey}]);
  }, []);

  return logout;
};

export default useHandleLogout;
