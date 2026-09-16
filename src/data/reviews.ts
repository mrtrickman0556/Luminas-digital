import { CustomerReview } from '../types';

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-fin-free',
    authorName: 'Alex Rivera',
    authorRole: '23, Freelance Web Designer',
    rating: 5,
    date: '3 days ago',
    comment: 'Most finance books talk down to young people and pretend we can buy houses with clipped coupons. "How to Be Financially Free at a Young Age" actually showed me how to organize my sporadic freelance income and automate broad-market investing without getting overwhelmed by jargon.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-ai-mega',
    authorName: 'Marcus Chen',
    authorRole: 'Solopreneur & Creator',
    rating: 5,
    date: '1 week ago',
    comment: 'The AI Creator Mega-Pack is gold. I was wasting hours prompting ChatGPT and getting robotic answers. The system prompts and variable brackets in this vault saved me 10+ hours on client newsletter research last week alone.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-notion-os',
    authorName: 'Elena Rostova',
    authorRole: 'Design Student & Freelancer',
    rating: 5,
    date: '2 weeks ago',
    comment: 'I tried 5 different Notion templates before this one and stopped using all of them because they were way too cluttered. The Lumina OS is clean, fast, and the mobile quick capture widget actually works.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-freelance-kit',
    authorName: 'Jordan Taylor',
    authorRole: 'Video Editor & Agency Founder',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The Master Services Agreement and proposal deck paid for itself on my first client pitch. The client even remarked that our onboarding process felt like an established enterprise agency.',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    productId: 'prod-student-study-os',
    authorName: 'Sophia Miller',
    authorRole: 'Pre-Med Student',
    rating: 5,
    date: '1 month ago',
    comment: 'The active recall and spaced repetition databases completely revamped how I prep for biology exams. I stopped rereading highlighters and actually test my recall every Sunday.',
    verifiedPurchase: true
  },
  {
    id: 'rev-6',
    productId: 'prod-landing-copy',
    authorName: 'Devon Vance',
    authorRole: 'Indie Hacker & Product Maker',
    rating: 5,
    date: '1 month ago',
    comment: 'The section wireframes and objection-handling copy formulas helped me rewrite my SaaS landing page in an afternoon. Clear, concise, and zero fluff.',
    verifiedPurchase: true
  }
];
