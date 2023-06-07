import { fakerUK as faker } from '@faker-js/faker';
import { Flat } from 'types/global';

interface GenerateFlatsOptions {
  coordinates?: {
    maxLat: number;
    minLat: number;
    maxLng: number;
    minLng: number;
  };
  rooms?: {
    min: number;
    max: number;
  };
  rentPrice?: {
    min: number;
    max: number;
  };
}

const generateFlat = (options?: GenerateFlatsOptions): Flat => {
  const { rooms, coordinates, rentPrice } = options || {};
  const { maxLat, maxLng, minLat, minLng } = coordinates || {};
  return {
    id: faker.string.uuid(),
    previewImage: faker.image.urlLoremFlickr({ category: 'apartment' }),
    address: {
      coordinates: {
        lat: faker.location.latitude({ max: maxLat, min: minLat }),
        lng: faker.location.longitude({ max: maxLng, min: minLng }),
      },
      street: faker.location.street(),
      streetAddress: faker.location.streetAddress(),
    },
    rooms: faker.number.int({ min: rooms?.min || 1, max: rooms?.max || 10 }),
    rentPrice: faker.number.int({
      min: rentPrice?.min || 1000,
      max: rentPrice?.max || 50000,
    }),
  };
};

export const generateFlats = (
  amount = 1,
  options?: GenerateFlatsOptions,
): Flat[] => {
  faker.seed(1);
  return Array.from({ length: amount }, () => generateFlat(options));
};
