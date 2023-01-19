import {SetNetworkState, SetAppState} from '../actions/CommonAction';

export const INITIAL_STATE = {
  error: null,
  appState: {
    prev: '',
    current: '',
  },
  connection: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SetNetworkState.REQUEST:
      return {...state, connection: action.payload};

    case SetAppState.REQUEST:
      const newAppState = action.payload;

      return {
        ...state,
        appState: {
          prev: state.appState.current,
          current: newAppState,
        },
      };

    default:
      return state;
  }
};

export const commonSelector = state => state.common;
