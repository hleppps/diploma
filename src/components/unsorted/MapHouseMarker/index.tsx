import { MarkerF, MarkerProps } from '@react-google-maps/api';
import { FC } from 'react';
import { Address } from 'types/global';

import houseGreyMarkerIcon from '../../../assets/icons/greyHouse.svg';
import houseMarkerIcon from '../../../assets/icons/house.svg';

type HouseMarkerData = {
  title?: string;
  position: Address;
  inRange?: boolean;
};

export type MapHouseMarkerProps = Pick<MarkerProps, 'clusterer' | 'onClick'> &
  HouseMarkerData;

export const MapHouseMarker: FC<MapHouseMarkerProps> = ({
  clusterer,
  title,
  position,
  inRange = true,
}) => {
  return (
    <MarkerF
      position={position}
      clusterer={clusterer}
      icon={inRange ? houseMarkerIcon : houseGreyMarkerIcon}
      title={title}
    />
  );
};
