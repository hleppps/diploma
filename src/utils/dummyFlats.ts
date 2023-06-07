import { Flat } from 'types/global';

export const dummyFlats: Flat[] = [
  {
    id: '1',
    previewImage:
      'https://loremflickr.com/640/480/interior?lock=4116067871883264',
    address: {
      coordinates: {
        lat: 50.3601,
        lng: 30.33,
      },
      street: 'Староміська майдан',
      streetAddress: 'вулиця Брюховичів, 324',
    },
    rooms: 1,
    rentPrice: 12500,
  },
  {
    id: '2',
    previewImage:
      'https://loremflickr.com/640/480/interior?lock=4116067871883264',
    address: {
      coordinates: {
        lat: 50.3202,
        lng: 30.3542,
      },
      street: 'Ждунів майдан',
      streetAddress: 'вулиця Ждунова, 4',
    },
    rooms: 1,
    rentPrice: 10000,
  },
];
