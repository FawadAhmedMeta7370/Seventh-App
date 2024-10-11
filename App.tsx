import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import AllPlaces from './Screens/AllPlaces';
import AddPlace from './Screens/AddPlace';
import IconButton from './UI/IconButton';
import {Colors} from './Constants/Colors';
import Map from './Screens/Map';
import LoadingOverlay from './UI/LoadingOverlay';
import {init} from './Util/Database';
import PlaceDetails from './Screens/PlaceDetails';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [dbinitialize, setdbinitialize] = useState<boolean>(false);

  useEffect(() => {
    // console.log('this 1', dbinitialize);
    init();
    // .then(() => {
    //   setdbinitialize(true);
    //   console.log('this 2 true ',dbinitialize);
    // })
    // .catch((error) => {
    //   console.log( " error " , error);
    //   console.log('this 2 false ',dbinitialize);
    // });
    async function initializeDb() {
      try {
        const DBVar = await init();
        setdbinitialize(true);
        // console.log('Database initialized successfully');
        // console.log('DBVar', DBVar);
      } catch (error) {
        Alert.alert(
          'Database Initialization Error',
          'Something went wrong with the database setup.',
        );
        // console.log('Database initialization failed', error); // Log the error
      }
    }
    initializeDb();
  }, []);

  if (!dbinitialize) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: Colors.primary500},
            headerTintColor: Colors.gray700,
            contentStyle: {backgroundColor: Colors.gray700},
          }}>
          <Stack.Screen
            name="All Places"
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Added Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  iconname="add-circle-outline"
                  color={tintColor}
                  size={30}
                  onPress={() => navigation.navigate('Add Places')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Add Places"
            component={AddPlace}
            options={{
              title: 'Add a new place',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Place Details" component={PlaceDetails} options={{
            title: "Loading Place......"
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
