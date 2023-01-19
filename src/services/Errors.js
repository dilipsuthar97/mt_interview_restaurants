export const DEFAULT_ERROR = 'Something went wrong, Please, try again later';
export const UNAUTHORISED_ERROR = 'Unauthorize!';
export const REFRESH_TOKEN_EXPIRED = 'Refresh token expired!';

/*
	401: REQUEST_ERROR;
    403: UNAUTHORISED;
    404: NOT_FOUND;
    501: SERVER_ERROR;
    502: DATABASE_ERROR;
    default: DEFAULT_ERROR
 */

// get reataurants error messages
export const GET_INITIAL_CONV_ERR_MSGS = {
  REQUEST_ERROR: 'Could not get restaurants: Invalid request.',
  UNAUTHORISED: 'Could not get restaurants.',
  NOT_FOUND: 'Could not get restaurants.',
  SERVER_ERROR: 'Could not get restaurants: There was a server error.',
  DATABASE_ERROR: 'Could not get restaurants: There was a database error.',
};
