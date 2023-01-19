import React, {memo, useEffect, useState} from 'react';
import CommonBasePage from '_components/templates/CommonBasePage';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Permission} from '_helpers';
import {PERMISSIONS, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {Alert, Image, StyleSheet} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import {colors, scale} from '_theme';
import {constants, Icons} from '_commonConfig';
import MapViewDirections from 'react-native-maps-directions';

const MapViewPage = ({navigation, route}) => {
  const _refMap = React.useRef();

  const destination = route.params.latLng;
  const [isLoadingLocating, setLoadingLocating] = React.useState(false);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Map View',
    });
  }, [navigation]);

  const getLocation = async () => {
    setLoadingLocating(true);
    try {
      const granted = await Permission.request(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }),
        {
          title: '"Restaurants App" needs location permission',
          message:
            'Restaurants App needs location permission so that we can display current location in mapview',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );

      if (!granted) {
        Alert.alert(
          'Location Permission Denied',
          'Turn on Location Services to allow "Restaurants App" to determine your location.',
          [
            {
              text: 'Go to Settings',
              onPress: openSettings,
              style: 'default',
            },
            {
              text: "Don't Use Location",
              onPress: () => {},
              style: 'destructive',
            },
          ],
        );
        throw new Error(granted);
      }

      Geolocation.getCurrentPosition(
        position => {
          setLoadingLocating(false);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          const centerLat =
            (position.coords.latitude + destination.latitude) / 2;
          const centerLng =
            (position.coords.longitude + destination.longitude) / 2;

          if (_refMap.current) {
            _refMap.current.animateCamera(
              {
                center: {
                  latitude: centerLat,
                  longitude: centerLng,
                },
                zoom: 7,
              },
              {duration: 500},
            );
          }
        },
        error => {
          throw error;
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } catch (error) {
      console.log(error);
      setLoadingLocating(false);
    }
  };

  return (
    <CommonBasePage isLoading={isLoadingLocating}>
      <MapView
        ref={_refMap}
        showsScale
        showsCompass
        showsMyLocationButton
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker key={'me'} coordinate={location}>
          <MyMarker />
        </Marker>
        <Marker key={'destination'} coordinate={destination}>
          <Image
            source={Icons.ShopPin}
            style={styles.shopMarker}
            resizeMode={'contain'}
          />
        </Marker>
        <MapViewDirections
          origin={location}
          destination={destination}
          apikey={constants.GOOGLE_API_KEY}
        />
      </MapView>
    </CommonBasePage>
  );
};
export default memo(MapViewPage);

const MyMarker = () => {
  return (
    <Svg height={60} width={60}>
      <Ellipse
        cx="40"
        cy="40"
        rx="10"
        ry="10"
        fill={colors.primary}
        stroke={`rgba(37,221,147, 0.3)`}
        strokeWidth="20"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  shopMarker: {
    width: scale.ms(50),
    height: scale.ms(50),
  },
});
