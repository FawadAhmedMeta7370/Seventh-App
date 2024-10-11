import {FC, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import OutlineButton from '../UI/OutlinedButton';
import {IPlaceDetails} from '../Constants/Interface';
import {Colors} from '../Constants/Colors';
import {fetchPlaceDetails} from '../Util/Database';
import LoadingOverlay from '../UI/LoadingOverlay';

const PlaceDetails: FC<IPlaceDetails> = ({route, navigation}) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place: any = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View>
        <LoadingOverlay />
      </View>
    );
  }

  function showOnMapHandler() {
    navigation.navigate('Map', {
        initialLat: fetchedPlace.location.lat,
        initialLong: fetchedPlace.location.long
    })
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

// import { useEffect, useState } from 'react';
// import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
// // import { Colors } from '../constant/colors';
// // import OutlineButton from '../components/UI/OutlineButton';
// import { fetchPlaceDetails } from '../util/database';
// import OutlineButton from '../UI/OutlinedButton';
// // import { Place } from '../components/models/places';

// // interface PlaceDetailsProps {
// //   route: {
// //     params: {
// //       placeId
// //     };
// //   };
// //   navigation: any;
// // }

// function PlaceDetails({ route, navigation }) {
//   const [fetchedPlace, setFetchedPlace] = useState(null);

//   function showOnMapHandler() {
//     navigation.navigate('Map', {
//         initialLat: fetchedPlace.location.lat,
//         initialLng: fetchedPlace.location.lng,
//       });
//   }

//   const selectedPlaceId = route.params.placeId;

//   useEffect(() => {
//     async function loadPlaceData() {
//       const place = await fetchPlaceDetails(selectedPlaceId);
//       setFetchedPlace(place);
//       if (place) {
//         navigation.setOptions({
//           title: place.title,
//         });
//       }
//     }

//     loadPlaceData();
//   }, [selectedPlaceId, navigation]);

//   if (!fetchedPlace) {
//     return (
//       <View style={styles.fallback}>
//         <Text>Loading place data...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView>
//       <Image style={styles.image} source={{ uri: fetchedPlace.imageUri}} />
//       <View style={styles.locationContainer}>
//         <View style={styles.addressContainer}>
//           <Text style={styles.address}>{fetchedPlace.address}</Text>
//         </View>
//         <OutlineButton icon="map" onPress={showOnMapHandler}>
//           View on Map
//         </OutlineButton>
//       </View>
//     </ScrollView>
//   );
// }

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
