import {CommonActions} from '@react-navigation/native';
import React, {memo, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {authSelector} from '_redux/reducers/AuthReducer';
import {colors} from '_theme';

const SplashPage = ({navigation}) => {
  const {isAuthenticated} = useSelector(authSelector);

  useEffect(() => {
    diveIntpApp();
  }, []);

  const diveIntpApp = useCallback(() => {
    if (isAuthenticated) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'HomePage'}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'LoginPage'}],
        }),
      );
    }
  }, [navigation, isAuthenticated]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    />
  );
};
export default memo(SplashPage);
