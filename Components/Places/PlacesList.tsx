import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlaceItem from './PlaceItem';
import {Colors} from '../../Constants/Colors';
import { useNavigation } from '@react-navigation/native';

function PlacesList({places}: any) {

  const Navigation = useNavigation()

  function selectPlaceHandler(id:any){
    Navigation.navigate('Place Details' , {
      placeId: id
    })
  }

  console.log("Places List Image",places.imageUri);

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackcontainer}>
        <Text style={styles.fallbacktext}>
          No places added yet! Start adding sum.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  fallbackcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbacktext: {
    color: Colors.primary200,
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    margin: 10,
  },
});

export default PlacesList;
