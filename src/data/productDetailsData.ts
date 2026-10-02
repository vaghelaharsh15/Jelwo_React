import productsJson from './products.json';
import { ALL_PRODUCTS, type ProductItem } from './productsData';

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: string;
  rawPrice: number;
  compareAtPrice: string | null;
  rawComparePrice: number | null;
  image: string;
  available: boolean;
  sku: string;
}

export interface ProductDetailInfo {
  id: string;
  handle: string;
  title: string;
  category: string;
  price: string;
  rawPrice: number;
  oldPrice: string | null;
  rawOldPrice: number | null;
  discount: string | null;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  sku: string;
  shortDescription: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  variants: ProductVariant[];
  specifications: string;
  material: string;
  wearing: string;
  washingInstructions: {
    iron: string;
    bleach: string;
    dryClean: string;
  };
  additionalInfo: {
    label: string;
    value: string;
  }[];
  returnPolicyText: string;
}

// Master detailed data for Rose Gold Rings (exact match to user HTML & Screenshots)
export const ROSE_GOLD_RINGS_DETAIL: ProductDetailInfo = {
  id: '7954700664969',
  handle: 'rose-gold-rings',
  title: 'Rose gold rings',
  category: 'Rings',
  price: 'Rs. 22.00',
  rawPrice: 22,
  oldPrice: 'Rs. 40.00',
  rawOldPrice: 40,
  discount: 'Sale 45%',
  rating: 5.0,
  reviewsCount: 1,
  inStock: true,
  stockCount: 15,
  sku: '445',
  shortDescription: 'Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.',
  images: [
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-56.jpg?v=1741670785',
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-57.jpg?v=1741670785',
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-58.jpg?v=1741670785',
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-59.jpg?v=1741670785',
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-60.jpg?v=1741670785'
  ],
  sizes: ['28', '29', '30'],
  colors: [
    { name: 'Gold', hex: '#d49a06' },
    { name: 'Beige', hex: '#ead8ab' },
    { name: 'Silver', hex: '#d3d3d3' }
  ],
  variants: [
    {
      id: '43242070638729',
      size: '28',
      color: 'Gold',
      price: 'Rs. 22.00',
      rawPrice: 22,
      compareAtPrice: 'Rs. 40.00',
      rawComparePrice: 40,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-56.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070671497',
      size: '28',
      color: 'Beige',
      price: 'Rs. 22.00',
      rawPrice: 22,
      compareAtPrice: 'Rs. 40.00',
      rawComparePrice: 40,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-56.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070704265',
      size: '28',
      color: 'Silver',
      price: 'Rs. 22.00',
      rawPrice: 22,
      compareAtPrice: 'Rs. 40.00',
      rawComparePrice: 40,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-56.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070769801',
      size: '29',
      color: 'Gold',
      price: 'Rs. 25.00',
      rawPrice: 25,
      compareAtPrice: 'Rs. 45.00',
      rawComparePrice: 45,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-60.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070802569',
      size: '29',
      color: 'Beige',
      price: 'Rs. 25.00',
      rawPrice: 25,
      compareAtPrice: 'Rs. 45.00',
      rawComparePrice: 45,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-60.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070835337',
      size: '29',
      color: 'Silver',
      price: 'Rs. 25.00',
      rawPrice: 25,
      compareAtPrice: 'Rs. 45.00',
      rawComparePrice: 45,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-60.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070900873',
      size: '30',
      color: 'Gold',
      price: 'Rs. 28.00',
      rawPrice: 28,
      compareAtPrice: 'Rs. 48.00',
      rawComparePrice: 48,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-58.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070933641',
      size: '30',
      color: 'Beige',
      price: 'Rs. 28.00',
      rawPrice: 28,
      compareAtPrice: 'Rs. 48.00',
      rawComparePrice: 48,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-58.jpg?v=1741670785',
      available: true,
      sku: '445'
    },
    {
      id: '43242070966409',
      size: '30',
      color: 'Silver',
      price: 'Rs. 28.00',
      rawPrice: 28,
      compareAtPrice: 'Rs. 48.00',
      rawComparePrice: 48,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-58.jpg?v=1741670785',
      available: true,
      sku: '445'
    }
  ],
  specifications: 'Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.',
  material: "The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.",
  wearing: 'Model is 1.84 m wearing Size M',
  washingInstructions: {
    iron: 'Iron maximum 100°C.',
    bleach: 'Do not bleach/bleach.',
    dryClean: 'Do not dry clean.'
  },
  additionalInfo: [
    { label: 'Metal Purity', value: '18K Rose Gold (Hallmarked 750)' },
    { label: 'Diamond Setting', value: 'Pavé-set natural conflict-free diamonds' },
    { label: 'Total Carat Weight', value: '0.35 ct TW' },
    { label: 'Band Width', value: '2.4 mm' },
    { label: 'Certificate', value: 'IGI / GIA Authenticity Certificate Included' },
    { label: 'Origin', value: 'Handcrafted in Antwerp & Jaipur' }
  ],
  returnPolicyText: 'We offer an easy 45-day return policy. If you are not completely satisfied with your purchase, you may return the item in its original condition within 45 days for a full refund or exchange. Insured doorstep pickup is arranged at no extra cost.'
};

// Function to find or build product detail for any product in the store
export function getProductDetail(identifier: string | null | undefined): ProductDetailInfo {
  if (!identifier) {
    return ROSE_GOLD_RINGS_DETAIL;
  }

  let cleanId = identifier.trim().toLowerCase();

  // Known aliases and dropdown slugs mapping to canonical product handles
  const ALIAS_MAP: Record<string, string> = {
    'simple-pearl-earrings': 'pearl-earrings',
    'gold-nose-pin': 'flower-nose-pin',
    'lamond-rashmi-ring': 'iamond-rashmi-ring',
    'glitter-diamond-studs': 'drop-earrings',
    'glitter-diamond-ring': 'diamond-rings',
    'chandelier-earrings': 'flower-jhumka',
    'classic-gold-bangle': 'floral-gold-bangle',
    'diamond-charm-bracelet': 'modish-bracelet',
    'minimalist-open-cuff': 'twister-bangle',
    'diamond-rashmi-necklace': 'flower-pendant',
    'rose-gold-pendant': 'flower-pendant',
    'gold-chain-pendant': 'flower-pendant',
    'floral-emerald-pendant': 'flower-pendant',
    'solitaire-charm-pendant': 'flower-pendant',
    'new-jewelry-sale': 'rose-gold-rings',
    'prod-1': 'iamond-rashmi-ring',
    'prod-2': 'rose-gold-rings',
    'prod-3': 'flower-nose-pin',
    'prod-4': 'pearl-earrings',
    'prod-5': 'flower-pendant',
    'prod-6': 'sherbi-ring',
    'prod-7': 'floral-gold-bangle',
    'prod-8': 'twister-bangle',
    'prod-9': 'diamond-rings',
    'prod-10': 'modish-bracelet',
    'prod-11': 'drop-earrings',
    'prod-12': 'flower-jhumka'
  };

  if (ALIAS_MAP[cleanId]) {
    cleanId = ALIAS_MAP[cleanId];
  }

  // If it's rose gold rings
  if (
    cleanId === 'rose-gold-rings' ||
    cleanId === '7954700664969' ||
    cleanId.includes('rose-gold')
  ) {
    return ROSE_GOLD_RINGS_DETAIL;
  }

  // Check products.json first
  const foundJson = productsJson.find(
    (p) =>
      p.handle.toLowerCase() === cleanId ||
      p.id.toLowerCase() === cleanId ||
      p.url.toLowerCase().includes(cleanId) ||
      p.title.toLowerCase().replace(/\s+/g, '-') === cleanId ||
      cleanId.includes(p.handle.toLowerCase())
  );

  if (foundJson) {
    // Generate gallery images using primary & secondary images of this exact product
    const prim = foundJson.images.primary;
    const sec = foundJson.images.secondary || prim;

    const gallery: string[] = [
      prim,
      sec,
      prim.includes('&width=') ? prim.replace(/&width=\d+/, '&width=900') : `${prim}&view=zoom1`,
      sec.includes('&width=') ? sec.replace(/&width=\d+/, '&width=900') : `${sec}&view=zoom2`,
      prim.includes('&width=') ? prim.replace(/&width=\d+/, '&width=1080') : `${prim}&view=macro`
    ];

    const basePriceNum = foundJson.price || 22;
    const baseComparePrice = foundJson.compareAtPrice || Math.round(basePriceNum * 1.6);
    const discountText = foundJson.discountPercent ? `Sale ${foundJson.discountPercent}` : 'Sale 25%';

    // Determine category and tailored sizing
    const titleLower = foundJson.title.toLowerCase();
    let category = 'Jewelry';
    let sizes = ['28', '29', '30'];
    let additionalInfo = [...ROSE_GOLD_RINGS_DETAIL.additionalInfo];

    if (titleLower.includes('bangle') || titleLower.includes('bracelet')) {
      category = 'Bracelets';
      sizes = ['6.5"', '7.0"', '7.5"'];
      additionalInfo = [
        { label: 'Metal Purity', value: '18K Yellow / Rose Gold (Hallmarked 750)' },
        { label: 'Closure Type', value: 'Safety Push Clasp with Security Latch' },
        { label: 'Wrist Circumference', value: '16.5 cm - 19 cm (Adjustable)' },
        { label: 'Total Weight', value: '12.4 grams' },
        { label: 'Certificate', value: 'IGI / GIA Authenticity Certificate Included' },
        { label: 'Origin', value: 'Handcrafted in Jaipur & Milan' }
      ];
    } else if (titleLower.includes('earring') || titleLower.includes('jhumka')) {
      category = 'Earrings';
      sizes = ['Standard'];
      additionalInfo = [
        { label: 'Metal Purity', value: '18K Gold Plated / Hallmarked 750' },
        { label: 'Earring Type', value: 'Drop / Dangle with Secure Butterfly Back' },
        { label: 'Gemstone', value: 'Cultured Freshwater Pearls & Pavé Cubic Zirconia' },
        { label: 'Drop Length', value: '38 mm' },
        { label: 'Certificate', value: 'Jelwo Certificate of Authenticity' },
        { label: 'Origin', value: 'Handcrafted in Antwerp & Jaipur' }
      ];
    } else if (titleLower.includes('pendant') || titleLower.includes('necklace')) {
      category = 'Necklace';
      sizes = ['16"', '18"', '20"'];
      additionalInfo = [
        { label: 'Metal Purity', value: '18K Rose Gold (Hallmarked 750)' },
        { label: 'Chain Type', value: 'Diamond-cut cable chain with spring ring' },
        { label: 'Pendant Dimensions', value: '18 mm x 14 mm' },
        { label: 'Total Weight', value: '4.8 grams' },
        { label: 'Certificate', value: 'IGI Authenticity Certificate Included' },
        { label: 'Origin', value: 'Handcrafted in Antwerp' }
      ];
    } else if (titleLower.includes('nose-pin') || titleLower.includes('nose pin')) {
      category = 'Nose Pin';
      sizes = ['Standard'];
      additionalInfo = [
        { label: 'Metal Purity', value: '22K Solid Yellow Gold (Hallmarked 916)' },
        { label: 'Pin Type', value: 'Twist Wire / Screw Post' },
        { label: 'Stone', value: 'Natural Conflict-Free Diamond' },
        { label: 'Total Weight', value: '0.85 grams' },
        { label: 'Certificate', value: 'Jelwo Hallmarked Guarantee' },
        { label: 'Origin', value: 'Handcrafted in Jaipur' }
      ];
    } else {
      category = 'Rings';
      sizes = ['28', '29', '30'];
      additionalInfo = [
        { label: 'Metal Purity', value: '18K Gold (Hallmarked 750)' },
        { label: 'Diamond Setting', value: 'Pavé-set natural conflict-free diamonds' },
        { label: 'Band Width', value: '2.4 mm' },
        { label: 'Ring Size Range', value: 'US 5 to US 9 available' },
        { label: 'Certificate', value: 'IGI / GIA Authenticity Certificate Included' },
        { label: 'Origin', value: 'Handcrafted in Antwerp & Jaipur' }
      ];
    }

    const primaryColor = titleLower.includes('rose')
      ? 'Rose Gold'
      : titleLower.includes('silver')
      ? 'Silver'
      : 'Gold';

    const colors = [
      { name: primaryColor, hex: primaryColor === 'Rose Gold' ? '#b76e79' : '#d49a06' },
      { name: 'Beige', hex: '#ead8ab' },
      { name: 'Silver', hex: '#d3d3d3' }
    ];

    return {
      id: foundJson.id,
      handle: foundJson.handle,
      title: foundJson.title,
      category,
      price: foundJson.priceFormatted || `Rs. ${basePriceNum}.00`,
      rawPrice: basePriceNum,
      oldPrice: foundJson.compareAtPriceFormatted || `Rs. ${baseComparePrice}.00`,
      rawOldPrice: baseComparePrice,
      discount: discountText,
      rating: foundJson.rating > 0 ? foundJson.rating : 5.0,
      reviewsCount: foundJson.reviewCount > 0 ? foundJson.reviewCount : 1,
      inStock: true,
      stockCount: 15,
      sku: `JLW-${foundJson.id.slice(-4)}`,
      shortDescription: foundJson.description || ROSE_GOLD_RINGS_DETAIL.shortDescription,
      images: gallery,
      sizes,
      colors,
      variants: sizes.map((s, idx) => ({
        id: `${foundJson.id}-${idx + 1}`,
        size: s,
        color: primaryColor,
        price: `Rs. ${basePriceNum + idx * 3}.00`,
        rawPrice: basePriceNum + idx * 3,
        compareAtPrice: `Rs. ${baseComparePrice + idx * 5}.00`,
        rawComparePrice: baseComparePrice + idx * 5,
        image: gallery[idx % gallery.length],
        available: true,
        sku: `JLW-${foundJson.id.slice(-4)}-${s}`
      })),
      specifications: foundJson.description || ROSE_GOLD_RINGS_DETAIL.specifications,
      material: ROSE_GOLD_RINGS_DETAIL.material,
      wearing: ROSE_GOLD_RINGS_DETAIL.wearing,
      washingInstructions: ROSE_GOLD_RINGS_DETAIL.washingInstructions,
      additionalInfo,
      returnPolicyText: ROSE_GOLD_RINGS_DETAIL.returnPolicyText
    };
  }

  // Check ALL_PRODUCTS from productsData.ts
  const foundData = ALL_PRODUCTS.find(
    (p: ProductItem) =>
      p.id.toLowerCase() === cleanId ||
      p.title.toLowerCase().replace(/\s+/g, '-') === cleanId ||
      cleanId.includes(p.title.toLowerCase().replace(/\s+/g, '-'))
  );

  if (foundData) {
    const gallery = [
      foundData.image,
      foundData.hoverImage || foundData.image,
      'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-58.jpg?v=1741670785',
      'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-59.jpg?v=1741670785',
      'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-60.jpg?v=1741670785'
    ];

    const basePriceNum = foundData.rawPrice || 22;
    const baseComparePrice = Math.round(basePriceNum * 1.5);

    return {
      id: foundData.id,
      handle: foundData.title.toLowerCase().replace(/\s+/g, '-'),
      title: foundData.title,
      category: foundData.category,
      price: foundData.price,
      rawPrice: basePriceNum,
      oldPrice: foundData.oldPrice || `Rs. ${baseComparePrice}.00`,
      rawOldPrice: baseComparePrice,
      discount: foundData.discount ? `Sale ${foundData.discount}` : 'Sale 30%',
      rating: foundData.rating > 0 ? foundData.rating : 5.0,
      reviewsCount: foundData.reviewsCount > 0 ? foundData.reviewsCount : 1,
      inStock: foundData.inStock,
      stockCount: 15,
      sku: '445',
      shortDescription: ROSE_GOLD_RINGS_DETAIL.shortDescription,
      images: gallery,
      sizes: ['28', '29', '30'],
      colors: [
        { name: 'Gold', hex: '#d49a06' },
        { name: 'Beige', hex: '#ead8ab' },
        { name: 'Silver', hex: '#d3d3d3' }
      ],
      variants: [
        {
          id: `${foundData.id}-1`,
          size: '28',
          color: 'Gold',
          price: `Rs. ${basePriceNum}.00`,
          rawPrice: basePriceNum,
          compareAtPrice: `Rs. ${baseComparePrice}.00`,
          rawComparePrice: baseComparePrice,
          image: gallery[0],
          available: true,
          sku: '445'
        },
        {
          id: `${foundData.id}-2`,
          size: '29',
          color: 'Gold',
          price: `Rs. ${basePriceNum + 3}.00`,
          rawPrice: basePriceNum + 3,
          compareAtPrice: `Rs. ${baseComparePrice + 5}.00`,
          rawComparePrice: baseComparePrice + 5,
          image: gallery[1],
          available: true,
          sku: '445'
        },
        {
          id: `${foundData.id}-3`,
          size: '30',
          color: 'Gold',
          price: `Rs. ${basePriceNum + 6}.00`,
          rawPrice: basePriceNum + 6,
          compareAtPrice: `Rs. ${baseComparePrice + 8}.00`,
          rawComparePrice: baseComparePrice + 8,
          image: gallery[2],
          available: true,
          sku: '445'
        }
      ],
      specifications: ROSE_GOLD_RINGS_DETAIL.specifications,
      material: ROSE_GOLD_RINGS_DETAIL.material,
      wearing: ROSE_GOLD_RINGS_DETAIL.wearing,
      washingInstructions: ROSE_GOLD_RINGS_DETAIL.washingInstructions,
      additionalInfo: ROSE_GOLD_RINGS_DETAIL.additionalInfo,
      returnPolicyText: ROSE_GOLD_RINGS_DETAIL.returnPolicyText
    };
  }

  // Fallback to Rose Gold Rings
  return ROSE_GOLD_RINGS_DETAIL;
}
