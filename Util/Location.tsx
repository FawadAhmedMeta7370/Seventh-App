import {FC} from 'react';
import {IGetMapPreview} from '../Constants/Interface';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

const GoogleAPIKey = 'AIzaSyBn7ImIYdB5R1LV926HnZolwyxfd6datrM';

const GetMapPreview: FC<IGetMapPreview> = (lat, long) => {
  const MapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GoogleAPIKey}`;
  return MapPreviewUrl;
};

export async function getAddress(lat: Float, long: Float) {
  const AddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GoogleAPIKey}`;
  const response = await fetch(AddressUrl);
  if (!response.ok) {
    throw new Error('Failed to fecth the address!');
  }
  const data = await response.json()
  // console.log("data",data);
  const address = data.results[0].formatted_address
  // console.log("address",address);
  return address
}

export default GetMapPreview;
