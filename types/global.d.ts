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

export type GridSize = 'SM' | 'MD' | 'LG' | 'XL';

export type FlatDbSliceItem<T> = Record<string, T[]>;

export type PreparedFlatsData = FlatDbSliceItem[]
//  | Flat[];

export type GridCell = {
  cellName: string; // LG_lat1_lng1
  startPoint: Address;
  step: GridStep;
};

export type PointGridCell = {
  gridSize: GridSize;
  gridName: string;
};
