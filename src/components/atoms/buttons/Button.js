import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {colors, fontSizes, scale} from '_theme';
import Bounceable from '_components/molecules/Bounceable';
import Text from '../Text';

const Button = ({text, onPress, style, isLoading, width}) => {
  return (
    <Bounceable onPress={onPress} style={[styles.container, {width}, style]}>
      {isLoading && <ActivityIndicator size={'small'} color={colors.white} />}
      {!isLoading && (
        <Text style={styles.text} font="medium">
          {text}
        </Text>
      )}
    </Bounceable>
  );
};

Button.defaultProps = {
  width: '80%',
};
export default Button;

const styles = StyleSheet.create({
  container: {
    height: scale.mvs(50),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.FONT16,
  },
});
