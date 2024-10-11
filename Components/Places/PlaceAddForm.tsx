// Form to add a new place

import {FC, useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import CustomButton from '../../UI/CustomButton';
import {IPlaceAddForm} from '../../Constants/Interface';
import Place from '../../Models/Place';

const PlaceAddForm: FC<IPlaceAddForm> = ({onCreatePlace}) => {
  const [title, setTitle] = useState<string>('');
  const [selectedimage, setselectedimage] = useState<string>('');
  const [pickedlocation, setpickedlocation] = useState<string>('');

  function onChangeText(enteredtext: string) {
    setTitle(enteredtext);
  }

  function takeImageHandler(imageUri) {


    setselectedimage(imageUri);
  }

  const pickLocationHandler = useCallback(
    (location: string) => {
      setpickedlocation(location);
    },
    [setpickedlocation],
  );

  function savePlaceHandler() {
    const placeData = new Place(title, selectedimage, pickedlocation);

    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={title}
        />
      </View>
      {/* <View style={{justifyContent: 'space-around'}}> */}
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker
        onPickeLocation={pickLocationHandler}
        size={25}
        color={Colors.primary500}
      />
      {/* </View> */}
      <View>
        <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    height: '100%',
    padding: 5,
  },
  label: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.primary500,
  },
  input: {
    marginHorizontal: 1,
    marginVertical: 5,
    padding: 10,
    fontSize: 18,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceAddForm;
