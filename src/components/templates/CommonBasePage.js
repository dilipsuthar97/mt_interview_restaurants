import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '_components/molecules/Loader';
import {colors, scale, spaces} from '_theme';
import Animated from 'react-native-reanimated';

const CommonBasePage = ({
  style,
  wrapperStyle,
  children,
  safeAreaProps,
  isLoading,
  useScrollView,
  scrollViewProps,
}) => {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={['bottom']}
      {...safeAreaProps}>
      {useScrollView ? (
        <Animated.ScrollView
          style={[styles.wrapper, wrapperStyle]}
          contentContainerStyle={[styles.scrollViewContainer]}
          {...scrollViewProps}>
          {children}
        </Animated.ScrollView>
      ) : (
        <View style={[styles.wrapper, wrapperStyle]}>{children}</View>
      )}
      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

CommonBasePage.defaultProps = {
  isLoading: false,
  useScrollView: false,
};
export default memo(CommonBasePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
