import { Box } from '@mui/material';
import { DrawingManagerF } from '@react-google-maps/api';
import { Map } from 'components/unsorted/Map';
import {
  GoogleMapCircle,
  GoogleMapPolygon,
  GoogleMapRectangle,
  OverlayType,
} from 'components/unsorted/Map/types';
import { pointInPolyRaycast } from 'point-in-polygon-extended';
import { FC } from 'react';

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

const polygon = [
  [50.961459747951125, -105.740709375],
  [39.235982971373964, -110.22313125],
  [44.84370500731902, -104.7739125],
  [41.380421814574206, -96.951646875],
  [48.519793962293306, -99.588365625],
  [45.64813456357929, -103.807115625],
];

export const App: FC = () => {
  const onPolygonComplete = (polygon: GoogleMapPolygon) => {
    getPaths(polygon);
  };

  console.dir([
    pointInPolyRaycast([45.77088192355619, -100.643053125], polygon),
    pointInPolyRaycast([49.84108803054139, -91.502428125], polygon),
  ]);

  const onCircleComplete = (circle: GoogleMapCircle) => {
    console.log(circle.getBounds()?.toJSON());
    console.log(circle.getRadius());
    console.log(circle.getCenter()?.toJSON());
  };

  return (
    <Box sx={{ width: '600px', height: '600px' }}>
      <Map>
        <DrawingManagerF
          options={{
            drawingControlOptions: {
              // drawingModes: [
              //   'circle',
              //   'polygon',
              //   'rectangle',
              // ] as OverlayType[],
            },
          }}
          onCircleComplete={onCircleComplete}
          onPolygonComplete={onPolygonComplete}
          onRectangleComplete={(rectangle: GoogleMapRectangle) => {
            console.log(rectangle.getBounds()?.toJSON());
          }}
        />
      </Map>
    </Box>
  );
};
