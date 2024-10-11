import {ReactNode} from 'react';
import {Colors} from '../Constants/Colors';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Ibutton {
  onPress: () => void;
  children: ReactNode;
}

function CustomButton({onPress, children}: Ibutton) {
  return (
    <View>
      <Pressable
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    // margin: "15%",
    backgroundColor: Colors.primary500,
    elevation: 2,
    borderRadius: 10,
    width: '80%',
    marginLeft: '10%'
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
});

export default CustomButton;
