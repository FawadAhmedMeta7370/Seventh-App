import {FC, useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {Colors} from '../../Constants/Colors';
import OutlineButton from '../../UI/OutlinedButton';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {ILocationPicker} from '../../Constants/Interface';
import Geolocation from '@react-native-community/geolocation';
import {getAddress} from '../../Util/Location';
// import GetMapPreview from '../../Util/Location';

const LocationPicker: FC<ILocationPicker> = ({
  onPickeLocation,
  color,
  size,
}) => {
  const naigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [location, setLocation] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mappickedlocation = {
        lat: route.params.pickedlat,
        long: route.params.pickedlong,
      };
      setLocation(mappickedlocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (location) {
        const address = await getAddress(location.lat, location.long);
        onPickeLocation({...location, address: address});
      }
    }
    handleLocation();
  }, [location, onPickeLocation]);

  function getLocationHandler() {
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;

      setLocation({lat: latitude, long: longitude});

      // console.log('position', position);
      // console.log('latitude', latitude);
      // console.log('longitude', longitude);
      // console.log(location);
      // console.log(location?.lat);
      // console.log(location?.long);
    });
  }

  function pickOnMapHandler() {
    naigation.navigate('Map');
  }

  let locationdisplay = <Text>No location Picked Yet!</Text>;

  if (location) {
    locationdisplay = (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.lat,
          longitude: location?.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mappreview}>
        {/* <Image source={{uri: GetMapPreview(location?.lat, location?.long)}} /> */}
        {locationdisplay}
      </View>
      <View style={styles.actions}>
        <OutlineButton
          icon="location"
          color={color}
          size={size}
          onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton
          icon="map"
          color={color}
          size={size}
          onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mappreview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: '65%',
    width: '100%',
    borderWidth: 3,
    borderColor: Colors.primary500,
    backgroundColor: Colors.primary500,
    borderRadius: 25,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export default LocationPicker;
