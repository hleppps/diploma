import { Address, GridSize, PointGridCell } from 'types/global';

import { GridStep } from './constants';
import { divideAByB } from './decimal';

export const getGridCellName = (size: GridSize, point: Address) => {
  const step = GridStep[size];
  // const gridNameLat = Math.floor(point.lat / step);
  const gridNameLat = Math.floor(divideAByB(point.lat, step));
  // const gridNameLng = Math.floor(point.lng / step);
  const gridNameLng = Math.floor(divideAByB(point.lng, step));
  const cellName = new URLSearchParams();
  cellName.set('size', size);
  cellName.set('lat', gridNameLat.toString());
  cellName.set('lng', gridNameLng.toString());
  return cellName.toString();
};

export const getGridCellDataByGridCellName = (gridCellName: string) => {
  const cellNameParams = new URLSearchParams(gridCellName);
  const step = cellNameParams.get('size');
  const lat = cellNameParams.get('lat');
  const lng = cellNameParams.get('lng');
  return { step, lat, lng };
};

export const getPointGridCells = (point: Address): PointGridCell[] => {
  const gridSizes: GridSize[] = ['XL', 'LG', 'MD', 'SM'];

  return gridSizes.map((size) => ({
    gridName: getGridCellName(size, point),
    gridSize: size,
  }));
};
