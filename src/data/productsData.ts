export interface ProductItem {
  id: string;
  title: string;
  category: string;
  categories: string[];
  discount: string | null;
  price: string;
  rawPrice: number;
  oldPrice: string | null;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage?: string;
  inStock: boolean;
  color: string;
}

export interface CategoryFilterItem {
  id: string;
  title: string;
  count: number;
}

export interface ColorFilterItem {
  name: string;
  hex: string;
  count: number;
}

export interface SpecialProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

export const PRODUCTS_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

export const TOP_PROMO_BANNER = {
  image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-4-collection-banner.jpg?v=1742641202&width=1920',
  discountText: 'DISCOUNT UP TO 30% OFF',
  title: 'New arrival just for you',
  description: 'Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.'
};

export const SIDEBAR_PROMO_BANNER = {
  image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-4-collection-side-banner.jpg?v=1742637512&width=500',
  title: 'Meet our new collection',
  subtitle: 'BEAUTY & ELEGANCE',
  badge: '30% OFF'
};

export const SPECIAL_PRODUCTS: SpecialProductItem[] = [
  {
    id: 'special-1',
    title: 'FLOWER PENDANT',
    price: 'Rs. 22.00',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-11.jpg?v=1741605562&width=150'
  },
  {
    id: 'special-2',
    title: 'DIAMOND RINGS',
    price: 'Rs. 10.00',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-26.jpg?v=1741608272&width=150'
  }
];

export const CATEGORIES_LIST: CategoryFilterItem[] = [
  { id: '14k-58-3', title: '14K, 58.3%', count: 12 },
  { id: '18k-75-0', title: '18K, 75.0%', count: 12 },
  { id: '22k-91-7', title: '22K, 91.7%', count: 12 },
  { id: '24k-99-9', title: '24K, 99.9%', count: 12 },
  { id: 'bangles', title: 'Bangles', count: 12 },
  { id: 'best-seller', title: 'Best seller', count: 12 },
  { id: 'bracelets', title: 'Bracelets', count: 12 },
  { id: 'brooch', title: 'Brooch', count: 12 },
  { id: 'chain', title: 'Chain', count: 12 },
  { id: 'diamond', title: 'Diamond', count: 10 },
  { id: 'diamonds', title: 'Diamonds', count: 10 },
  { id: 'earring', title: 'Earring', count: 12 },
  { id: 'earrings', title: 'Earrings', count: 10 },
  { id: 'gold', title: 'Gold', count: 12 },
  { id: 'jewelry', title: 'Jewelry', count: 12 },
  { id: 'meenakari', title: 'Meenakari', count: 8 },
  { id: 'necklace', title: 'Necklace', count: 12 },
  { id: 'necklaces', title: 'Necklaces', count: 12 },
  { id: 'new-product', title: 'New product', count: 12 },
  { id: 'nose-pins', title: 'Nose pins', count: 12 },
  { id: 'pendant', title: 'Pendant', count: 8 },
  { id: 'pendants', title: 'Pendants', count: 12 },
  { id: 'platinum-ring', title: 'Platinum ring', count: 12 },
  { id: 'rings', title: 'Rings', count: 12 },
  { id: 'rose-gold', title: 'Rose gold', count: 12 },
  { id: 'trending-product', title: 'Trending product', count: 12 }
];

export function resolveCategoryTitle(identifier: string | null | undefined): string | null {
  if (!identifier) return null;
  const clean = identifier
    .trim()
    .toLowerCase()
    .replace(/^\/collections\//, '')
    .replace(/\/$/, '');

  if (clean === 'all' || clean === '') return null;

  // Specific aliases from collections to category titles
  if (clean === 'diamond-1' || clean === 'diamonds') {
    return 'Diamonds';
  }
  if (clean === 'earrings' || clean === 'earring') {
    return 'Earrings';
  }
  if (clean === 'necklaces' || clean === 'necklace') {
    return 'Necklaces';
  }
  if (clean === 'pendants' || clean === 'pendant') {
    return 'Pendants';
  }

  // Exact ID or Title match
  const directMatch = CATEGORIES_LIST.find(
    (c) => c.id.toLowerCase() === clean || c.title.toLowerCase() === clean
  );
  if (directMatch) return directMatch.title;

  // Normalized alphanumeric match
  const normalizedClean = clean.replace(/[^a-z0-9]/g, '');
  const fuzzyMatch = CATEGORIES_LIST.find(
    (c) =>
      c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedClean ||
      c.title.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedClean
  );
  if (fuzzyMatch) return fuzzyMatch.title;

  return null;
}

export const COLORS_LIST: ColorFilterItem[] = [
  { name: 'Beige', hex: '#E1C699', count: 11 },
  { name: 'Bronze', hex: '#CD7F32', count: 3 },
  { name: 'Brown', hex: '#8B4513', count: 13 },
  { name: 'Gold', hex: '#DAA520', count: 24 },
  { name: 'Orange', hex: '#FF7F00', count: 6 },
  { name: 'Rose gold', hex: '#B76E79', count: 2 },
  { name: 'Silver', hex: '#C0C0C0', count: 6 }
];

export const ALL_PRODUCTS: ProductItem[] = [
  // Page 1 Products (Exact sequence from screenshots 2 to 5)
  {
    id: 'prod-1',
    title: 'BLOSSOM DIAMOND BANGLE',
    category: 'Bangles',
    categories: ["Bangles","Bracelets","Diamond","Diamonds","Gold","14K, 58.3%","18K, 75.0%","Best seller","New product","Trending product","Jewelry"],
    discount: '20%',
    price: 'Rs. 28.00',
    rawPrice: 28,
    oldPrice: 'Rs. 35.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-16.jpg?v=1742443575&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-17.jpg?v=1742443575&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-2',
    title: 'CHIC DIAMOND RING',
    category: 'Rings',
    categories: ["Rings","Diamond","Diamonds","Gold","Platinum ring","18K, 75.0%","22K, 91.7%","Best seller","Trending product","Jewelry"],
    discount: '45%',
    price: 'From Rs. 22.00',
    rawPrice: 22,
    oldPrice: 'Rs. 40.00',
    rating: 4.33,
    reviewsCount: 3,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-56.jpg?v=1742445682&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-57.jpg?v=1742445682&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-3',
    title: 'CLUSTER DIAMOND RING',
    category: 'Rings',
    categories: ["Rings","Diamond","Diamonds","Gold","14K, 58.3%","22K, 91.7%","Best seller","New product","Jewelry"],
    discount: '13%',
    price: 'Rs. 26.00',
    rawPrice: 26,
    oldPrice: 'Rs. 30.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-1.jpg?v=1742443985&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-2.jpg?v=1742443985&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-4',
    title: 'CLUSTER DIAMOND RING',
    category: 'Rings',
    categories: ["Rings","Diamond","Diamonds","Gold","18K, 75.0%","24K, 99.9%","Trending product","Best seller","Jewelry"],
    discount: null,
    price: 'From Rs. 12.00',
    rawPrice: 12,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-36.jpg?v=1742444776&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-37.jpg?v=1742444776&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-5',
    title: 'DIAMOND RINGS',
    category: 'Rings',
    categories: ["Rings","Diamond","Diamonds","Gold","14K, 58.3%","24K, 99.9%","Best seller","Trending product","Jewelry"],
    discount: null,
    price: 'From Rs. 10.00',
    rawPrice: 10,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-26.jpg?v=1741608272&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-27.jpg?v=1741608271&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-6',
    title: 'DROP EARRINGS',
    category: 'Earrings',
    categories: ["Earrings","Earring","Gold","14K, 58.3%","18K, 75.0%","Best seller","Trending product","Jewelry"],
    discount: '66%',
    price: 'From Rs. 15.00',
    rawPrice: 15,
    oldPrice: 'Rs. 44.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-46.jpg?v=1741668328&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-47.jpg?v=1741668328&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-7',
    title: 'DROP GOLD EARRINGS',
    category: 'Earrings',
    categories: ["Earrings","Earring","Gold","18K, 75.0%","22K, 91.7%","New product","Best seller","Jewelry"],
    discount: '68%',
    price: 'From Rs. 14.00',
    rawPrice: 14,
    oldPrice: 'Rs. 44.00',
    rating: 4.0,
    reviewsCount: 1,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-46.jpg?v=1742445430&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-47.jpg?v=1742445430&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-8',
    title: 'FLORA DIAMOND BANGLE',
    category: 'Bangles',
    categories: ["Bangles","Bracelets","Diamond","Diamonds","Gold","22K, 91.7%","24K, 99.9%","Trending product","Best seller","Jewelry"],
    discount: null,
    price: 'Rs. 28.00',
    rawPrice: 28,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-31.jpg?v=1742444512&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-32.jpg?v=1742444512&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-9',
    title: 'FLORAL GOLD BANGLE',
    category: 'Bangles',
    categories: ["Bangles","Bracelets","Gold","Meenakari","14K, 58.3%","24K, 99.9%","Best seller","New product","Jewelry"],
    discount: null,
    price: 'Rs. 28.00',
    rawPrice: 28,
    oldPrice: null,
    rating: 4.0,
    reviewsCount: 2,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-31.jpg?v=1741665663&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-32.jpg?v=1741665663&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-10',
    title: 'FLOWER JHUMKA',
    category: 'Earrings',
    categories: ["Earrings","Earring","Gold","Meenakari","14K, 58.3%","18K, 75.0%","Best seller","Trending product","Jewelry"],
    discount: '64%',
    price: 'Rs. 18.00',
    rawPrice: 18,
    oldPrice: 'Rs. 50.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-51.jpg?v=1741668863&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-52.jpg?v=1741668863&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-11',
    title: 'FLOWER NOSE PIN',
    category: 'Nose pins',
    categories: ["Nose pins","Brooch","Gold","18K, 75.0%","22K, 91.7%","New product","Best seller","Jewelry"],
    discount: null,
    price: 'Rs. 12.00',
    rawPrice: 12,
    oldPrice: null,
    rating: 4.33,
    reviewsCount: 3,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-21.jpg?v=1741607520&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-22.jpg?v=1741607520&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-12',
    title: 'FLOWER PENDANT',
    category: 'Pendants',
    categories: ["Pendant","Pendants","Necklace","Necklaces","Chain","Gold","Meenakari","22K, 91.7%","24K, 99.9%","Trending product","Jewelry"],
    discount: null,
    price: 'Rs. 22.00',
    rawPrice: 22,
    oldPrice: null,
    rating: 3.0,
    reviewsCount: 1,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-11.jpg?v=1741605562&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-12.jpg?v=1741605562&width=720',
    inStock: true,
    color: 'Gold'
  },

  // Page 2 Products (Items 13 to 24)
  {
    id: 'prod-13',
    title: 'FRAMED GOLD PENDANT',
    category: 'Pendants',
    categories: ["Pendant","Pendants","Necklace","Necklaces","Chain","Gold","14K, 58.3%","24K, 99.9%","New product","Best seller","Jewelry"],
    discount: null,
    price: 'Rs. 22.00',
    rawPrice: 22,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-6.jpg?v=1742442751&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-7.jpg?v=1742442751&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-14',
    title: 'GEMSTONE CHAIN BRACELET',
    category: 'Bracelets',
    categories: ["Bracelets","Bangles","Chain","Meenakari","14K, 58.3%","18K, 75.0%","Best seller","Trending product","Jewelry"],
    discount: '56%',
    price: 'From Rs. 17.00',
    rawPrice: 17,
    oldPrice: 'Rs. 39.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-26.jpg?v=1742444221&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-27.jpg?v=1742444221&width=720',
    inStock: true,
    color: 'Bronze'
  },
  {
    id: 'prod-15',
    title: 'GEMSTONE JHUMKAS',
    category: 'Earrings',
    categories: ["Earrings","Earring","Gold","Meenakari","18K, 75.0%","22K, 91.7%","Trending product","Best seller","Jewelry"],
    discount: '64%',
    price: 'Rs. 18.00',
    rawPrice: 18,
    oldPrice: 'Rs. 50.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-21.jpg?v=1742443763&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-22.jpg?v=1742443763&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-16',
    title: 'GLITTER DIAMOND RING',
    category: 'Rings',
    categories: ["Rings","Platinum ring","Diamond","Diamonds","22K, 91.7%","24K, 99.9%","New product","Trending product","Jewelry"],
    discount: null,
    price: 'From Rs. 10.00',
    rawPrice: 10,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-52.jpg?v=1742445540&width=720',
    inStock: true,
    color: 'Silver'
  },
  {
    id: 'prod-17',
    title: 'GOLD NOSE PIN',
    category: 'Nose pins',
    categories: ["Nose pins","Brooch","Gold","14K, 58.3%","24K, 99.9%","Trending product","Best seller","Jewelry"],
    discount: null,
    price: 'Rs. 12.00',
    rawPrice: 12,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-41.jpg?v=1742444936&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-42.jpg?v=1742444936&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-18',
    title: 'IAMOND RASHMI RING',
    category: 'Rings',
    categories: ["Rings","Rose gold","Diamond","Diamonds","14K, 58.3%","18K, 75.0%","Best seller","Trending product","Jewelry"],
    discount: null,
    price: 'From Rs. 12.00',
    rawPrice: 12,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-11.jpg?v=1742443330&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-13.jpg?v=1742443330&width=720',
    inStock: true,
    color: 'Rose gold'
  },
  {
    id: 'prod-19',
    title: 'MODISH BRACELET',
    category: 'Bracelets',
    categories: ["Bracelets","Bangles","Chain","18K, 75.0%","22K, 91.7%","Best seller","Trending product","Jewelry"],
    discount: '56%',
    price: 'From Rs. 17.00',
    rawPrice: 17,
    oldPrice: 'Rs. 39.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-31.jpg?v=1742444512&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-32.jpg?v=1742444512&width=720',
    inStock: true,
    color: 'Brown'
  },
  {
    id: 'prod-20',
    title: 'PEARL EARRINGS',
    category: 'Earrings',
    categories: ["Earrings","Earring","Necklace","Necklaces","22K, 91.7%","24K, 99.9%","New product","Trending product","Jewelry"],
    discount: '25%',
    price: 'Rs. 15.00',
    rawPrice: 15,
    oldPrice: 'Rs. 20.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-46.jpg?v=1742445430&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-47.jpg?v=1742445430&width=720',
    inStock: true,
    color: 'Beige'
  },
  {
    id: 'prod-21',
    title: 'ROSE GOLD RINGS',
    category: 'Rings',
    categories: ["Rings","Rose gold","14K, 58.3%","24K, 99.9%","Best seller","Trending product","Jewelry"],
    discount: '45%',
    price: 'From Rs. 22.00',
    rawPrice: 22,
    oldPrice: 'Rs. 40.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-36.jpg?v=1742444776&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-37.jpg?v=1742444776&width=720',
    inStock: true,
    color: 'Rose gold'
  },
  {
    id: 'prod-22',
    title: 'SHERBI RING',
    category: 'Rings',
    categories: ["Rings","Gold","Meenakari","14K, 58.3%","18K, 75.0%","New product","Best seller","Jewelry"],
    discount: '13%',
    price: 'Rs. 26.00',
    rawPrice: 26,
    oldPrice: 'Rs. 30.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-1.jpg?v=1742443985&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-2.jpg?v=1742443985&width=720',
    inStock: true,
    color: 'Gold'
  },
  {
    id: 'prod-23',
    title: 'SIMPLE PEARL EARRINGS',
    category: 'Earrings',
    categories: ["Earrings","Earring","Necklace","Necklaces","18K, 75.0%","22K, 91.7%","Best seller","Trending product","Jewelry"],
    discount: '25%',
    price: 'Rs. 15.00',
    rawPrice: 15,
    oldPrice: 'Rs. 20.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-56.jpg?v=1742445682&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-57.jpg?v=1742445682&width=720',
    inStock: true,
    color: 'Beige'
  },
  {
    id: 'prod-24',
    title: 'TWISTER BANGLE',
    category: 'Bangles',
    categories: ["Bangles","Bracelets","Gold","22K, 91.7%","24K, 99.9%","Trending product","Best seller","Jewelry"],
    discount: '20%',
    price: 'Rs. 28.00',
    rawPrice: 28,
    oldPrice: 'Rs. 35.00',
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-16.jpg?v=1742443575&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-17.jpg?v=1742443575&width=720',
    inStock: false,
    color: 'Gold'
  }
];
