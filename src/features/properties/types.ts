export interface PropertyDto {
  id?: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  year: number;
  fileName?: string;
  image?: string;
  imageUrl?: string;
}

export interface PropertyUpdateDto {
  propertyId: string;
  property: PropertyDto;
  trace: PropertyTrace | null;
  isSold: boolean;
}

export interface PropertyWithOwner {
  property: Property,
  owner: Owner;
}

export interface Property {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: string;
  image: PropertyImage;
  traces: PropertyTrace[];
  createdAt: Date;
}

export interface Owner {
  name: string;
  address: string;
  birthDay: Date;
}

export interface PropertyImage {
  _id: string;
  file: string;
  enabled: boolean;
}

export interface PropertyTrace {
  dateSale: string;
  name: string;
  value: number;
  tax: number;
}

export interface PropertyFiltersValues {
  name?: string;
  address?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}
