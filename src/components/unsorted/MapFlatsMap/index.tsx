import { DrawingManagerF } from '@react-google-maps/api';
import { Map, MapProps } from 'components/unsorted/Map';
import { FC, useEffect, useMemo } from 'react';
import { Flat } from 'types/global';
import {
  GoogleMapCircle,
  GoogleMapOverlayType,
  GoogleMapPolygon,
  GoogleMapRectangle,
} from 'types/map';
import { createMapControlButton } from 'utils/createMapControlButton';

import { MapHouseMarker } from '../MapHouseMarker';
import { MapMarkerClusterer } from '../MapMarkerClusterer';

export type MapFlatsMapProps = {
  onCircleComplete?: (circle: GoogleMapCircle) => void;
  onRectangleComplete?: (rectangle: GoogleMapRectangle) => void;
  onPolygonComplete?: (polygon: GoogleMapPolygon) => void;
  flats: Flat[];
  closeRangeFlats: Flat[];
  resetPolygons: () => void;
} & MapProps;

export const MapFlatsMap: FC<MapFlatsMapProps> = ({
  onCircleComplete,
  onRectangleComplete,
  onPolygonComplete,
  flats,
  closeRangeFlats,
  mapRef,
  resetPolygons,
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

  const closeRangeFlatMarkers = useMemo(() => {
    return closeRangeFlats.map(({ address, id }) => (
      <MapHouseMarker
        inRange={false}
        key={id}
        position={{
          lat: address.coordinates.lat,
          lng: address.coordinates.lng,
        }}
      />
    ));
  }, [closeRangeFlats]);

  const updateButton = createMapControlButton({
    textContent: '⌫ Очистити',
    onClick: resetPolygons,
    className: 'clear-polygons-button',
  });

  useEffect(() => {
    mapRef.current?.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      updateButton,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current?.controls]);

  return (
    <Map mapRef={mapRef} {...rest}>
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
      <MapMarkerClusterer>{flatMarkers}</MapMarkerClusterer>
      <MapMarkerClusterer>{closeRangeFlatMarkers}</MapMarkerClusterer>
    </Map>
  );
};
