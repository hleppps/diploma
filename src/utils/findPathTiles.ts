import { maxBy, minBy } from 'lodash';
import { Address, Tile } from 'types/global';

import { coordinatesToTile } from './getTile';

export const findPathExtremePoints = (path: Address[]) => {
  const minLat = minBy(path, ({ lat }) => lat)?.lat as number;
  const maxLat = maxBy(path, ({ lat }) => lat)?.lat as number;
  const minLng = minBy(path, ({ lng }) => lng)?.lng as number;
  const maxLng = maxBy(path, ({ lng }) => lng)?.lng as number;
  return {
    rightBottom: { lat: minLat, lng: maxLng },
    rightTop: { lat: maxLat, lng: maxLng },
    leftTop: { lat: maxLat, lng: minLng },
    leftBottom: { lat: minLat, lng: minLng },
  };
};

const findTilesBetweenExtreme = ({
  leftBottomTile,
  leftTopTile,
  rightBottomTile,
}: {
  leftBottomTile: Tile;
  leftTopTile: Tile;
  rightBottomTile: Tile;
}) => {
  const tiles: Tile[] = [];
  for (let xTile = leftBottomTile.lat; xTile <= rightBottomTile.lat; xTile++) {
    for (let yTile = leftTopTile.lng; yTile <= leftBottomTile.lng; yTile++) {
      tiles.push({ lat: xTile, lng: yTile });
    }
  }
  return tiles;
};

export const findPathTiles = (path: Address[]) => {
  const { leftBottom, leftTop, rightBottom, rightTop } =
    findPathExtremePoints(path);

  // console.log({ leftBottom, leftTop, rightBottom, rightTop });
  const leftBottomTile = coordinatesToTile(leftBottom);
  const leftTopTile = coordinatesToTile(leftTop);
  const rightBottomTile = coordinatesToTile(rightBottom);

  const tiles = findTilesBetweenExtreme({
    leftBottomTile,
    leftTopTile,
    rightBottomTile,
  });

  return tiles;
};
