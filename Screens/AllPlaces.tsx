import { FC, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../Util/Database';
import PlacesList from '../Components/Places/PlacesList';

interface IPlace {}

const AllPlaces: FC<IPlace> = ({}) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
