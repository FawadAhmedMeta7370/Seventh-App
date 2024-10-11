import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {PermissionsAndroid} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {useState} from 'react';
import OutlineButton from '../../UI/OutlinedButton';

function ImagePicker({onTakeImage}) {
  const [clickedImage, setClickedImage] = useState();

  async function FImagePicker() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your phones camera',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
          buttonNeutral: 'Ask me later',
        },
      );
      // console.log(PermissionsAndroid.RESULTS.GRANTED, "-" ,granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options: CameraOptions = {
          quality: 0.8,
          mediaType: 'photo',
          cameraType: 'front',
        };
        const image: ImagePickerResponse = await launchCamera(options)

        const PickedImageUri = image.assets[0].uri

        console.log("PickedImageUri====>",PickedImageUri);
        
        setClickedImage(PickedImageUri);

        onTakeImage(PickedImageUri)
        // console.log('Image : -------------->' + JSON.stringify(image, null, 2));
      } else {
        console.log('Camera Permission Denied');
      }
    } catch (error) {
      console.warn(error);
    }
  }

  let ImageDisplay = (
    <Text style={styles.text}>No image at the moment to display!</Text>
  );

  if (clickedImage) {
    ImageDisplay = <Image style={styles.image} source={{uri: clickedImage}} />;
  }

  return (
    <View>
      <View style={styles.imagecontainer}>{ImageDisplay}</View>
      <OutlineButton
        icon="camera-outline"
        color={Colors.primary500}
        size={50}
        onPress={FImagePicker}>Take Pic</OutlineButton>
      {/* <Button title="Open Camera" onPress={FImagePicker} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: '60%',
    width: '100%',
    borderWidth: 3,
    borderColor: Colors.primary500,
    borderRadius: 25,
    backgroundColor: Colors.primary500
  },
  image: {
    borderWidth: 3,
    borderColor: Colors.primary500,
    borderRadius: 25,
    margin: 5,
    height: '100%',
    width: '100%',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ImagePicker;
