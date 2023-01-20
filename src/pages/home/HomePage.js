import React, {memo, useEffect, useState} from 'react';
import CommonBasePage from '_components/templates/CommonBasePage';
import RestaurantList from '_components/organisms/RestaurantList';
import {restaurantSelector} from '_redux/reducers/RestaurantReducer';
import {useDispatch, useSelector} from 'react-redux';
import {getRestaurants} from '_redux/actions';
import {Popup} from '_helpers';

const HomePage = ({navigation}) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const {isGetRestaurantsSuccess = null, error} =
    useSelector(restaurantSelector);

  useEffect(() => {
    setLoading(true);
    dispatch(getRestaurants.request());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Restaurants List',
    });
  }, [navigation]);

  useEffect(() => {
    if (isLoading && isGetRestaurantsSuccess == true) {
      setLoading(false);
    } else if (isLoading && isGetRestaurantsSuccess == false) {
      setLoading(false);
      Popup.error({
        message: error?.message ?? 'Failed to fetch restaurants data',
      });
    }
  }, [isGetRestaurantsSuccess]);

  return (
    <CommonBasePage isLoading={isLoading}>
      <RestaurantList />
    </CommonBasePage>
  );
};
export default memo(HomePage);
