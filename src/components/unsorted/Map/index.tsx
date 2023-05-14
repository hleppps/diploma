import {
  DrawingManager,
  GoogleMap,
  GoogleMapProps,
  LoadScript,
  useJsApiLoader,
} from '@react-google-maps/api';
import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { Address } from 'types/global';
import { GOOGLE_MAP_API_KEY } from 'utils/constants';
import { Bounds, GoogleMapDrawingManager, GoogleMapType } from './types';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export const dummyMapData = {
  center: { lat: 39.0997, lng: -94.5786 },
  zoom: 4,
};
const { center: dummyCenter, zoom: dummyZoom } = dummyMapData;

export type MapProps = {
  bounds?: Bounds;
  center?: Address | null;
  getMapReference?: (map: GoogleMapType | undefined) => void;
} & Omit<GoogleMapProps, 'center'>;

const Map: FC<MapProps> = ({
  children,
  getMapReference,
  mapContainerStyle,
  zoom,
  center,
  bounds,
  ...rest
}) => {
  const mapRef = useRef<GoogleMapType>();
  const drawingManagerRef = useRef<GoogleMapDrawingManager>();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ['places', 'drawing'],
  });

  const onLoadMap = (map: GoogleMapType) => {
    mapRef.current = map;
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={dummyZoom}
      center={dummyCenter}
      onLoad={onLoadMap}
      mapContainerStyle={containerStyle}
    >
      {children}
    </GoogleMap>
  );
};

const MemoizedMap = memo(Map);
export { MemoizedMap as Map };
