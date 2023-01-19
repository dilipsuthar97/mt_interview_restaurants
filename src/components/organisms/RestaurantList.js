import React, {memo, useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import RestaurantListing from '_components/molecules/RestaurantListing';
import {Navigation} from '_helpers';
import {restaurantSelector} from '_redux/reducers/RestaurantReducer';
import {scale} from '_theme';

const RestaurantList = ({}) => {
  const [data, setData] = useState(new Array(5).fill(0));

  const {restaurantList} = useSelector(restaurantSelector);

  const handleMapPress = useCallback(latLng => {
    Navigation.navigate('MapViewPage', {latLng});
  }, []);

  const renderItem = useCallback(
    data => {
      return (
        <RestaurantListing
          onPress={function () {
            handleMapPress({
              latitude: Number(data.item.latitude),
              longitude: Number(data.item.longitude),
            });
          }}
          {...data}
        />
      );
    },
    [handleMapPress],
  );

  const keyExtractor = (_, index) => `item-${index}`;

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={restaurantList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingHorizontal: scale.ms(16),
          paddingVertical: scale.ms(16),
        }}
        ItemSeparatorComponent={<View style={{height: scale.ms(16)}} />}
      />
    </View>
  );
};
export default memo(RestaurantList);
