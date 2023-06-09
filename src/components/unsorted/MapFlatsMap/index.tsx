import { DrawingManagerF, PolygonF, PolylineF } from '@react-google-maps/api';
import { Map, MapProps } from 'components/unsorted/Map';
import { FC, useEffect, useMemo, useState } from 'react';
import { Address, Flat } from 'types/global';
import {
  GoogleMapCircle,
  GoogleMapLatLng,
  GoogleMapOverlayType,
  GoogleMapPolygon,
  GoogleMapRectangle,
} from 'types/map';
import { createMapControlButton } from 'utils/createMapControlButton';
import { polylinePathToFigurePath } from 'utils/polylinePathToFigurePath';

import { MapHouseMarker } from '../MapHouseMarker';
import { MapMarkerClusterer } from '../MapMarkerClusterer';

const figureOptions = {
  fillOpacity: 0.2,
  fillColor: '#5F96F5',
  strokeColor: '#5F96F5',
  strokeWeight: 3,
  draggable: false,
  editable: false,
};

export type MapFlatsMapProps = {
  onCircleComplete?: (circle: GoogleMapCircle) => void;
  onRectangleComplete?: (rectangle: GoogleMapRectangle) => void;
  onPolygonComplete?: (polygon: GoogleMapPolygon) => void;
  flats: Flat[];
  closeRangeFlats: Flat[];
  resetPolygons: () => void;
  handleAddFreeHandFigurePath: (path: Address[]) => void;
  freeHandFigurePaths: Address[][];
} & MapProps;

export const MapFlatsMap: FC<MapFlatsMapProps> = ({
  onCircleComplete,
  onRectangleComplete,
  onPolygonComplete,
  flats,
  closeRangeFlats,
  mapRef,
  resetPolygons,
  handleAddFreeHandFigurePath,
  freeHandFigurePaths,
  ...rest
}) => {
  const [drawing, setDrawing] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [polylinePath, setPolylinePath] = useState<GoogleMapLatLng[]>([]);

  const disableMap = () => {
    mapRef.current?.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  };

  const enableMap = () => {
    mapRef.current?.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    });
  };

  const handleSetDrawing = () => {
    disableMap();
    setDrawing(true);
  };

  const handleMouseMove = (e: google.maps.MapMouseEvent) => {
    if (drawing && mouseDown) {
      const { latLng } = e || {};
      if (latLng) {
        setPolylinePath((prev) => [...prev, latLng]);
      }
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setDrawing(false);
    enableMap();
    const freeHandFigurePath = polylinePathToFigurePath(polylinePath);
    setPolylinePath([]);
    handleAddFreeHandFigurePath(freeHandFigurePath);
  };

  const handleMouseDown = () => {
    setMouseDown(true);
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

  const drawButton = createMapControlButton({
    textContent: '✎',
    onClick: handleSetDrawing,
    className: 'draw-button',
  });

  useEffect(() => {
    mapRef.current?.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      updateButton,
    );
    mapRef.current?.controls[google.maps.ControlPosition.LEFT_TOP].push(
      drawButton,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Map
      {...rest}
      mapRef={mapRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <PolylineF onMouseUp={handleMouseUp} path={polylinePath} />
      {freeHandFigurePaths.map((path, index) => (
        <PolygonF options={figureOptions} key={index} path={path} />
      ))}

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
