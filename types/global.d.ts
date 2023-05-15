export type Address = { lat: number; lng: number };

export type Flat = {
  _id: string;
  previewImage: string;
  address: {
    coordinates: {
      lat: number;
      lng: number;
    };
    street: string;
    streetAddress: string;
  };
};
