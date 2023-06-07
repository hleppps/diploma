import { Box, Button, ButtonGroup } from '@mui/material';
import { FlatsList } from 'components/unsorted/FlatsList';
import { MapFlatsMap } from 'components/unsorted/MapFlatsMap';
import localforage from 'localforage';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Address, Flat } from 'types/global';
import { GoogleMapPolygon, GoogleMapRectangle, GoogleMapType } from 'types/map';
import { Stores } from 'utils/constants';
import { dummyFlats } from 'utils/dummyFlats';
import { findPathTiles } from 'utils/findPathTiles';
import { generateFlats } from 'utils/generateFlats';
import { getPolygonBounds, getRectangleBounds } from 'utils/getBounds';
import { coordinatesToTile } from 'utils/getTile';
import { Tiles } from 'utils/tiles';

import { styles } from './styles';

export const App: FC = () => {
  const [dbFlats, setDbFlats] = useState<Flat[]>([]);
  // const [flats, setFlats] = useState<Flat[]>([]);
  const [figurePaths, setFigurePaths] = useState<Address[][]>([]);
  const mapRef = useRef<GoogleMapType>();

  const tiles = useMemo(() => new Tiles(dbFlats), []);

  const handlePolygonComplete = (polygon: GoogleMapPolygon) => {
    const polygonPath = getPolygonBounds(polygon);
    setFigurePaths((prevPaths) => [...prevPaths, polygonPath]);
  };

  const handleRectangleComplete = (rectangle: GoogleMapRectangle) => {
    const rectanglePath = getRectangleBounds(rectangle);
    setFigurePaths((prevPaths) => [...prevPaths, rectanglePath]);
  };

  const handleGenerateData = () => {
    // Dummy data
    const useDummyData = true;

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

    localforage.setItem(Stores.Flats, generatedFlats).then((dbFlats) => {
      if (dbFlats) {
        setDbFlats(dbFlats as Flat[]);
        // alert('Дані згенеровано!');
      }
      handleGetDbData();
    });
  };

  const handleGetDbData = () => {
    localforage.getItem(Stores.Flats).then((dfFlats) => {
      setDbFlats(dfFlats as Flat[]);
    });
  };

  const handleResetData = () => {
    localforage.removeItem(Stores.Flats).then(() => {
      setDbFlats([]);
      // alert('Дані очищено!');
    });
  };

  useEffect(() => {
    handleGetDbData();
  }, []);

  useEffect(() => {
    // console.log(dbFlats);
    // const flat = dbFlats[0];
    // const { lat, lng } = flat?.address?.coordinates || {};
    // if (lat && lng) {
    //   coordinatesToTile(lat, lng, 11);
    // }
  }, [dbFlats]);

  useEffect(() => {
    findPathTiles(figurePaths[figurePaths.length - 1]);
    // console.log(tiles.get());
    // console.log(figurePaths);
    // figurePaths.forEach((path) => {
    //   getPathGridCells(path);
    // });
    // const foundFlats: Flat[] = [];
    // const polygon = figurePath.map((point) => [point.lat, point.lng]);
    // tempGeneratedFlats?.forEach((flat) => {
    //   const coordinates = flat.address.coordinates;
    //   const point = [coordinates.lat, coordinates.lng];
    //   const pointInPolygon = pointInPolyRaycast(point, polygon);
    //   if (pointInPolygon) {
    //     foundFlats.push(flat);
    //   }
    // });
    // setFlats(foundFlats);
  }, [figurePaths]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mapSection}>
        <MapFlatsMap
          mapRef={mapRef}
          flats={[]}
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

        <FlatsList flats={dbFlats} />
      </Box>
    </Box>
  );
};
