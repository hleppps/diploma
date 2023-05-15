import { Box, Button, List, ListItem } from '@mui/material';
import { MapFlatsMap } from 'components/unsorted/MapFlatsMap';
import { FC, useState } from 'react';
import { Flat } from 'types/global';
import { GoogleMapPolygon } from 'types/map';
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

export const App: FC = () => {
  const [flats, setFlats] = useState<Flat[]>([]);

  const handleGenerateFlats = () => {
    const generatedFlats = generateFlats(100, {
      coordinates: { maxLat: 50.6, minLat: 50.3, maxLng: 30.9, minLng: 30.3 },
    });
    setFlats(generatedFlats);
  };

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
        <Button
          disabled={flats.length > 0}
          onClick={handleGenerateFlats}
          variant="contained"
        >
          Generate Flats
        </Button>
        <List>
          {flats.map(({ _id, address }) => (
            <ListItem key={_id}>{address.street}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
