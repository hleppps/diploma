import { Box, Button, ButtonGroup, List, ListItem } from '@mui/material';
import { FlatsList } from 'components/unsorted/FlatsList';
import { MapFlatsMap } from 'components/unsorted/MapFlatsMap';
import localforage from 'localforage';
import { pointInPolyRaycast } from 'point-in-polygon-extended';
import { FC, useEffect, useState } from 'react';
import { Address, Flat, PreparedFlatsData } from 'types/global';
import { GoogleMapPolygon, GoogleMapRectangle } from 'types/map';
import { Stores } from 'utils/constants';
import { dummyFlats } from 'utils/dummyFlats';
import { generateFlats } from 'utils/generateFlats';
import { getPolygonBounds, getRectangleBounds } from 'utils/getBounds';

import { styles } from './styles';

export const App: FC = () => {
  const [dbFlats, setDbFlats] = useState<PreparedFlatsData | undefined>();

  const [flats, setFlats] = useState<Flat[]>([]);
  const [figurePath, setFigurePath] = useState<Address[]>([]);

  // const handleGetDbData = () => {
  //   localforage.getItem(Stores.Flats).then((dfFlats) => {
  //     setTempGeneratedFlats(dfFlats as Flat[]);
  //     // setDbFlats(dfFlats as PreparedFlatsData);
  //   });

  // Dummy:
  // const preparedFlats = prepareFlatsData(dummyFlats);
  // setDbFlats(preparedFlats);
  // };

  const handleGenerateData = () => {
    // Dummy data
    const useDummyData = false;

    const generatedFlats = useDummyData
      ? dummyFlats
      : generateFlats(100, {
          coordinates: {
            maxLat: 50.6,
            minLat: 50.3,
            maxLng: 30.9,
            minLng: 30.3,
          },
          rooms: { min: 1, max: 4 },
          rentPrice: { min: 3000, max: 50000 },
        });

    setFlats(generatedFlats);

    localforage.setItem(Stores.Flats, generatedFlats).then((dbFlats) => {
      if (dbFlats) {
        setDbFlats(dbFlats as PreparedFlatsData);
        // alert('Дані згенеровано!');
      }
      handleGetDbData();
    });
  };

  const handleGetDbData = () => {
    localforage.getItem(Stores.Flats).then((dfFlats) => {
      setDbFlats(dfFlats as PreparedFlatsData);
    });
  };

  const handleResetData = () => {
    localforage.removeItem(Stores.Flats).then(() => {
      setDbFlats(undefined);
      setFlats([]);
      // alert('Дані очищено!');
    });
  };

  useEffect(() => {
    handleGetDbData();
  }, []);

  const handlePolygonComplete = (polygon: GoogleMapPolygon) => {
    const polygonPath = getPolygonBounds(polygon);
    setFigurePath(polygonPath);
  };

  const handleRectangleComplete = (rectangle: GoogleMapRectangle) => {
    const rectanglePath = getRectangleBounds(rectangle);
    setFigurePath(rectanglePath);
  };

  // useEffect(() => {
  //   const foundFlats: Flat[] = [];
  //   const polygon = figurePath.map((point) => [point.lat, point.lng]);
  //   tempGeneratedFlats?.forEach((flat) => {
  //     const coordinates = flat.address.coordinates;
  //     const point = [coordinates.lat, coordinates.lng];
  //     const pointInPolygon = pointInPolyRaycast(point, polygon);

  //     if (pointInPolygon) {
  //       foundFlats.push(flat);
  //     }
  //   });

  //   setFlats(foundFlats);
  // }, [figurePath]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mapSection}>
        <MapFlatsMap
          flats={flats}
          onPolygonComplete={handlePolygonComplete}
          onRectangleComplete={handleRectangleComplete}
        />
      </Box>
      <Box sx={styles.filtersSection}>
        <ButtonGroup variant="outlined">
          <Button onClick={handleResetData} color="error" disabled={!dbFlats}>
            Reset flats
          </Button>
          <Button
            onClick={handleGenerateData}
            color="success"
            disabled={!!dbFlats}
          >
            Generate flats
          </Button>
        </ButtonGroup>

        <FlatsList flats={flats} />
      </Box>
    </Box>
  );
};
