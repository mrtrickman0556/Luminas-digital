export type ProductCategory =
  | 'E-books'
  | 'AI Prompts'
  | 'Prompt Packs'
  | 'Templates'
  | 'Guides'
  | 'Productivity'
  | 'Business'
  | 'Creator Resources'
  | 'Study Resources'
  | 'Marketing Resources';

export type ProductFormat = 'PDF' | 'ePub' | 'Notion Template' | 'Prompt Vault (JSON/TXT)' | 'Spreadsheet (XLSX/Sheets)' | 'Figma Kit' | 'Bundle (ZIP)';

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  tags: string[];
  format: ProductFormat;
  pagesOrCount: string; // e.g. "184 Pages" or "1,200+ Prompts" or "12 Notion Databases"
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewRelease?: boolean;
  isFeatured?: boolean;
  coverGradient: {
    from: string;
    to: string;
    accent: string;
  };
  whatsIncluded: string[];
  whoItsFor: string[];
  keyBenefits: string[];
  features: string[];
  fileSize?: string;
  downloadFilename: string;
  downloadContent?: string; // Content simulated for download file
  // AI Prompt specific fields
  aiDetails?: {
    promptCount: number;
    categoriesIncluded: string[];
    examplePrompts: {
      category: string;
      title: string;
      prompt: string;
      variables?: string[];
      outputPreview?: string;
    }[];
    compatibleTools: string[];
    usageInstructions: string[];
  };
  // E-book specific fields
  ebookDetails?: {
    pages: number;
    tableOfContents: string[];
    sampleChapterTitle: string;
    sampleChapterContent: string;
    authorHandle?: string;
    pdfPages?: {
      pageNumber: number;
      title: string;
      subtitle?: string;
      cards?: {
        title?: string;
        text?: string;
        bullets?: string[];
        badge?: string;
        callout?: string;
      }[];
    }[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  format: ProductFormat;
  downloadFilename: string;
  downloadContent?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'card' | 'paypal' | 'razorpay' | 'apple_pay';
  createdAt: string;
  accessToken: string;
  downloadCount: number;
}

export interface CustomerReview {
  id: string;
  productId?: string;
  authorName: string;
  authorRole: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g., 20 for 20% or 10 for $10
  minOrderAmount?: number;
  description: string;
  expiresAt?: string;
  usageCount: number;
}

export interface NewsletterSubscriber {
  email: string;
  date: string;
  source: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  supportEmail: string;
  creatorHandle: string;
  announcementText: string;
  enableAnnouncementBar: boolean;
  activeCouponCode: string;
  activeCouponDiscount: number;
  defaultCurrency: 'USD' | 'EUR' | 'GBP' | 'INR';
  enableInstantFulfillment: boolean;
  enableSocialProofToasts: boolean;
  enableExitIntentModal: boolean;
  taxRatePercent: number;
  testMode: boolean;
  paymentGateways: {
    card: boolean;
    paypal: boolean;
    razorpay: boolean;
    applePay: boolean;
  };
  accentTheme: 'indigo' | 'emerald' | 'blue' | 'purple';
}
