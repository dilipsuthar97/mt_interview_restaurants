import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Icons} from '_commonConfig';
import RatingBar from '_components/atoms/RatingBar';
import Text from '_components/atoms/Text';
import TouchableOpacity from '_components/atoms/TouchableOpacity';
import {colors, fonts, fontSizes, scale} from '_theme';

const RestaurantListing = ({item, index, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: item?.images?.[0]?.url,
          }}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{item?.title}</Text>
        <RatingBar rating={item?.rating} />
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.locationButtonWrapper}>
          <Image
            style={styles.iconLocation}
            source={Icons.Map}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default memo(RestaurantListing);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale.ms(14),
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: scale.ms(80),
    height: scale.ms(80),
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: scale.s(16),
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.FONT18,
    color: colors.mateblack,
  },
  locationButtonWrapper: {
    padding: scale.ms(6),
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  iconLocation: {
    height: scale.ms(25),
    width: scale.ms(25),
  },
});
