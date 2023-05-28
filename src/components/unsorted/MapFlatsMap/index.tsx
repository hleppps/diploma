import { DrawingManagerF, MarkerF, PolylineF } from '@react-google-maps/api';
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

  return (
    <Map zoom={12} center={{ lat: 50.47, lng: 30.47 }} {...rest}>
      <DrawingManagerF
        options={{
          polygonOptions: figureOptions,
          circleOptions: figureOptions,
          rectangleOptions: figureOptions,
          drawingControlOptions: {
            drawingModes: [
              // 'circle',
              'polygon',
              'rectangle',
            ] as GoogleMapOverlayType[],
          },
        }}
        onCircleComplete={onCircleComplete}
        onRectangleComplete={onRectangleComplete}
        onPolygonComplete={onPolygonComplete}
      />

      {/* <PolylineF
        options={{ strokeColor: 'red' }}
        path={[
          { lat: 50.36, lng: 30.33 },
          { lat: 50.37, lng: 30.33 },
          { lat: 50.37, lng: 30.34 },
          { lat: 50.36, lng: 30.34 },
        ]}
      /> */}

      {/* <PolylineF
        options={{ strokeColor: 'red' }}
        path={[
          { lat: 0, lng: 0 },
          { lat: 0, lng: 0.01 },
          { lat: 0.01, lng: 0.01 },
          { lat: 0.01, lng: 0 },
          { lat: 0, lng: 0 },
        ]}
      />
      <PolylineF
        options={{ strokeColor: '#FEFEFE' }}
        path={[
          { lat: 0, lng: 0 },
          { lat: 0, lng: 0.1 },
          { lat: 0.1, lng: 0.1 },
          { lat: 0.1, lng: 0 },
          { lat: 0, lng: 0 },
        ]}
      />
      <PolylineF
        options={{ strokeColor: 'blue' }}
        path={[
          { lat: 0, lng: 0 },
          { lat: 0, lng: 1 },
          { lat: 1, lng: 1 },
          { lat: 1, lng: 0 },
          { lat: 0, lng: 0 },
        ]}
      />
      <PolylineF
        options={{ strokeColor: 'violet' }}
        path={[
          { lat: 0, lng: 0 },
          { lat: 0, lng: 10 },
          { lat: 10, lng: 10 },
          { lat: 10, lng: 0 },
          { lat: 0, lng: 0 },
        ]}
      />
      <MarkerF position={{ lat: 50.4, lng: 30.46 }} />
      <MarkerF position={{ lat: 50.41, lng: 30.46 }} />

      <MarkerF position={{ lat: 50.4, lng: 30.5 }} />
      <MarkerF position={{ lat: 50.5, lng: 30.5 }} />

      <MarkerF position={{ lat: 50.4, lng: 30.54 }} />
      <MarkerF position={{ lat: 51.4, lng: 30.54 }} /> */}

      {/* <MarkerF position={{ lat: 50.41, lng: 30.46 }} /> */}
      <MapMarkerClusterer>{flatMarkers}</MapMarkerClusterer>
      {/* {flatMarkers} */}
    </Map>
  );
};
