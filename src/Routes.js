import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';

import {_navigationRef} from '_helpers/NavigationHelper';
import {setNetworkState} from '_redux/actions';

// Screens
import SplashPage from '_pages/SplashPage';
import LoginPage from '_pages/auth/LoginPage';
import HomePage from '_pages/home/HomePage';
import MapViewPage from '_pages/home/MapViewPage';
import {colors, fonts, fontSizes} from '_theme';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    /**
     * Event listener to handle network state change
     */
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkState.request(state));
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return (
    <NavigationContainer ref={_navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashPage"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            color: colors.white,
            fontFamily: fonts.bold,
            fontSize: fontSizes.FONT20,
          },
        }}>
        <Stack.Screen name="SplashPage" component={SplashPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MapViewPage" component={MapViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
