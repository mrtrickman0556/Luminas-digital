export interface OneWordPrompt {
  id: number;
  keyword: string;
  command: string;
  action: string;
  category: 'Aesthetic & Mood' | 'Photo & Lighting' | 'Social & Content Formats' | 'Fashion & Lifestyle' | 'Materials & Creative Effects';
  page: 1 | 2 | 3 | 4 | 5;
  promptTemplate: string;
  useCase: string;
  tags: string[];
}

export const EDITING_PROMPT_CATEGORIES = [
  'All Styles',
  'Aesthetic & Mood',
  'Photo & Lighting',
  'Social & Content Formats',
  'Fashion & Lifestyle',
  'Materials & Creative Effects'
] as const;

export const ONE_WORD_EDITING_PROMPTS: OneWordPrompt[] = [
  // ================= PAGE 1 =================
  {
    id: 1,
    keyword: 'Cinematic',
    command: '/Cinematic',
    action: 'Cinematic editorial lighting & color grading',
    category: 'Photo & Lighting',
    page: 1,
    promptTemplate: '/Cinematic — Transform this image into a cinematic editorial visual with dramatic lighting, depth, atmosphere, and premium color grading while preserving the subject.',
    useCase: 'Film stills, movie posters, moody photography, and YouTube thumbnails',
    tags: ['Lighting', 'Color Grading', 'Atmosphere', 'Editorial']
  },
  {
    id: 2,
    keyword: 'Luxury',
    command: '/Luxury',
    action: 'High-end composition, lighting & visual styling',
    category: 'Aesthetic & Mood',
    page: 1,
    promptTemplate: '/Luxury — Give this design a premium luxury aesthetic with elegant composition, sophisticated lighting, refined details, and high-end visual styling.',
    useCase: 'Jewelry, luxury real estate, perfume brands, and VIP invitations',
    tags: ['High-End', 'Sophisticated', 'Elegance', 'Refined']
  },
  {
    id: 3,
    keyword: 'Minimal',
    command: '/Minimal',
    action: 'Clean minimalist layout with generous whitespace',
    category: 'Aesthetic & Mood',
    page: 1,
    promptTemplate: '/Minimal — Redesign this image with a clean minimalist composition, generous whitespace, simple hierarchy, and polished modern aesthetics.',
    useCase: 'Modern websites, clean tech branding, book covers, and minimalist poster art',
    tags: ['Whitespace', 'Minimalism', 'Modern', 'Simplicity']
  },
  {
    id: 4,
    keyword: 'Vibrant',
    command: '/Vibrant',
    action: 'Energetic colors, lively contrast & crisp details',
    category: 'Aesthetic & Mood',
    page: 1,
    promptTemplate: '/Vibrant — Enhance the visual with energetic colors, lively contrast, crisp details, and a bold modern social-media look.',
    useCase: 'Social media graphics, festival flyers, Gen Z advertisements, and pop banners',
    tags: ['High Contrast', 'Color Pop', 'Social Media', 'Dynamic']
  },
  {
    id: 5,
    keyword: 'Aesthetic',
    command: '/Aesthetic',
    action: 'Balanced composition, soft atmosphere & tasteful tones',
    category: 'Aesthetic & Mood',
    page: 1,
    promptTemplate: '/Aesthetic — Create a visually pleasing aesthetic version with balanced composition, soft atmosphere, tasteful tones, and cohesive styling.',
    useCase: 'Pinterest moodboards, lifestyle blogs, Instagram feeds, and creative portfolios',
    tags: ['Atmosphere', 'Cohesive', 'Tasteful', 'Pastel Tones']
  },
  {
    id: 6,
    keyword: 'Futuristic',
    command: '/Futuristic',
    action: 'Sleek future visuals with subtle tech & glowing accents',
    category: 'Materials & Creative Effects',
    page: 1,
    promptTemplate: '/Futuristic — Transform this design into a sleek futuristic visual with subtle technology elements, glowing accents, depth, and modern composition.',
    useCase: 'AI tech startups, sci-fi concepts, crypto assets, and gaming thumbnails',
    tags: ['Tech', 'Glow', 'Sci-Fi', 'Modern']
  },
  {
    id: 7,
    keyword: 'Vintage',
    command: '/Vintage',
    action: 'Nostalgic tones, subtle texture & classic composition',
    category: 'Aesthetic & Mood',
    page: 1,
    promptTemplate: '/Vintage — Give this image a tasteful vintage-inspired appearance with nostalgic tones, subtle texture, classic composition, and authentic photographic character.',
    useCase: 'Retro apparel ads, vinyl album artwork, heritage branding, and film look',
    tags: ['Retro', 'Film Grain', 'Nostalgia', 'Classic']
  },
  {
    id: 8,
    keyword: 'Editorial',
    command: '/Editorial',
    action: 'High-fashion design with controlled lighting & hierarchy',
    category: 'Fashion & Lifestyle',
    page: 1,
    promptTemplate: '/Editorial — Turn this into a high-fashion editorial design with sophisticated composition, controlled lighting, strong hierarchy, and magazine-quality styling.',
    useCase: 'Vogue-style shoots, fashion lookbooks, magazine covers, and model portfolios',
    tags: ['High-Fashion', 'Magazine', 'Controlled Lighting', 'Art Direction']
  },
  {
    id: 9,
    keyword: 'Portrait',
    command: '/Portrait',
    action: 'Professional lighting, natural skin detail & depth of field',
    category: 'Photo & Lighting',
    page: 1,
    promptTemplate: '/Portrait — Enhance this portrait with professional lighting, natural skin detail, depth of field, and polished photographic composition.',
    useCase: 'Executive headshots, LinkedIn photos, artist bios, and character renders',
    tags: ['Headshots', 'Skin Retouch', 'Bokeh', 'Photography']
  },
  {
    id: 10,
    keyword: 'Product',
    command: '/Product',
    action: 'Studio lighting, clean background & sharp product details',
    category: 'Photo & Lighting',
    page: 1,
    promptTemplate: '/Product — Create a premium product presentation with studio lighting, clean background, realistic shadows, and sharp product details.',
    useCase: 'E-commerce mockups, Amazon listings, Shopify hero banners, and packaging renders',
    tags: ['E-Commerce', 'Studio Lighting', 'Shadows', 'Product Photography']
  },

  // ================= PAGE 2 =================
  {
    id: 11,
    keyword: 'Studio',
    command: '/Studio',
    action: 'Professional studio photograph with soft controlled lighting',
    category: 'Photo & Lighting',
    page: 2,
    promptTemplate: '/Studio — Recreate this as a professional studio photograph with soft controlled lighting, clean background, realistic shadows, and crisp details.',
    useCase: 'Clean product catalog shots, commercial studio photography, and lookbooks',
    tags: ['Softbox', 'Studio', 'Controlled Light', 'Clean Background']
  },
  {
    id: 12,
    keyword: 'Neon',
    command: '/Neon',
    action: 'Neon-inspired nightlife aesthetic with glowing accents',
    category: 'Materials & Creative Effects',
    page: 2,
    promptTemplate: '/Neon — Add a stylish neon-inspired atmosphere with glowing accents, dramatic contrast, and a modern nightlife aesthetic while keeping the subject clear.',
    useCase: 'Club posters, EDM album covers, cyberpunk night scenes, and beverage ads',
    tags: ['Nightlife', 'Neon Glow', 'High Contrast', 'Vibrant']
  },
  {
    id: 13,
    keyword: 'Cyberpunk',
    command: '/Cyberpunk',
    action: 'Futuristic urban cyberpunk environment with cinematic depth',
    category: 'Materials & Creative Effects',
    page: 2,
    promptTemplate: '/Cyberpunk — Restyle this visual with a futuristic cyberpunk atmosphere, neon environment, cinematic depth, and detailed urban mood.',
    useCase: 'Sci-fi game UI, concept art, synthwave album art, and edgy streetwear',
    tags: ['Dystopian', 'Urban Night', 'Neon', 'Depth']
  },
  {
    id: 14,
    keyword: 'Pastel',
    command: '/Pastel',
    action: 'Gentle tones, clean composition & contemporary feel',
    category: 'Aesthetic & Mood',
    page: 2,
    promptTemplate: '/Pastel — Apply a soft pastel design direction with gentle tones, clean composition, subtle contrast, and an elegant contemporary feel.',
    useCase: 'Skincare products, baby branding, bakery marketing, and spring fashion',
    tags: ['Soft Tones', 'Gentle', 'Contemporary', 'Minimal Contrast']
  },
  {
    id: 15,
    keyword: 'Monochrome',
    command: '/Monochrome',
    action: 'Sophisticated black & white with strong tonal range',
    category: 'Aesthetic & Mood',
    page: 2,
    promptTemplate: '/Monochrome — Convert this design into a sophisticated monochrome composition with strong tonal range, texture, and visual depth.',
    useCase: 'Fine art photography, architecture galleries, luxury watch ads, and editorial prints',
    tags: ['Black & White', 'Tonal Range', 'Texture', 'Depth']
  },
  {
    id: 16,
    keyword: 'Dramatic',
    command: '/Dramatic',
    action: 'Directional lighting, deep shadows & powerful focal point',
    category: 'Photo & Lighting',
    page: 2,
    promptTemplate: '/Dramatic — Create a dramatic visual with directional lighting, deeper shadows, atmospheric depth, and a powerful focal point.',
    useCase: 'Action movie posters, athlete profiles, luxury perfumes, and theatrical promos',
    tags: ['Chiaroscuro', 'Deep Shadows', 'Focal Point', 'Power']
  },
  {
    id: 17,
    keyword: 'Clean',
    command: '/Clean',
    action: 'Remove visual clutter, improve spacing & hierarchy',
    category: 'Aesthetic & Mood',
    page: 2,
    promptTemplate: '/Clean — Make this design cleaner and more professional by removing visual clutter, improving spacing, alignment, clarity, and hierarchy.',
    useCase: 'SaaS landing pages, corporate slide decks, app mockups, and resume designs',
    tags: ['De-clutter', 'Alignment', 'Clarity', 'Hierarchy']
  },
  {
    id: 18,
    keyword: 'Sharp',
    command: '/Sharp',
    action: 'Improve sharpness & clarity while preserving natural textures',
    category: 'Photo & Lighting',
    page: 2,
    promptTemplate: '/Sharp — Improve sharpness and clarity while preserving natural textures, proportions, colors, and important details.',
    useCase: 'Fixing blurry assets, micro-detail enhancement, jewelry and fabric rendering',
    tags: ['HD Clarity', 'Texture Retention', 'Micro-Detail', 'Crisp']
  },
  {
    id: 19,
    keyword: 'Glow',
    command: '/Glow',
    action: 'Realistic glow & luminous accents without overpowering subject',
    category: 'Photo & Lighting',
    page: 2,
    promptTemplate: '/Glow — Add subtle realistic glow and luminous accents to create a premium modern visual without overpowering the main subject.',
    useCase: 'Fintech cards, glowing tech devices, cosmetic serums, and spiritual artwork',
    tags: ['Luminous', 'Soft Light', 'Modern Finish', 'Highlight']
  },
  {
    id: 20,
    keyword: 'Blur',
    command: '/Blur',
    action: 'Realistic depth-of-field with sharp subject & soft background',
    category: 'Photo & Lighting',
    page: 2,
    promptTemplate: '/Blur — Create a realistic depth-of-field effect with a sharp main subject and naturally softened background.',
    useCase: 'Bokeh effects, isolating subjects in crowded scenes, macro photography',
    tags: ['Depth-of-Field', 'Bokeh', 'Subject Isolation', 'Lens Blur']
  },

  // ================= PAGE 3 =================
  {
    id: 21,
    keyword: '3D',
    command: '/3D',
    action: 'Polished 3D-style composition with realistic depth & materials',
    category: 'Materials & Creative Effects',
    page: 3,
    promptTemplate: '/3D — Convert the visual into a polished 3D-style composition with realistic depth, lighting, materials, and dimensional presentation.',
    useCase: '3D icons, blender-style app illustrations, isometric scenes, and brand claymorphic art',
    tags: ['Isometric', 'Materials', 'Dimensional', 'Octane Render']
  },
  {
    id: 22,
    keyword: 'Poster',
    command: '/Poster',
    action: 'Eye-catching promotional poster with clear headline & CTA room',
    category: 'Social & Content Formats',
    page: 3,
    promptTemplate: '/Poster — Turn this into an eye-catching promotional poster with strong hierarchy, balanced spacing, a clear focal point, and room for headline and CTA.',
    useCase: 'Concert posters, conference promos, wall art, and product announcements',
    tags: ['Poster Art', 'Typography Room', 'Focal Point', 'Call to Action']
  },
  {
    id: 23,
    keyword: 'Flyer',
    command: '/Flyer',
    action: 'Structured grid, readable text areas & professional spacing',
    category: 'Social & Content Formats',
    page: 3,
    promptTemplate: '/Flyer — Create a modern promotional flyer with a structured grid, clear information hierarchy, readable text areas, and professional spacing.',
    useCase: 'Local business flyers, corporate handouts, club events, and real estate sheets',
    tags: ['Structured Grid', 'Readable Info', 'Print-Ready', 'Spacing']
  },
  {
    id: 24,
    keyword: 'Thumbnail',
    command: '/Thumbnail',
    action: 'Attention-grabbing thumbnail with bold visual hierarchy',
    category: 'Social & Content Formats',
    page: 3,
    promptTemplate: '/Thumbnail — Redesign this as an attention-grabbing thumbnail with a strong focal point, bold visual hierarchy, clean composition, and space for a short title.',
    useCase: 'YouTube thumbnails, podcast episode artwork, and video preview cards',
    tags: ['YouTube', 'High CTR', 'Short Title Area', 'Focal Point']
  },
  {
    id: 25,
    keyword: 'Story',
    command: '/Story',
    action: 'Premium 9:16 Instagram Story design with hook & CTA spaces',
    category: 'Social & Content Formats',
    page: 3,
    promptTemplate: '/Story — Reformat this into a premium 9:16 Instagram Story design with balanced composition and clear areas for hook, visual, and CTA.',
    useCase: 'Instagram Stories, TikTok ads, Snapchat campaigns, and WhatsApp status updates',
    tags: ['9:16 Vertical', 'Instagram Story', 'Mobile-First', 'Hook & CTA']
  },
  {
    id: 26,
    keyword: 'Reel',
    command: '/Reel',
    action: '9:16 Instagram Reel cover with scroll-stopping composition',
    category: 'Social & Content Formats',
    page: 3,
    promptTemplate: '/Reel — Adapt this visual into a 9:16 Instagram Reel cover with strong focal hierarchy, readable title space, and scroll-stopping composition.',
    useCase: 'Instagram Reels cover images, TikTok video thumbnails, and YouTube Shorts covers',
    tags: ['Reel Cover', 'Scroll-Stopping', 'Readable Title', 'Vertical']
  },
  {
    id: 27,
    keyword: 'Carousel',
    command: '/Carousel',
    action: 'Clean Instagram carousel slide with consistent margins & flow',
    category: 'Social & Content Formats',
    page: 3,
    promptTemplate: '/Carousel — Turn this into a clean Instagram carousel slide with consistent margins, strong hierarchy, and a layout that can continue across multiple slides.',
    useCase: 'Multi-slide LinkedIn carousels, educational IG decks, and step-by-step guides',
    tags: ['Carousel Deck', 'Consistent Margins', 'Swipe-Friendly', 'Multi-Slide']
  },
  {
    id: 28,
    keyword: 'Brand',
    command: '/Brand',
    action: 'Cohesive brand identity with consistent visual language',
    category: 'Fashion & Lifestyle',
    page: 3,
    promptTemplate: '/Brand — Apply a cohesive professional brand identity with consistent typography areas, spacing, visual language, and premium presentation.',
    useCase: 'Brand guidelines, corporate visual identity, stationery, and pitch decks',
    tags: ['Brand Identity', 'Consistency', 'Typography Space', 'Corporate']
  },
  {
    id: 29,
    keyword: 'Modern',
    command: '/Modern',
    action: 'Contemporary layout, clean geometry & visual balance',
    category: 'Aesthetic & Mood',
    page: 3,
    promptTemplate: '/Modern — Redesign this visual with a contemporary layout, clean geometry, refined typography space, and modern visual balance.',
    useCase: 'Tech startups, modern art galleries, creative agency landing pages',
    tags: ['Geometry', 'Contemporary', 'Balanced', 'Refined']
  },
  {
    id: 30,
    keyword: 'Bold',
    command: '/Bold',
    action: 'High contrast, confident composition & clear focal emphasis',
    category: 'Aesthetic & Mood',
    page: 3,
    promptTemplate: '/Bold — Make the design bold and attention-grabbing using strong hierarchy, confident composition, high contrast, and clear focal emphasis.',
    useCase: 'Billboard advertising, energy drinks, fitness brands, and breakthrough campaigns',
    tags: ['High Impact', 'High Contrast', 'Hero Emphasis', 'Confidence']
  },

  // ================= PAGE 4 =================
  {
    id: 31,
    keyword: 'Elegant',
    command: '/Elegant',
    action: 'Sophisticated spacing, subtle contrast & graceful composition',
    category: 'Aesthetic & Mood',
    page: 4,
    promptTemplate: '/Elegant — Give this design a refined elegant appearance with sophisticated spacing, subtle contrast, graceful composition, and premium styling.',
    useCase: 'Fine dining menus, high-end wedding invitations, and luxury spa branding',
    tags: ['Graceful', 'Subtle Contrast', 'Refined', 'Sophisticated']
  },
  {
    id: 32,
    keyword: 'Dark',
    command: '/Dark',
    action: 'Dark premium aesthetic with controlled lighting & deep tones',
    category: 'Photo & Lighting',
    page: 4,
    promptTemplate: '/Dark — Create a dark premium aesthetic with controlled lighting, deep atmospheric tones, subtle highlights, and strong subject separation.',
    useCase: 'Dark-mode UI, luxury automobile marketing, stealth gear, and whisky brands',
    tags: ['Dark Mode', 'Deep Tones', 'Stealth', 'Subtle Highlights']
  },
  {
    id: 33,
    keyword: 'Light',
    command: '/Light',
    action: 'Bright clean aesthetic with soft lighting & airy composition',
    category: 'Photo & Lighting',
    page: 4,
    promptTemplate: '/Light — Create a bright clean aesthetic with soft lighting, airy composition, gentle contrast, and a polished professional appearance.',
    useCase: 'Wellness websites, healthcare clinics, daylight photography, and summer releases',
    tags: ['Airy', 'High-Key', 'Clean Daylight', 'Soft Shadows']
  },
  {
    id: 34,
    keyword: 'Fashion',
    command: '/Fashion',
    action: 'Premium fashion campaign visual with realistic clothing details',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Fashion — Transform this into a premium fashion campaign visual with editorial styling, sophisticated lighting, confident composition, and realistic clothing details.',
    useCase: 'Fashion weeks, apparel lookbooks, Zara/H&M style campaign visuals',
    tags: ['Fashion Campaign', 'Clothing Fabric', 'Runway Look', 'Editorial']
  },
  {
    id: 35,
    keyword: 'Streetwear',
    command: '/Streetwear',
    action: 'Contemporary streetwear campaign with urban atmosphere',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Streetwear — Give this outfit visual a contemporary streetwear campaign aesthetic with urban atmosphere, dynamic composition, and realistic styling.',
    useCase: 'Sneaker releases, hoodie drops, skate brand lookbooks, and Tokyo street style',
    tags: ['Urban', 'Sneakers', 'Street Style', 'Hypebeast']
  },
  {
    id: 36,
    keyword: 'OldMoney',
    command: '/OldMoney',
    action: 'Timeless refined fashion aesthetic with understated luxury',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Old Money — Create a timeless refined fashion aesthetic using understated luxury, neutral styling, elegant composition, and classic visual details.',
    useCase: 'Quiet luxury apparel, country club marketing, cashmere brands, and equestrian shoots',
    tags: ['Quiet Luxury', 'Neutral Palette', 'Classic', 'Timeless']
  },
  {
    id: 37,
    keyword: 'LuxuryWatch',
    command: '/LuxuryWatch',
    action: 'Dramatic studio lighting, realistic reflections & dial details',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Luxury Watch — Present the watch as a premium luxury product with dramatic studio lighting, realistic reflections, elegant background, and sharp dial details.',
    useCase: 'Horology advertisements, Rolex/Patek style macro photography, luxury e-commerce',
    tags: ['Horology', 'Dial Macro', 'Metallic Reflection', 'Luxury Goods']
  },
  {
    id: 38,
    keyword: 'Beauty',
    command: '/Beauty',
    action: 'Flattering professional lighting with realistic skin texture',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Beauty — Create a polished beauty-editorial visual with flattering professional lighting, clean composition, realistic texture, and premium presentation.',
    useCase: 'Cosmetics campaigns, Sephora style close-ups, skincare serums, and dermatological ads',
    tags: ['Cosmetics', 'Skin Texture', 'Beauty Editorial', 'Flattering Light']
  },
  {
    id: 39,
    keyword: 'Food',
    command: '/Food',
    action: 'Appetizing restaurant advertisement with clean text space',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Food — Turn this food image into a premium restaurant advertisement with appetizing lighting, realistic texture, elegant composition, and clean space for text.',
    useCase: 'Michelin-star menus, food delivery app promotions, gourmet recipe books',
    tags: ['Culinary', 'Appetizing', 'Texture', 'Menu Ad']
  },
  {
    id: 40,
    keyword: 'Travel',
    command: '/Travel',
    action: 'Cinematic travel-editorial with natural colors & depth',
    category: 'Fashion & Lifestyle',
    page: 4,
    promptTemplate: '/Travel — Give this image a cinematic travel-editorial look with immersive atmosphere, natural colors, depth, and an aspirational composition.',
    useCase: 'Tourism boards, boutique hotel promos, National Geographic style visuals',
    tags: ['Wanderlust', 'Aspirational', 'Landscape', 'Natural Light']
  },

  // ================= PAGE 5 =================
  {
    id: 41,
    keyword: 'Nature',
    command: '/Nature',
    action: 'Realistic environmental detail, balanced light & calm depth',
    category: 'Fashion & Lifestyle',
    page: 5,
    promptTemplate: '/Nature — Enhance the natural environment with realistic detail, balanced light, atmospheric depth, and a calm visually rich composition.',
    useCase: 'Eco-friendly product lines, hiking apps, outdoor gear, and environmental blogs',
    tags: ['Eco', 'Landscape', 'Natural Depth', 'Serene']
  },
  {
    id: 42,
    keyword: 'Retro',
    command: '/Retro',
    action: 'Period-inspired tones, subtle grain & nostalgic composition',
    category: 'Aesthetic & Mood',
    page: 5,
    promptTemplate: '/Retro — Create a stylish retro-inspired visual with period-inspired tones, subtle grain, nostalgic composition, and tasteful modern polish.',
    useCase: '70s/80s revival themes, indie band covers, vintage arcade art, and throwback campaigns',
    tags: ['Film Grain', 'Period Color', 'Nostalgia', 'Indie']
  },
  {
    id: 43,
    keyword: 'Glitch',
    command: '/Glitch',
    action: 'Controlled digital glitch distortion with strong hierarchy',
    category: 'Materials & Creative Effects',
    page: 5,
    promptTemplate: '/Glitch — Apply a controlled digital glitch aesthetic with subtle distortion, futuristic details, and strong visual hierarchy while keeping the subject recognizable.',
    useCase: 'Cyberpunk posters, gaming live streams, electronic music album art, and tech rebellion',
    tags: ['Digital Glitch', 'RGB Split', 'Distortion', 'Cyberpunk']
  },
  {
    id: 44,
    keyword: 'Chrome',
    command: '/Chrome',
    action: 'Metallic reflections, polished surfaces & dramatic highlights',
    category: 'Materials & Creative Effects',
    page: 5,
    promptTemplate: '/Chrome — Give the visual a sleek chrome-inspired finish with metallic reflections, polished surfaces, dramatic highlights, and futuristic presentation.',
    useCase: 'Y2K aesthetics, chrome typography, modern automobile styling, and futuristic jewelry',
    tags: ['Metallic', 'Y2K Chrome', 'Specular Highlights', 'Futuristic']
  },
  {
    id: 45,
    keyword: 'Glass',
    command: '/Glass',
    action: 'Glassmorphism translucent layers with soft reflections',
    category: 'Materials & Creative Effects',
    page: 5,
    promptTemplate: '/Glass — Create a premium glassmorphism-inspired composition with translucent layers, soft reflections, depth, and clean modern spacing.',
    useCase: 'iOS/macOS style UI designs, fintech cards, translucent bottle mockups',
    tags: ['Glassmorphism', 'Translucent', 'Frosted Glass', 'UI Design']
  },
  {
    id: 46,
    keyword: 'Paper',
    command: '/Paper',
    action: 'Paper-texture editorial style with tactile details',
    category: 'Materials & Creative Effects',
    page: 5,
    promptTemplate: '/Paper — Redesign the visual with a sophisticated paper-texture editorial style, tactile details, clean typography space, and balanced composition.',
    useCase: 'Editorial stationery, watercolor art prints, artisanal packaging, and wedding cards',
    tags: ['Tactile Paper', 'Handcrafted', 'Artisanal', 'Editorial']
  },
  {
    id: 47,
    keyword: 'Collage',
    command: '/Collage',
    action: 'Trendy editorial collage using layered elements & varied scale',
    category: 'Materials & Creative Effects',
    page: 5,
    promptTemplate: '/Collage — Create a trendy editorial collage using layered elements, clean alignment, varied scale, and cohesive visual storytelling.',
    useCase: 'Fashion zines, scrapbook art, Instagram grid stories, and indie music releases',
    tags: ['Mixed Media', 'Layering', 'Editorial Collage', 'Storytelling']
  },
  {
    id: 48,
    keyword: 'Magazine',
    command: '/Magazine',
    action: 'Magazine-style visual with strong editorial hierarchy & headline space',
    category: 'Fashion & Lifestyle',
    page: 5,
    promptTemplate: '/Magazine — Turn this into a premium magazine-style visual with strong editorial hierarchy, headline space, refined layout, and professional art direction.',
    useCase: 'Vanity Fair style spreads, print editorial layouts, digital magazine covers',
    tags: ['Magazine Spread', 'Art Direction', 'Headline Space', 'Grid Layout']
  },
  {
    id: 49,
    keyword: 'Ad',
    command: '/Ad',
    action: 'Social-media advertisement with strong hook & clear CTA',
    category: 'Social & Content Formats',
    page: 5,
    promptTemplate: '/Ad — Convert this visual into a modern social-media advertisement with a strong hook area, product focus, clean hierarchy, and clear CTA space.',
    useCase: 'Facebook/Instagram feed ads, TikTok sponsored posts, and Google Performance Max ads',
    tags: ['Paid Media', 'High CTR', 'Hook & CTA', 'Conversion Design']
  },
  {
    id: 50,
    keyword: 'Viral',
    command: '/Viral',
    action: 'Scroll-stopping visual with dynamic composition & short hook space',
    category: 'Social & Content Formats',
    page: 5,
    promptTemplate: '/Viral — Make this visual scroll-stopping and social-media-ready using a strong focal point, dynamic composition, high clarity, and space for a short hook.',
    useCase: 'TikTok viral hooks, YouTube thumbnails, meme marketing, and explosive social content',
    tags: ['Scroll-Stopping', 'Viral Reach', 'Dynamic Impact', 'Pattern Interrupt']
  }
];
