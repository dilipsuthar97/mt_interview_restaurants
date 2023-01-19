import * as React from 'react';
import Routes from './Routes';
import {store, persistor} from '_redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {colors} from '_theme';
import Snackbar from '_components/molecules/Snackbar';
import {snackbarRef} from '_helpers/PopupHelper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar
              translucent
              barStyle={'dark-content'}
              backgroundColor={colors.primary}
            />
            <Routes />
            <Snackbar ref={snackbarRef} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default gestureHandlerRootHOC(App);
