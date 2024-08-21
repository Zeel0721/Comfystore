export interface Products {
  category: string[];
  colors: string[];
  company: string;
  description: string;
  image: Blob;
  name: string;
  price: string;
}

export interface FilterOption {
  category: string[];
  company: string[];
}

export interface SortOption {
  id: number;
  value: string;
  label: string;
}
