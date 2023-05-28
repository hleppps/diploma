import { Flat } from 'types/global';

import { getPointGridCells } from './getPointGridCells';

export const prepareFlatsData = (flats: Flat[]) => {
  let preparedFlats: any = {};
  flats.forEach((flat) => {
    const flatAddressPoint = flat.address.coordinates;
    const [xl, lg, md, sm] = getPointGridCells(flatAddressPoint);

    preparedFlats = {
      ...preparedFlats,
      [xl.gridName]: {
        ...preparedFlats?.[xl.gridName],
        [lg.gridName]: {
          ...preparedFlats?.[xl.gridName]?.[lg.gridName],
          [md.gridName]: {
            ...preparedFlats?.[xl.gridName]?.[lg.gridName]?.[md.gridName],
            [sm.gridName]: [
              ...(preparedFlats?.[xl.gridName]?.[lg.gridName]?.[md.gridName]?.[
                sm.gridName
              ] || []),
              flat,
            ],
          },
        },
      },
    };
  });
  return preparedFlats;
};
