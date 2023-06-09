import { Box, Button, ButtonGroup, Divider } from '@mui/material';
import { FlatsList } from 'components/unsorted/FlatsList';
import { MapFlatsMap } from 'components/unsorted/MapFlatsMap';
import localforage from 'localforage';
import { pointInPolyRaycast } from 'point-in-polygon-extended';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Address, Flat } from 'types/global';
import { GoogleMapPolygon, GoogleMapRectangle, GoogleMapType } from 'types/map';
import { dummyMapData, Stores } from 'utils/constants';
import { dummyFlats } from 'utils/dummyFlats';
import { findPathTiles } from 'utils/findPathTiles';
import { generateFlats } from 'utils/generateFlats';
import { getPolygonBounds, getRectangleBounds } from 'utils/getBounds';
import { Tiles } from 'utils/tiles';

import { styles } from './styles';

export const App: FC = () => {
  const [dbFlats, setDbFlats] = useState<Flat[]>([]);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [closeRangeFlats, setCloseRangeFlats] = useState<Flat[]>([]);
  const [figurePaths, setFigurePaths] = useState<Address[][]>([]);
  const [freeHandFigurePaths, setFreeHandFigurePaths] = useState<Address[][]>(
    [],
  );
  const [center, setCenter] = useState<Address>(dummyMapData.center);
  const [zoom, setZoom] = useState(dummyMapData.zoom);
  const [mapKey, setMapKey] = useState(1);
  const mapRef = useRef<GoogleMapType>();

  const tiles = useMemo(() => new Tiles([]), []);

  useEffect(() => {
    tiles.add(dbFlats);
    // setFlats(dbFlats);
  }, [dbFlats]);

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
    const useDummyData = false;

    const generatedFlats = useDummyData
      ? dummyFlats
      : [
          ...generateFlats(100, {
            coordinates: {
              maxLat: 50.32,
              minLat: 50.2,
              maxLng: 28.77,
              minLng: 28.57,
            },
            rooms: { min: 1, max: 4 },
            rentPrice: { min: 3000, max: 50000 },
          }),
          ...generateFlats(1000, {
            coordinates: {
              maxLat: 50,
              minLat: 40,
              maxLng: 30,
              minLng: 20,
            },
            rooms: { min: 1, max: 4 },
            rentPrice: { min: 3000, max: 50000 },
          }),
        ];

    localforage.setItem(Stores.Flats, generatedFlats).then((dbFlats) => {
      if (dbFlats) {
        setDbFlats(dbFlats as Flat[]);
        alert('Дані згенеровано!');
      }
      handleGetDbData();
    });
  };

  const handleGetDbData = () => {
    localforage.getItem(Stores.Flats).then((dfFlats) => {
      setDbFlats((dfFlats as Flat[]) || []);
    });
  };

  const handleResetFlats = () => {
    setFlats([]);
    setCloseRangeFlats([]);
    setFigurePaths([]);
    setFreeHandFigurePaths([]);
    setMapKey(Math.random() / 1000);
  };

  const handleAddFreeHandFigurePath = (path: Address[]) => {
    if (path.length) {
      setFreeHandFigurePaths((prevPaths) => [...prevPaths, path]);
    }
  };

  const handleResetData = () => {
    localforage.removeItem(Stores.Flats).then(() => {
      setDbFlats([]);
      handleResetFlats();

      alert('Дані очищено!');
    });
  };

  const handleResetFigurePaths = () => {
    handleResetFlats();
  };

  useEffect(() => {
    handleGetDbData();
  }, []);

  useEffect(() => {
    if (freeHandFigurePaths.length) {
      setFigurePaths((prevPaths) => [
        ...prevPaths,
        freeHandFigurePaths[freeHandFigurePaths.length - 1],
      ]);
    }
  }, [freeHandFigurePaths]);

  useEffect(() => {
    const foundFlats: Flat[] = [];
    let closeRangeFoundFlats: Flat[] = [];

    figurePaths.forEach((path) => {
      const polygon = path.map((point) => [point.lat, point.lng]);

      const pathTiles = findPathTiles(path);
      const pathTileFlats = tiles.getFlats(pathTiles);

      pathTileFlats.forEach((foundFlat) => {
        const coordinates = foundFlat.address.coordinates;
        const point = [coordinates.lat, coordinates.lng];
        const pointInPolygon = pointInPolyRaycast(point, polygon);
        const inFoundFlats = foundFlats.find(
          (flat) => flat.id === foundFlat.id,
        );
        const inCloseRangeFlats = closeRangeFoundFlats.find(
          (flat) => flat.id === foundFlat.id,
        );
        if (pointInPolygon && !inFoundFlats) {
          foundFlats.push(foundFlat);
        } else if (!pointInPolygon && !inFoundFlats && !inCloseRangeFlats) {
          closeRangeFoundFlats.push(foundFlat);
        } else if (inCloseRangeFlats && inFoundFlats) {
          closeRangeFoundFlats = closeRangeFoundFlats.filter(
            (flat) => flat.id !== foundFlat.id,
          );
        }
      });
    });

    setFlats(foundFlats);
    setCloseRangeFlats(closeRangeFoundFlats);
  }, [figurePaths]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mapSection}>
        <MapFlatsMap
          key={mapKey}
          resetPolygons={handleResetFigurePaths}
          mapRef={mapRef}
          flats={flats}
          closeRangeFlats={closeRangeFlats}
          onPolygonComplete={handlePolygonComplete}
          onRectangleComplete={handleRectangleComplete}
          center={center}
          zoom={zoom}
          handleAddFreeHandFigurePath={handleAddFreeHandFigurePath}
          freeHandFigurePaths={freeHandFigurePaths}
          onUnmount={() => {
            setCenter(mapRef.current?.getCenter()?.toJSON() as Address);
            setZoom(mapRef.current?.getZoom() || dummyMapData.zoom);
          }}
        />
      </Box>
      <Box sx={styles.filtersSection}>
        <ButtonGroup variant="outlined">
          <Button
            onClick={handleResetData}
            color="error"
            disabled={!dbFlats.length}
          >
            Очистити базу даних
          </Button>
          <Button
            onClick={handleGenerateData}
            color="success"
            disabled={!!dbFlats.length}
          >
            Згенерувати об&apos;єкти нерухомості
          </Button>
        </ButtonGroup>
        <Divider sx={{ mt: '16px' }} />
        <FlatsList flats={flats} closeRangeFlats={closeRangeFlats} />
      </Box>
    </Box>
  );
};
