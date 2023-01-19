import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Icons} from '_commonConfig';
import {scale} from '_theme';

const RATING_LIMIT = [1, 2, 3, 4, 5];

const RatingBar = ({rating = 1}) => {
  const ratingArr = String(rating).split('.');

  return (
    <View style={styles.container}>
      {rating &&
        RATING_LIMIT.map(rate => {
          return (
            <Image
              key={`rating-${rate}`}
              style={styles.iconRating}
              resizeMode={'contain'}
              source={
                rate <= Number(ratingArr[0])
                  ? Icons.StarFill
                  : rate == Number(ratingArr[0]) + 1 &&
                    Number(ratingArr?.[1]) > 5
                  ? Icons.StarFill
                  : Icons.StarEmpty
              }
            />
          );
        })}
    </View>
  );
};
export default memo(RatingBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconRating: {
    height: scale.ms(16),
    width: scale.ms(16),
    marginRight: scale.s(2),
  },
});
