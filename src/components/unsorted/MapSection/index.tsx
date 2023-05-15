import { DrawingManagerF } from '@react-google-maps/api';
import { Map, MapProps } from 'components/unsorted/Map';
import {
  GoogleMapCircle,
  GoogleMapOverlayType,
  GoogleMapPolygon,
  GoogleMapPolygonOptions,
  GoogleMapRectangle,
} from 'components/unsorted/Map/types';
import { FC } from 'react';

export type MapSectionProps = {
  circleCompleteHandler?: (circle: GoogleMapCircle) => void;
  rectangleCompleteHandler?: (rectangle: GoogleMapRectangle) => void;
  polygonCompleteHandler?: (polygon: GoogleMapPolygon) => void;
} & MapProps;

export const MapSection: FC<MapSectionProps> = ({
  circleCompleteHandler,
  rectangleCompleteHandler,
  polygonCompleteHandler,
  ...rest
}) => {
  const figureOptions = {
    fillOpacity: 0.2,
    fillColor: '#FF8200',
    strokeColor: '#FF8200',
    strokeWeight: 3,
    draggable: false,
    editable: false,
  };

  return (
    <Map zoom={14} {...rest}>
      <DrawingManagerF
        options={{
          polygonOptions: figureOptions,
          circleOptions: figureOptions,
          rectangleOptions: figureOptions,
          drawingControlOptions: {
            drawingModes: [
              'circle',
              'polygon',
              'rectangle',
            ] as GoogleMapOverlayType[],
          },
        }}
        onCircleComplete={circleCompleteHandler}
        onRectangleComplete={rectangleCompleteHandler}
        onPolygonComplete={polygonCompleteHandler}
      />
    </Map>
  );
};
