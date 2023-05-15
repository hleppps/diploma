import {
  GoogleMap,
  GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api';
import { FC, memo, useRef } from 'react';
import { Address } from 'types/global';
import { GoogleMapType } from 'types/map';
import { GOOGLE_MAP_API_KEY } from 'utils/constants';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export const dummyMapData = {
  center: { lat: 50.47, lng: 30.47 },
  zoom: 9,
};
const { center: dummyCenter, zoom: dummyZoom } = dummyMapData;

export type MapProps = {
  center?: Address | null;
  getMapReference?: (map: GoogleMapType | undefined) => void;
} & Omit<GoogleMapProps, 'center'>;

const Map: FC<MapProps> = ({ children, zoom, center, ...rest }) => {
  const mapRef = useRef<GoogleMapType>();

  const { isLoaded } = useJsApiLoader({
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
      zoom={zoom || dummyZoom}
      center={center || dummyCenter}
      onLoad={onLoadMap}
      mapContainerStyle={containerStyle}
      {...rest}
    >
      {children}
    </GoogleMap>
  );
};

const MemoizedMap = memo(Map);
export { MemoizedMap as Map };
