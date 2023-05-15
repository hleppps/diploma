import { MarkerF, MarkerProps } from '@react-google-maps/api';
import { FC } from 'react';
import { Address } from 'types/global';

import houseMarkerIcon from '../../../assets/icons/house.svg';

type HouseMarkerData = {
  title?: string;
  position: Address;
};

export type MapHouseMarkerProps = Pick<MarkerProps, 'clusterer' | 'onClick'> &
  HouseMarkerData;

export const MapHouseMarker: FC<MapHouseMarkerProps> = ({
  clusterer,
  title,
  position,
}) => {
  // const labelStyles = {
  //   text: `$${price}`,
  //   fontFamily: 'Lato',
  //   color: markerIconColor,
  //   fontWeight: '700',
  // };

  return (
    <MarkerF
      // onClick={onClick}
      position={position}
      clusterer={clusterer}
      // label={labelStyles}
      icon={houseMarkerIcon}
      title={title}
    />
  );
};
