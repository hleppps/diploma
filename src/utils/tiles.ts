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

  getByKey = (key: string) => this.tiles.get(key);

  getFlats = (tilesToSearch: Tile[]) => {
    const flats: Flat[] = [];
    tilesToSearch.forEach((tile) => {
      const tileKey = tileToTileKey(tile);
      const tileFlats = this.getByKey(tileKey);
      if (tileFlats) {
        flats.push(...tileFlats);
      }
    });
    return flats;
  };

  set = (tile: Tile, flat: Flat) => {
    const tileKey = tileToTileKey(tile);
    const tileItem = this.tiles.get(tileKey);
    this.tiles.set(tileKey, tileItem ? [...tileItem, flat] : [flat]);
  };

  reset = () => {
    this.tiles = new Map<string, Flat[]>();
  };
}
