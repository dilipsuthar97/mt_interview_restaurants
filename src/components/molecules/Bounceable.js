import React, {memo} from 'react';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Tools} from '_utils';

const Bounceable = ({
  children,
  disableAnimation = false,
  disabled = false,
  disallowInterruption = false,
  onPress,
  onLongPress,
  onLongPressIn,
  onLongPressOut,
  invokeOnBegin = false,
  delayLongPress = 600,
  activeScale = 0.95,
  springConfig = {
    damping: 20,
    mass: 1,
    stiffness: 350,
  },
  style,
}) => {
  const scale = useSharedValue(1);
  const sz = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const animateIn = () => {
    if (!disableAnimation) {
      scale.value = withSpring(activeScale, springConfig);
    }
  };

  const animateOut = () => {
    if (!disableAnimation) {
      scale.value = withSpring(1, springConfig);
    }
  };

  const handleLongTapGestureState = ({nativeEvent}) => {
    if (disabled) return;
    const {state} = nativeEvent;

    if (state == State.ACTIVE) {
      onLongPressIn && onLongPressIn();
      onLongPress && onLongPress();
    }

    if (state == State.END) {
      onLongPressOut && onLongPressOut();
    }

    if (
      state === State.UNDETERMINED ||
      state === State.FAILED ||
      state === State.CANCELLED
    ) {
      onLongPressOut && onLongPressOut();
    }
  };

  const handleTapGestureState = ({nativeEvent}) => {
    if (disabled) return;
    const {state} = nativeEvent;

    if (state == State.BEGAN) {
      invokeOnBegin && onPress && onPress();
      animateIn();
    }

    if (state == State.END) {
      !invokeOnBegin && onPress && onPress();
      animateOut();
    }

    if (
      state === State.UNDETERMINED ||
      state === State.FAILED ||
      state === State.CANCELLED
    ) {
      animateOut();
    }
  };

  return (
    <LongPressGestureHandler
      disallowInterruption={disallowInterruption}
      hitSlop={Tools.getHitSlop(10)}
      enabled={onLongPress || onLongPressIn || onLongPressOut ? true : false}
      onHandlerStateChange={handleLongTapGestureState}
      shouldCancelWhenOutside={true}
      minDurationMs={delayLongPress}>
      <TapGestureHandler
        disallowInterruption={disallowInterruption}
        hitSlop={Tools.getHitSlop(10)}
        shouldCancelWhenOutside={true}
        onHandlerStateChange={handleTapGestureState}>
        <Animated.View style={[style, sz]}>{children}</Animated.View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  );
};
export default memo(Bounceable);
