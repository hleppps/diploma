import { fakerUK as faker } from '@faker-js/faker';
import { Flat } from 'types/global';

interface GenerateFlatsOptions {
  coordinates: {
    maxLat: number;
    minLat: number;
    maxLng: number;
    minLng: number;
  };
}

const generateFlat = (options?: GenerateFlatsOptions): Flat => {
  const { maxLat, maxLng, minLat, minLng } = options?.coordinates || {};
  return {
    _id: faker.string.uuid(),
    previewImage: faker.image.urlLoremFlickr({ category: 'interior' }),
    address: {
      coordinates: {
        lat: faker.location.latitude({ max: maxLat, min: minLat }),
        lng: faker.location.longitude({ max: maxLng, min: minLng }),
      },
      street: faker.location.street(),
      streetAddress: faker.location.streetAddress(),
    },
  };
};

export const generateFlats = (
  amount = 1,
  options?: GenerateFlatsOptions,
): Flat[] => {
  faker.seed(1);
  return Array.from({ length: amount }, () => generateFlat(options));
};
