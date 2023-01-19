import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors, fontSizes, scale} from '_theme';
import Text from './Text';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';

const Input = ({label, width, style, inputStyle, error, ...props}) => {
  return (
    <View style={[styles.container, {width}, style]}>
      <Text font="medium" style={styles.label}>
        {label}
      </Text>
      <View style={{height: scale.mvs(4)}} />
      <View
        style={[
          styles.inputContainer,
          {
            borderColor:
              (error?.length || 0) !== 0 ? colors.error : colors.textGrey,
          },
        ]}>
        <TextInput
          style={[styles.inputText, inputStyle]}
          placeholderTextColor={colors.OVERLAY_DARK_30}
          selectionColor={colors.secondary}
          {...props}
        />
      </View>
      {(error?.length || 0) !== 0 && (
        <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
          <Text style={styles.error}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

Input.defaultProps = {
  width: '80%',
  error: '',
};
export default memo(Input);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  label: {
    fontSize: fontSizes.FONT15,
  },
  inputText: {
    color: colors.black,
    fontSize: fontSizes.FONT15,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
  },
  inputContainer: {
    height: scale.mvs(50),
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.textGrey,
    paddingHorizontal: scale.ms(18),
  },
  error: {
    color: colors.error,
    fontSize: fontSizes.FONT13,
    textAlign: 'left',
    paddingHorizontal: scale.ms(0),
    paddingTop: scale.vs(2),
  },
});
