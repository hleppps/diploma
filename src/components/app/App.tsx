import { Box } from '@mui/material';
import { DrawingManagerF } from '@react-google-maps/api';
import { Map } from 'components/unsorted/Map';
import {
  GoogleMapCircle,
  GoogleMapPolygon,
  GoogleMapRectangle,
  OverlayType,
} from 'components/unsorted/Map/types';
import { FC } from 'react';

function getPaths(polygon: GoogleMapPolygon) {
  const polygonBounds = polygon.getPath();
  // const bounds = [];
  // for (let i = 0; i < (polygonBounds as unknown as any)?.length; i++) {
  //   const point = {
  //     lat: polygonBounds.getAt(i).lat(),
  //     lng: polygonBounds.getAt(i).lng(),
  //   };
  //   bounds.push(point);
  // }
  // console.log(bounds);
}

export const App: FC = () => {
  const onPolygonComplete = (polygon: GoogleMapPolygon) => {
    getPaths(polygon);
  };

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
