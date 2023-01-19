// types
export const SetNetworkState = {
  REQUEST: 'set_network_status',
};
export const SetAppState = {
  REQUEST: 'set_search_keyword',
};

// actions
export const setNetworkState = {
  request: payload => ({
    type: SetNetworkState.REQUEST,
    payload,
  }),
};
export const setAppState = {
  request: payload => ({
    type: SetAppState.REQUEST,
    payload,
  }),
};
