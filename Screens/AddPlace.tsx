import {FC} from 'react';
import {Text, View} from 'react-native';
import { insertPlace } from '../Util/Database';
import PlaceAddForm from '../Components/Places/PlaceAddForm';
import { IAddPlace } from '../Constants/Interface';
import { useNavigation } from '@react-navigation/native';

const AddPlace: FC<IAddPlace> = () => {
  const navigation = useNavigation();
  async function createPlaceHandler(place) {
    try {
      const insertion = await insertPlace(place);
      navigation.navigate('All Places');
      console.log('insertion==>', (insertion));

    } catch (error) {
      console.log("Add Place . Error", error);

    }

  }

  return <PlaceAddForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;

// import { FC } from "react"
// import PlaceAddForm from "../Components/Places/PlaceAddForm"
// import { IAddPlace } from "../Constants/Interface"
// import { insertPlace } from "../Util/Database"
// import Place from "../Models/Place"

// const AddPlace : FC <IAddPlace> = ({navigation}) => {
//     async function createPlaceHandler( place: Place) {
//         try{
//             const insert = await insertPlace(place)
//             console.log("Insert" , insert);
//             navigation.navigate('All Places')
//         } catch (error) {
//             console.log('error',error);
//         }
//      }
//     return (
//         <PlaceAddForm onCreatePlace={createPlaceHandler}/>
//     )
// }

// export default AddPlace