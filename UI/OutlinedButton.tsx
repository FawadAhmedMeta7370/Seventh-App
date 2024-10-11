import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IOutlineButton } from '../Constants/Interface';
import { Colors } from '../Constants/Colors';

const OutlineButton: FC<IOutlineButton> = ({onPress, icon, children, size, color}) => {
  return (
    <Pressable
      style={pressed => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Ionicons
        name={icon}
        color={color}
        size={size}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    button: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      margin: 4,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderRadius: 15,
      borderColor: Colors.primary500,
    },
    pressed: {
      opacity: 0.7,
    },
    icon: {
      marginRight: 5,
    },
    text: {
      color: Colors.primary500,
    },
  });

export default OutlineButton;