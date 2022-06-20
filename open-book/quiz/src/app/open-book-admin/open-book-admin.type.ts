export interface BookItem {
  id: number;
  county: string;
  country: string;
  town: string;
  postcode: string;
  description: string;
  displayableAddress: string;
  imageUrl: string;
  thumbImageUrl: string;
  latitude: string;
  longitude: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: number;
  propertyType: string;
  forWhat: number;
}

export interface BookItemView extends BookItem {
  forWhatDescription: string;
}
