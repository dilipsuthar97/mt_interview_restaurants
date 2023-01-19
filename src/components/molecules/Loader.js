import React, {memo} from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors, fontSizes, scale} from '_theme';
import Text from '_components/atoms/Text';
// import { BlurView } from 'rn-id-blurview';

const Loader = ({isLoading}) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={isLoading}
      animationType={'none'}>
      <View style={styles.container}>
        {/* <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType='light'
          blurAmount={8}
          reducedTransparencyFallbackColor='white'
        /> */}
        <View style={styles.card}>
          <ActivityIndicator size={'small'} color={colors.primary} />
          <Text style={styles.label} font="bold">
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.OVERLAY_DARK_60,
  },
  card: {
    flexDirection: 'row',
  },
  label: {
    color: colors.black,
    fontSize: fontSizes.FONT15,
    marginLeft: scale.s(8),
  },
});
