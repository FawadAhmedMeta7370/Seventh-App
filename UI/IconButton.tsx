import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function IconButton({iconname, size, color, onPress}: any) {
  return (
    <View style={styles.buttoncontainer}>
      <Pressable
        style={({pressed}) => [styles.button && styles.pressed]}
        onPress={onPress}>
        <Ionicons name={iconname} size={size} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttoncontainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});

export default IconButton;
