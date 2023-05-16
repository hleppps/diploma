import { DrawingManagerF } from '@react-google-maps/api';
import { Map, MapProps } from 'components/unsorted/Map';
import { FC, useMemo } from 'react';
import { Flat } from 'types/global';
import {
  GoogleMapCircle,
  GoogleMapOverlayType,
  GoogleMapPolygon,
  GoogleMapRectangle,
} from 'types/map';

import { MapHouseMarker } from '../MapHouseMarker';
import { MapMarkerClusterer } from '../MapMarkerClusterer';

export type MapFlatsMapProps = {
  onCircleComplete?: (circle: GoogleMapCircle) => void;
  onRectangleComplete?: (rectangle: GoogleMapRectangle) => void;
  onPolygonComplete?: (polygon: GoogleMapPolygon) => void;
  flats: Flat[];
} & MapProps;

export const MapFlatsMap: FC<MapFlatsMapProps> = ({
  onCircleComplete,
  onRectangleComplete,
  onPolygonComplete,
  flats,
  ...rest
}) => {
  const figureOptions = {
    fillOpacity: 0.2,
    fillColor: '#5F96F5',
    strokeColor: '#5F96F5',
    strokeWeight: 3,
    draggable: false,
    editable: false,
  };

  const flatMarkers = useMemo(() => {
    return flats.map(({ address, id }) => (
      <MapHouseMarker
        key={id}
        position={{
          lat: address.coordinates.lat,
          lng: address.coordinates.lng,
        }}
      />
    ));
  }, [flats]);

  console.log(flats);

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
        onCircleComplete={onCircleComplete}
        onRectangleComplete={onRectangleComplete}
        onPolygonComplete={onPolygonComplete}
      />
      <MapMarkerClusterer>{flatMarkers}</MapMarkerClusterer>
    </Map>
  );
};
