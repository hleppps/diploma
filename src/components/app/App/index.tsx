import { Box, List, ListItem } from '@mui/material';
import { MapFlatsMap } from 'components/unsorted/MapFlatsMap';
import localforage from 'localforage';
import { FC, useEffect, useState } from 'react';
import { Flat } from 'types/global';
import { GoogleMapPolygon } from 'types/map';
import { Stores } from 'utils/constants';
import { generateFlats } from 'utils/generateFlats';

import { styles } from './styles';

function getPaths(polygon: GoogleMapPolygon) {
  const polygonBounds = polygon.getPath();
  const bounds = [];
  for (let i = 0; i < (polygonBounds as unknown as any)?.length; i++) {
    const point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng(),
    };
    bounds.push(point);
  }
  console.log(bounds);
}

const generatedFlats = generateFlats(100, {
  coordinates: { maxLat: 50.6, minLat: 50.3, maxLng: 30.9, minLng: 30.3 },
  rooms: { min: 1, max: 4 },
  rentPrice: { min: 3000, max: 50000 },
});

export const App: FC = () => {
  const [flats, setFlats] = useState<Flat[]>([]);

  useEffect(() => {
    localforage.setItem(Stores.Flats, generatedFlats);
  }, []);

  useEffect(() => {
    localforage.getItem(Stores.Flats).then((dbFlats: any) => {
      setFlats(dbFlats as Flat[]);
    });
  }, []);

  const handlePolygonComplete = (polygon: GoogleMapPolygon) => {
    getPaths(polygon);
  };
  return (
    <Box sx={styles.container}>
      <MapFlatsMap
        flats={flats}
        onPolygonComplete={handlePolygonComplete}
        mapContainerStyle={{ width: '600px', height: '600px' }}
      />
      <Box>
        {/* <div>{JSON.stringify(db)}</div> */}
        {/* <Button
          disabled={flats.length > 0}
          onClick={handleGenerateFlats}
          variant="contained"
        >
          Generate Flats
        </Button> */}
        <List>
          {flats.map(({ id, address }) => (
            <ListItem key={id}>{address.street}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
