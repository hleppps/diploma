import { Address } from 'types/global';
import { GoogleMapPolygon, GoogleMapRectangle } from 'types/map';

export const getPolygonBounds = (polygon: GoogleMapPolygon) => {
  const polygonBounds = polygon.getPath();
  const bounds = [];
  for (let i = 0; i < (polygonBounds as unknown as any)?.length; i++) {
    const point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng(),
    };
    bounds.push(point);
  }
  return bounds;
};

export const getRectangleBounds = (rectangle: GoogleMapRectangle) => {
  const { east, north, south, west } = rectangle.getBounds()?.toJSON() || {};
  if (!east || !north || !south || !west) {
    return [];
  }

  const bounds: Address[] = [
    { lng: west, lat: north },
    { lng: east, lat: north },
    { lng: east, lat: south },
    { lng: west, lat: south },
  ];
  return bounds;
};
