import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '_theme';

const Divider = ({}) => {
  return <View style={styles.divider} />;
};
export default memo(Divider);

const styles = StyleSheet.create({
  divider: {
    height: 0.8,
    backgroundColor: colors.lightGrey,
  },
});
