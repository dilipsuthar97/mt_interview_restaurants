import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {constants} from '_commonConfig';
import Input from '_components/atoms/Input';
import {scale} from '_theme';
import Button from '_components/atoms/buttons/Button';
import CommonBasePage from '_components/templates/CommonBasePage';
import {Navigation, Popup, Validator} from '_helpers';
import {commonSelector} from '_redux/reducers/CommonReducer';
import {authSelector} from '_redux/reducers/AuthReducer';
import {login} from '_redux/actions';

const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {connection, appState} = useSelector(commonSelector);
  const {isLoginSuccess = null, data} = useSelector(authSelector);

  const [securePassword, setSecurePassword] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    initHeader();
  }, []);

  useEffect(() => {
    if (isLoading && isLoginSuccess == true) {
      setLoading(false);
      Navigation.reset(1, [{name: 'HomePage'}]);
      Popup.success({message: 'Logged in success'});
    } else if (isLoading && isLoginSuccess == false) {
      setLoading(false);
      Popup.error({message: 'Failed to login'});
    }
  }, [isLoginSuccess]);

  const initHeader = useCallback(() => {
    navigation.setOptions({
      title: constants.APP_NAME,
    });
  }, [navigation]);

  const validate = useCallback(() => {
    let validate = true;

    if (form.email.length <= 0) {
      validate = false;
      setFormError(fe => ({...fe, email: 'Please enter email address'}));
    } else if (!Validator.validateEmail(form.email)) {
      validate = false;
      setFormError(fe => ({
        ...fe,
        email: 'Plase enter valid email address',
      }));
    } else {
      setFormError(fe => ({...fe, email: ''}));
    }

    if (form.password.length <= 0) {
      validate = false;
      setFormError(fe => ({...fe, password: 'Please enter password'}));
    } else if (!Validator.validatePassword(form.password)) {
      validate = false;
      setFormError(fe => ({
        ...fe,
        password:
          'Your password must be at least 8 characters long, should contains at least 1 uppercase, 1 lowercase, 1 numeric value',
      }));
    } else {
      setFormError(fe => ({...fe, password: ''}));
    }

    return validate;
  }, [form]);

  const handleContinue = useCallback(() => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    dispatch(login.request({email: form.email, password: form.password}));
  }, [validate]);

  return (
    <CommonBasePage wrapperStyle={styles.wrapper} isLoading={isLoading}>
      <Input
        label="Email"
        placeholder="Enter email"
        style={styles.spacer}
        value={form.email}
        onChangeText={email => setForm(f => ({...f, email}))}
        error={formError.email}
        autoCapitalize={false}
      />
      <Input
        label="Password"
        placeholder="Enter password"
        style={styles.spacer}
        secureTextEntry={securePassword}
        // showPasswordToggle
        // onPasswordToggle={() => setSecurePassword(!securePassword)}
        value={form.password}
        onChangeText={password => setForm(f => ({...f, password}))}
        error={formError.password}
        autoCapitalize={false}
      />
      <Button text={'Continue'} onPress={handleContinue} />
    </CommonBasePage>
  );
};
export default memo(LoginPage);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  spacer: {
    marginBottom: scale.vs(12),
  },
});
