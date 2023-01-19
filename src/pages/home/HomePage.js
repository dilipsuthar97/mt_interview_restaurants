import React, {memo, useEffect, useState} from 'react';
import CommonBasePage from '_components/templates/CommonBasePage';
import RestaurantList from '_components/organisms/RestaurantList';
import {restaurantSelector} from '_redux/reducers/RestaurantReducer';
import {useDispatch, useSelector} from 'react-redux';
import {getRestaurants} from '_redux/actions';

const HomePage = ({navigation}) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const {isGetRestaurantsSuccess = null} = useSelector(restaurantSelector);

  useEffect(() => {
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
    } else if (isLoading && isLoginSuccess == false) {
      setLoading(false);
      Popup.error({message: 'Failed to fetch restaurants data'});
    }
  }, [isGetRestaurantsSuccess]);

  return (
    <CommonBasePage isLoading={isLoading}>
      <RestaurantList />
    </CommonBasePage>
  );
};
export default memo(HomePage);
