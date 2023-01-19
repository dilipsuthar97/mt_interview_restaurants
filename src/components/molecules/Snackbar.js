import React, {memo} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Text from '_components/atoms/Text';
import {colors, scale, fontSizes} from '_theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const TIMEOUT = 3000;
let _refTimeout = null;

const Snackbar = React.forwardRef((_, ref) => {
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const backgroundColor = useSharedValue(colors.mateblack);

  const containerAS = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -translateY.value,
        },
        {scale: interpolate(opacity.value, [0, 1], [0.9, 1])},
      ],
      opacity: interpolate(opacity.value, [0, 0.7, 1], [0, 0, 1]),
    };
  });

  const [config, setConfig] = React.useState({
    message: '',
  });

  React.useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    [config, _refTimeout],
  );

  const show = ({message, type, bottom = 0}) => {
    setTheme(type);

    if (_refTimeout) {
      clearTimeout(_refTimeout);
      _refTimeout = null;
    }
    _refTimeout = setTimeout(() => {
      hide();
      clearTimeout(_refTimeout);
      _refTimeout = null;
    }, TIMEOUT);

    if (_refTimeout != null) {
      animationList(true, 0, () => {
        setConfig({message});
        animationList(false, bottom);
      });
      return;
    }

    setConfig({message});
    animationList(false, bottom);
  };

  const hide = (callback = () => {}) => {
    animationList(true, 0, callback);
  };

  const animationList = (hide = false, bottom = 0, callback = () => {}) => {
    opacity.value = withTiming(hide ? 0 : 1, {duration: hide ? 300 : 500});
    translateY.value = withTiming(
      hide ? 100 : bottom,
      {duration: hide ? 300 : 500},
      finished => {
        'worklet';
        if (finished) {
          runOnJS(callback)();
        }
      },
    );
  };

  const setTheme = type => {
    if (type === 'info') {
      backgroundColor.value = colors.info;
    } else if (type === 'success') {
      backgroundColor.value = colors.success;
    } else if (type === 'failed') {
      backgroundColor.value = colors.error;
    } else {
      backgroundColor.value = colors.mateblack;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: insets.top + scale.mvs(12),
          backgroundColor: backgroundColor.value,
        },
        containerAS,
      ]}>
      <TouchableWithoutFeedback onPress={() => hide()}>
        <View style={styles.wrapper}>
          <Text style={[styles.message]}>{config.message}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
});

export default memo(Snackbar);

const styles = StyleSheet.create({
  container: {
    minHeight: scale.mvs(42),
    backgroundColor: colors.mateblack,
    position: 'absolute',
    left: scale.mvs(10),
    right: scale.mvs(10),
    borderRadius: scale.mvs(6),
  },
  wrapper: {
    flexDirection: 'row',
    padding: scale.mvs(8),
    alignItems: 'center',
    flex: 1,
  },
  message: {
    fontSize: fontSizes.FONT14,
    color: colors.white,
    textAlign: 'left',
    marginHorizontal: scale.mvs(8),
  },
});
