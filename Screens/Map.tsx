import IconButton from '../UI/IconButton';
import {IMap} from '../Constants/Interface';
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {FC, useCallback, useLayoutEffect, useState} from 'react';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

type Coordinate = {
  latitude: number;
  longitude: number;
};

type MapPressEvent = {
  nativeEvent: {
    coordinate: Coordinate;
  };
};

const Map: FC<IMap> = ({navigation, route}) => {
  
  const initialocation = route.params && {lat: route.params.initialLat,
    long: route.params.initialLong
  }
  
  const [selectLocation, setselectLocation] = useState<{
    lat: Float;
    long: Float;
  }>(initialocation);

  const region = {
    latitude: initialocation ? selectLocation?.lat : 24.8607,
    longitude: initialocation ? selectLocation?.long : 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    // console.log('event -------> ', event);
    if (initialocation) {
      return
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setselectLocation({lat: lat, long: long});
  }

  const savepickedlocation = useCallback(() => {
    if (!selectLocation) {
      Alert.alert('NoPicked Locvation', 'Please select a location first!');
      return;
    }
    navigation.navigate('Add Places', {
      pickedlat: selectLocation.lat,
      pickedlong: selectLocation.long,
    });
  }, [navigation, selectLocation]);

  useLayoutEffect(() => {
    if (initialocation) {
      return  
    }
    navigation.setOptions({
      headerRight: ({tintColor}: {tintColor?: object}) => (
        <IconButton
          iconname="save"
          size={25}
          color={tintColor}
          onPress={savepickedlocation}
        />
      ),
    });
  }, [navigation, savepickedlocation, initialocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}>
      {selectLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation?.lat,
            longitude: selectLocation?.long,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
