import { Tile } from 'types/global';

import { TILE_ZOOM } from './constants';

const latToTile = (lat: number, zoom: number) => {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom),
  );
};

const lngToTile = (lng: number, zoom: number) => {
  return Math.floor(((lng + 180) / 360) * Math.pow(2, zoom));
};

export const coordinatesToTile = (
  {
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  },
  zoom = TILE_ZOOM,
): Tile => {
  const latTile = latToTile(lat, zoom);
  const lngTile = lngToTile(lng, zoom);
  return { lng: latTile, lat: lngTile };
};

export const tileToTileKey = (tile: Tile) =>
  JSON.stringify({ lat: tile.lat, lng: tile.lng });
