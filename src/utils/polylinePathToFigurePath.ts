import { Point, Simplify } from 'curvereduce';
import { Address } from 'types/global';
import { GoogleMapLatLng } from 'types/map';

import { curveReduceEpsilon } from './constants';

export const polylinePathToFigurePath = (polylinePath: GoogleMapLatLng[]) => {
  const points = polylinePath.map((latLng) => {
    const { lat, lng } = latLng.toJSON();
    const point = { x: lat, y: lng };
    return point;
  });
  const simplifiedPoints = Simplify(points, curveReduceEpsilon);
  const figurePath = pointsToFigurePath(simplifiedPoints);
  return figurePath;
};

export const pointsToFigurePath = (points: Point[]): Address[] => {
  return points.map((point) => ({ lat: point.x, lng: point.y }));
};
