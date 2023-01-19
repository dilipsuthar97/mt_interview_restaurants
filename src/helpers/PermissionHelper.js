// --------------- LIBRARIES ---------------
import {request as requestPermission, RESULTS} from 'react-native-permissions';
import {Popup} from '_helpers';

/**
 * Ask for permission and display dialog in Android
 * @param {Permission} permission - Android permission object
 * @param {Object} rational - Object with title, message, buttonPositive, buttonNegative for rational alert
 */
const request = async (permission, rational) => {
  try {
    let granted = false;
    if (rational) {
      granted = await requestPermission(permission, rational);
    } else {
      granted = await requestPermission(permission);
    }

    switch (granted) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        Popup.error({
          message:
            'This feature is not available (on this device / in this context)',
        });
        return Promise.resolve(false);
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        return Promise.resolve(false);
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        return Promise.resolve(true);
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        return Promise.resolve(true);
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        Popup.error({
          message: 'The permission is denied and not requestable anymore',
        });
        return Promise.resolve(false);

      default:
        return Promise.resolve(false);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  request,
};
