import * as React from 'react';
import {SnackbarOption} from '_components/molecules/Snackbar';

// Create snackbar alert ref
export const snackbarRef = React.createRef();

/**
 * Display default snackbar
 * @param {SnackbarOption} option
 */
const show = ({message, type, bottom = 0}) => {
  snackbarRef?.current?.show({message, type, bottom});
};

const success = ({message, bottom, type = 'success'}) => {
  snackbarRef?.current?.show({message, type, bottom});
};

const error = ({message, bottom, type = 'failed'}) => {
  snackbarRef?.current?.show({message, type, bottom});
};

const info = ({message, bottom, type = 'info'}) => {
  snackbarRef?.current?.show({message, type, bottom});
};

/**
 * Hide alert dialog if visible
 */
const hide = () => {
  snackbarRef?.current?.hide();
};

export default {
  show,
  success,
  error,
  info,
  hide,
};
