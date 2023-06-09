import {
  GoogleMap,
  GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api';
import { FC, memo, MutableRefObject } from 'react';
import { GoogleMapLibraries, GoogleMapType } from 'types/map';
import { dummyMapData, GOOGLE_MAP_API_KEY } from 'utils/constants';

const containerStyle = {
  width: '100%',
  height: '100%',
};
const libraries: GoogleMapLibraries = ['places', 'drawing'];

const { zoom: dummyZoom } = dummyMapData;

export type MapProps = {
  getMapReference?: (map: GoogleMapType | undefined) => void;
  mapRef: MutableRefObject<google.maps.Map | undefined>;
} & GoogleMapProps;

const Map: FC<MapProps> = ({ children, zoom, mapRef, ...rest }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries,
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
