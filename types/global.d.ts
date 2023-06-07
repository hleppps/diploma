import { GridStep } from 'utils/constants';

export type Address = { lat: number; lng: number };

export type Flat = {
  id: string;
  previewImage: string;
  address: {
    coordinates: {
      lat: number;
      lng: number;
    };
    street: string;
    streetAddress: string;
  };
  rooms: number;
  rentPrice: number;
};

export type Tile = Address