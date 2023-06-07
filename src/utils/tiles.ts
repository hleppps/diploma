import { Flat, Tile } from 'types/global';

import { coordinatesToTile, tileToTileKey } from './getTile';

export class Tiles {
  private tiles = new Map<string, Flat[]>();

  constructor(initialFlats: Flat[]) {
    this.add(initialFlats);
  }

  add = (flats: Flat[]) => {
    flats.forEach((flat) => {
      const { lat, lng } = flat.address.coordinates;
      const tile = coordinatesToTile({ lat, lng });
      this.set(tile, flat);
    });
  };

  get = (key?: string) => (key ? this.tiles.get(key) : this.tiles);

  getTileValues = (tile: Tile) => {
    const tileKey = tileToTileKey(tile);
    return this.tiles.get(tileKey)?.values();
  };

  set = (tile: Tile, flat: Flat) => {
    const tileKey = tileToTileKey(tile);
    const tileItem = this.tiles.get(tileKey);
    this.tiles.set(tileKey, tileItem ? [...tileItem, flat] : [flat]);
  };
}
