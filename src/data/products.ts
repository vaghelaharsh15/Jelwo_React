import productsData from './products.json';

export interface ProductImages {
  primary: string;
  secondary: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  productType: string;
  description: string;
  priceFormatted: string;
  price: number;
  compareAtPriceFormatted: string | null;
  compareAtPrice: number | null;
  discountPercent: string | null;
  rating: number;
  reviewCount: number;
  url: string;
  images: ProductImages;
}

export const products: Product[] = productsData as Product[];

export const getProductByHandle = (handle: string): Product | undefined => {
  return products.find((p) => p.handle === handle);
};

export const getPopularProducts = (limit = 4): Product[] => {
  return products.slice(0, limit);
};

export const getOnSaleProducts = (): Product[] => {
  return products.filter((p) => p.discountPercent !== null);
};

export default products;
