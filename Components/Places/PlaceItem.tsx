import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../Constants/Colors';

function PlaceItem({ place, onSelect }:any) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect?.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.primary500,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 2,
    height: '100%',
    width: '100%'
  },
  info: {
    flex: 3,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.gray700,
  },
  address: {
    fontSize: 17,
    color: Colors.gray700,
  },
});

export default PlaceItem;
