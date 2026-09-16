export interface SlashPrompt {
  id: number;
  command: string;
  action: string;
  category: string;
  page: number;
  promptTemplate: string;
  exampleUsage: string;
}

export const SLASH_CATEGORIES = [
  'All',
  'Productivity',
  'Writing',
  'Study & Exam Prep',
  'Coding',
  'Business & Career',
  'Creative',
  'Personal & Lifestyle',
  'Marketing & Social'
] as const;

export const TRENDING_100_SLASH_PROMPTS: SlashPrompt[] = [
  // Page 1: Productivity (1-12)
  {
    id: 1,
    command: '/plan',
    action: 'step-by-step plan for a task',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Act as an expert project manager. Create a comprehensive, step-by-step plan for: [insert task/project]. Break it into actionable milestones, estimate time per step, and highlight potential bottlenecks.',
    exampleUsage: '/plan Launching a digital store in 14 days'
  },
  {
    id: 2,
    command: '/prioritize',
    action: 'rank tasks by urgency/importance',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Using the Eisenhower Matrix framework, analyze this list of tasks: [insert tasks]. Categorize them into Urgent/Important, Schedule, Delegate, and Eliminate with clear reasoning.',
    exampleUsage: '/prioritize 1. Respond to emails, 2. Fix checkout bug, 3. Design new logo, 4. File quarterly taxes'
  },
  {
    id: 3,
    command: '/schedule',
    action: 'build a daily/weekly schedule',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Design an optimal daily/weekly schedule for someone with these core commitments: [insert commitments/goals]. Account for deep work blocks, recovery, and realistic buffer times.',
    exampleUsage: '/schedule Solo founder working 9-to-5 wanting 3 hours evening side-project time'
  },
  {
    id: 4,
    command: '/checklist',
    action: 'turn info into an actionable checklist',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Convert the following unstructured information or procedure into an unambiguous, step-by-step checklist with checkboxes: [insert text]. Order items chronologically.',
    exampleUsage: '/checklist Pre-launch checklist before publishing a new e-book'
  },
  {
    id: 5,
    command: '/summarize',
    action: 'condense into key points',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Condense the following text into key bullet points: [insert text]. Provide: 1) Executive Summary (2 sentences), 2) Top 5 Core Takeaways, 3) Immediate Action Items.',
    exampleUsage: '/summarize [paste meeting transcript or article]'
  },
  {
    id: 6,
    command: '/decide',
    action: 'compare options, recommend one',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Compare Option A: [option A] vs Option B: [option B] for the goal: [goal]. Weigh pros, cons, long-term costs, and asymmetric upside. Provide an explicit recommendation with justification.',
    exampleUsage: '/decide Stripe vs Lemon Squeezy for selling digital downloads'
  },
  {
    id: 7,
    command: '/goals',
    action: 'break a goal into SMART objectives',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Take this high-level goal: [insert goal]. Deconstruct it into Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) sub-objectives with measurable metrics.',
    exampleUsage: '/goals Earn $5,000 monthly in digital product sales within 6 months'
  },
  {
    id: 8,
    command: '/habit',
    action: 'build a habit-forming plan',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Design a 30-day habit formation plan for: [desired habit]. Use the cue-routine-reward habit loop, define implementation intentions ("When X happens, I will do Y"), and set up friction barriers for setbacks.',
    exampleUsage: '/habit Writing 500 words of content every morning before checking phone'
  },
  {
    id: 9,
    command: '/timeblock',
    action: 'time-blocked daily schedule',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Create a tight, high-leverage time-blocked daily schedule from [start time] to [end time] covering these priorities: [list priorities]. Group related tasks into thematic blocks.',
    exampleUsage: '/timeblock 8:00 AM to 6:00 PM for deep coding, client emails, and fitness'
  },
  {
    id: 10,
    command: '/delegate',
    action: 'suggest what to hand off',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Review this list of my daily tasks: [insert tasks]. Evaluate them against the $10/hr vs $1,000/hr value matrix and provide a concrete delegation guide showing what to automate, outsource, or retain.',
    exampleUsage: '/delegate Customer email replies, invoice creation, product design, ad management'
  },
  {
    id: 11,
    command: '/review',
    action: 'review week/month, suggest fixes',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Act as an executive performance coach. Analyze my weekly retrospective log: [insert wins, losses, blockers]. Identify blind spots, friction points, and suggest 3 high-impact fixes for next week.',
    exampleUsage: '/review Missed 2 gym sessions, completed client website, spent 4 hours tweaking font colors'
  },
  {
    id: 12,
    command: '/focus',
    action: 'distraction-free work routine',
    category: 'Productivity',
    page: 1,
    promptTemplate: 'Give me a battle-tested protocol for entering flow state in the next 10 minutes to accomplish [task]. Include physical workspace adjustments, digital noise blockers, and a 90-minute focus sprint plan.',
    exampleUsage: '/focus Need to finish writing chapter 3 of financial independence guide'
  },

  // Page 1 & 2: Writing (13-25)
  {
    id: 13,
    command: '/rewrite',
    action: 'clearer/simpler version',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Rewrite the following text to be significantly clearer, more concise, and natural while preserving the original intent: [insert text]. Eliminate unnecessary adverbs and passive voice.',
    exampleUsage: '/rewrite [paste draft paragraph]'
  },
  {
    id: 14,
    command: '/shorten',
    action: 'cut to half the length',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Cut the following text to approximately 50% of its original length without losing any critical arguments or nuances: [insert text]. Keep every sentence punchy.',
    exampleUsage: '/shorten [paste long announcement draft]'
  },
  {
    id: 15,
    command: '/expand',
    action: 'grow an idea into a paragraph',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Take this raw concept/bullet: [insert thought]. Expand it into a compelling, cohesive paragraph with a strong topic sentence, supporting real-world example, and smooth transitional cadence.',
    exampleUsage: '/expand Compound interest turns modest teenage savings into financial security'
  },
  {
    id: 16,
    command: '/tone',
    action: 'rewrite in a chosen tone',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Rewrite the following passage in a [choose tone: persuasive / authoritative / warm & empathetic / casual & witty / minimalist] tone: [insert text].',
    exampleUsage: '/tone warm & empathetic: Please pay your overdue invoice by Friday'
  },
  {
    id: 17,
    command: '/proofread',
    action: 'check grammar/spelling',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Proofread the following text for spelling, grammar, punctuation, and awkward phrasing: [insert text]. Provide a corrected version and bullet list the specific corrections made.',
    exampleUsage: '/proofread [paste article or email]'
  },
  {
    id: 18,
    command: '/outline',
    action: 'structure for a topic',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Generate a comprehensive, logical outline for a [blog post / e-book / presentation / video script] on the topic: [topic]. Include catchy headings, subheadings, and key talking points.',
    exampleUsage: '/outline The Complete Guide to Freelance Invoicing and Payment Terms'
  },
  {
    id: 19,
    command: '/email',
    action: 'draft a professional email',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Draft a concise, professional email to [recipient] regarding [situation/request]. The goal is [desired outcome]. Tone should be courteous, respectful of their time, and end with a clear CTA.',
    exampleUsage: '/email Proposing a sponsorship collaboration to a tech YouTube creator'
  },
  {
    id: 20,
    command: '/essay',
    action: 'write an essay on a topic',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Draft a well-structured essay on the topic: [topic]. Include a hook thesis statement in the introduction, 3 evidence-backed body paragraphs with counter-arguments, and a synthetic conclusion.',
    exampleUsage: '/essay The economic impact of remote work on urbanization in developing nations'
  },
  {
    id: 21,
    command: '/story',
    action: 'short story on a theme',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Write an evocative 600-word short story centered on the theme: [theme]. Feature dynamic dialogue, rich sensory descriptions, a compelling conflict, and an unexpected resolution.',
    exampleUsage: '/story An indie developer launching an app at midnight from a quiet coffee shop'
  },
  {
    id: 22,
    command: '/headline',
    action: 'catchy headline options',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Generate 10 magnetic, high-CTR headline options for: [article/product]. Categorize them into: How-to, Curiosity Gap, Contrarian, Numbered List, and Bold Promise styles.',
    exampleUsage: '/headline A digital budgeting guide for college students and Gen Z'
  },
  {
    id: 23,
    command: '/caption',
    action: 'social media caption',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Write 3 social media caption options (Instagram, LinkedIn, X/Twitter) for: [image/concept]. Include a powerful first-line hook, line breaks for readability, and 4 high-relevance hashtags.',
    exampleUsage: '/caption Launching our new 100 ChatGPT slash prompts cheatsheet vault'
  },
  {
    id: 24,
    command: '/bio',
    action: 'short personal/professional bio',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Write 3 versions of a personal bio for [person/profession] targeting [platform: Twitter/LinkedIn/Portfolio]. Format: 1) One-liner, 2) 50-word elevator pitch, 3) 150-word narrative bio.',
    exampleUsage: '/bio Full-stack developer building indie digital products and open-source AI tools'
  },
  {
    id: 25,
    command: '/letter',
    action: 'formal letter draft',
    category: 'Writing',
    page: 1,
    promptTemplate: 'Draft a formal letter addressed to [recipient] regarding [subject]. Adhere to standard business letter etiquette, clear formal phrasing, and a definitive concluding call to action.',
    exampleUsage: '/letter Formal dispute of incorrect billing charge with banking institution'
  },

  // Page 1 & 2: Study & Exam Prep (26-38)
  {
    id: 26,
    command: '/explain',
    action: 'simplify a concept',
    category: 'Study & Exam Prep',
    page: 1,
    promptTemplate: 'Explain the concept of [topic] in plain, intuitive language. Use a concrete real-world analogy and break down complex components step-by-step so anyone can understand it.',
    exampleUsage: '/explain How public-key cryptography (RSA) encrypts web data'
  },
  {
    id: 27,
    command: '/eli5',
    action: "explain like I'm five",
    category: 'Study & Exam Prep',
    page: 1,
    promptTemplate: "Explain [complex concept] as if I am 5 years old. Use playful, relatable analogies, zero technical jargon, and simple sentence structures.",
    exampleUsage: '/eli5 How does cloud computing and distributed servers work?'
  },
  {
    id: 28,
    command: '/quiz',
    action: 'quiz questions on a topic',
    category: 'Study & Exam Prep',
    page: 1,
    promptTemplate: 'Create a 5-question multiple-choice quiz on: [topic]. Include 4 options per question (A-D), specify the correct answer, and provide a 2-sentence explanation of why it is correct.',
    exampleUsage: '/quiz Microeconomics: Supply, Demand, and Price Elasticity'
  },
  {
    id: 29,
    command: '/notes',
    action: 'turn text into study notes',
    category: 'Study & Exam Prep',
    page: 1,
    promptTemplate: 'Transform the following lecture or reading text into Cornell-style study notes: [insert text]. Provide: 1) Cue column keywords, 2) Main structured notes, 3) Bottom 3-sentence summary.',
    exampleUsage: '/notes [paste textbook chapter excerpt on cellular respiration]'
  },
  {
    id: 30,
    command: '/flashcards',
    action: 'generate flashcards',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Generate 10 front/back Anki-style flashcards for: [topic/text]. Format as clean tabular Q&A pairs testing recall of definitions, mechanisms, and key distinctions.',
    exampleUsage: '/flashcards Fundamental concepts of Organic Chemistry reaction mechanisms'
  },
  {
    id: 31,
    command: '/mnemonics',
    action: 'memory tricks for facts',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Create memorable acronyms, rhymes, or visual association mnemonics to help me memorize this list of facts or steps: [list of facts].',
    exampleUsage: '/mnemonics 12 cranial nerves in anatomical order'
  },
  {
    id: 32,
    command: '/examprep',
    action: 'exam-style questions',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Act as a university professor preparing a final exam on [subject]. Write 3 challenging exam-style essay questions testing synthesis, critical analysis, and real-world application.',
    exampleUsage: '/examprep Corporate Finance: Capital Budgeting & WACC calculations'
  },
  {
    id: 33,
    command: '/compare',
    action: 'contrast two concepts',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Compare and contrast Concept A: [concept A] vs Concept B: [concept B]. Provide a markdown table showing key differences in Definition, Mechanism, Use Cases, and Limitations.',
    exampleUsage: '/compare SQL relational databases vs NoSQL document stores'
  },
  {
    id: 34,
    command: '/define',
    action: 'term + example',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Provide a precise academic definition of [term], followed by an intuitive explanation, 2 distinct practical examples, and common misconceptions about it.',
    exampleUsage: '/define Opportunity Cost in behavioral economics'
  },
  {
    id: 35,
    command: '/steps',
    action: 'break a process into steps',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Break down the complex process of [process] into chronological, easily digestible steps. Explain what happens in each phase and what triggers the transition to the next.',
    exampleUsage: '/steps How a bill becomes law in the United States legislative branch'
  },
  {
    id: 36,
    command: '/practice',
    action: 'practice problems',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Generate 3 tiered practice problems on [topic] (Easy, Medium, Hard). Do not give answers immediately; ask me to solve them, then offer to critique my answers step-by-step.',
    exampleUsage: '/practice Calculus I: Derivatives using the Chain Rule'
  },
  {
    id: 37,
    command: '/revise',
    action: 'chapter revision summary',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Provide a high-yield, 1-page rapid revision cheat sheet for [chapter/subject]. Focus only on core formulas, foundational axioms, and high-frequency exam traps.',
    exampleUsage: '/revise Introductory Statistics: Hypothesis testing and P-values'
  },
  {
    id: 38,
    command: '/answer',
    action: 'model answer for an exam question',
    category: 'Study & Exam Prep',
    page: 2,
    promptTemplate: 'Write a top-mark, 100% score model answer for this exam prompt: [insert question]. Structure with introduction, thesis, evidence paragraphs, and nuanced conclusion.',
    exampleUsage: '/answer To what extent did the Industrial Revolution reshape social stratification in 19th-century Britain?'
  },

  // Page 2: Coding (39-50)
  {
    id: 39,
    command: '/code',
    action: 'write code for a task',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Write clean, production-ready [language/framework] code for: [task]. Include error handling, type definitions, and concise comments explaining key logic.',
    exampleUsage: '/code TypeScript function to debounce an API search input with clean teardown'
  },
  {
    id: 40,
    command: '/debug',
    action: 'find and fix a bug',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Analyze the following code snippet and error message: Code: [insert code], Error: [insert error]. Explain the root cause of the bug and provide the corrected code snippet.',
    exampleUsage: '/debug React useEffect infinite re-render loop when updating local storage state'
  },
  {
    id: 41,
    command: '/explaincode',
    action: 'explain what code does',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Explain this code line-by-line in plain English: [insert code]. Highlight data structures used, edge cases handled, and overall algorithmic time/space complexity.',
    exampleUsage: '/explaincode [paste recursive binary tree traversal implementation]'
  },
  {
    id: 42,
    command: '/optimize',
    action: 'improve performance',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Review this code for performance bottlenecks: [insert code]. Refactor it to minimize time and space complexity (Big-O). Explain what optimizations were made and why.',
    exampleUsage: '/optimize Nested for-loop filtering a 50,000 item product array in JavaScript'
  },
  {
    id: 43,
    command: '/comment',
    action: 'add code comments',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Add JSDoc / Docstring comments to the following function: [insert code]. Document parameters, return values, exceptions thrown, and provide a clear usage example.',
    exampleUsage: '/comment calculateCompoundInterest(principal, rate, years, compoundingFrequency)'
  },
  {
    id: 44,
    command: '/convert',
    action: 'port code between languages',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Convert the following code from [Source Language] to idiomatic [Target Language]: [insert code]. Follow best practices and standard libraries of the target language.',
    exampleUsage: '/convert Python dictionary data processing script to TypeScript with Zod validation'
  },
  {
    id: 45,
    command: '/test',
    action: 'write unit tests',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Write comprehensive unit tests for this function using [Jest / Vitest / PyTest]: [insert code]. Cover happy path, edge cases (null, empty, negative), and boundary conditions.',
    exampleUsage: '/test TypeScript cart discount calculator supporting coupon codes and percentage deductions'
  },
  {
    id: 46,
    command: '/refactor',
    action: 'clean up for readability',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Refactor the following messy code for improved readability, modularity, and adherence to clean code principles: [insert code]. Keep external interface identical.',
    exampleUsage: '/refactor 200-line monolithic React component with inline styles and state clutter'
  },
  {
    id: 47,
    command: '/regex',
    action: 'build a regex pattern',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Build a regular expression (RegEx) to match: [desired pattern]. Provide: 1) The exact regex string with flags, 2) Step-by-step breakdown of each token, 3) Test string matches.',
    exampleUsage: '/regex International phone number format with optional country code'
  },
  {
    id: 48,
    command: '/sql',
    action: 'write a SQL query',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Write an efficient SQL query for [PostgreSQL / MySQL / SQLite] that performs the following: [describe query goal]. Given schemas: [insert tables/columns].',
    exampleUsage: '/sql Find top 5 customers with highest total spending over the last 90 days with order counts'
  },
  {
    id: 49,
    command: '/api',
    action: 'design an API endpoint',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Design a RESTful API endpoint for [functionality]. Include: HTTP Method, URL path, Request headers/body JSON schema, and 200/400/401/500 Response payloads.',
    exampleUsage: '/api POST /api/orders/checkout for digital downloads with stripe token verification'
  },
  {
    id: 50,
    command: '/architecture',
    action: 'suggest system design',
    category: 'Coding',
    page: 2,
    promptTemplate: 'Suggest a modern, scalable system architecture for: [system requirement]. Include database selection, caching layer, authentication flow, file delivery, and hosting infrastructure.',
    exampleUsage: '/architecture Multi-tenant digital asset marketplace with instant secure file downloads'
  },

  // Page 2: Business & Career (51-63)
  {
    id: 51,
    command: '/resume',
    action: 'improve resume bullets',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Rewrite these resume bullet points using the Google XYZ formula ("Accomplished [X] as measured by [Y] by doing [Z]"): [insert bullets]. Add strong action verbs and quantified impact.',
    exampleUsage: '/resume Managed social media accounts and created digital graphics for a local agency'
  },
  {
    id: 52,
    command: '/coverletter',
    action: 'draft a cover letter',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Write a compelling, non-generic 3-paragraph cover letter for [Role] at [Company]. Align my experience in [my skills] directly with their mission: [company info]. Ban cliché intros.',
    exampleUsage: '/coverletter Frontend Engineer at an AI startup using React and Next.js'
  },
  {
    id: 53,
    command: '/interview',
    action: 'generate interview questions',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Generate 7 realistic interview questions for a [Job Title] role at [Company type]. Include 3 technical/competency questions, 2 behavioral STAR questions, and 2 situational curveballs.',
    exampleUsage: '/interview Junior Product Manager at a fast-growing fintech company'
  },
  {
    id: 54,
    command: '/pitch',
    action: 'write a pitch for an idea',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Write a 60-second elevator pitch for: [product/idea]. Structure as: 1) Gripping problem hook, 2) Unique value proposition, 3) Traction / proof, 4) Compelling ask/call to action.',
    exampleUsage: '/pitch A digital marketplace selling curated AI prompt vaults for solopreneurs'
  },
  {
    id: 55,
    command: '/swot',
    action: 'SWOT analysis',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Perform a deep SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for [company or business idea] in the [niche/industry] market. Give 3 points per quadrant.',
    exampleUsage: '/swot Selling Notion productivity templates on Gumroad in 2026'
  },
  {
    id: 56,
    command: '/strategy',
    action: 'strategy for a goal',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Develop an asymmetric go-to-market strategy to achieve [business goal] with a budget of [budget] within [timeframe]. Focus on high-leverage organic distribution channels.',
    exampleUsage: '/strategy Reach 10,000 newsletter subscribers for a personal finance publication on zero budget'
  },
  {
    id: 57,
    command: '/negotiate',
    action: 'negotiation talking points',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'I am negotiating [salary / client contract rate / vendor pricing]. Current offer: [offer], Target: [target]. Provide 4 calm, assertive talking points leveraging BATNA and value delivered.',
    exampleUsage: '/negotiate Raising monthly freelance retainer from $2,000 to $3,500 after delivering 40% growth'
  },
  {
    id: 58,
    command: '/proposal',
    action: 'business proposal draft',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Draft a client-facing proposal for [project]. Include: Project Scope, Expected Business Outcomes, 3-Tiered Investment Options (Basic, Recommended, Premium), and Timeline.',
    exampleUsage: '/proposal Redesigning an e-commerce website and migrating from Shopify to a custom headless stack'
  },
  {
    id: 59,
    command: '/marketresearch',
    action: 'summarize industry trends',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Summarize the top 5 macro trends, consumer shifts, and technological disruptions in the [industry] market over the past 12 months. Detail how a new entrant can capitalize on them.',
    exampleUsage: '/marketresearch Digital products and creator economy monetization trends'
  },
  {
    id: 60,
    command: '/branding',
    action: 'branding ideas',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Generate brand identity ideas for [business concept]. Provide: 5 memorable brand names with domain ideas, brand archetypes, primary & accent color palettes with hex codes, and brand manifesto.',
    exampleUsage: '/branding Premium digital store for ambitious Gen Z creators and bootstrappers'
  },
  {
    id: 61,
    command: '/okr',
    action: 'set OKRs for a team/goal',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Create quarterly OKRs (Objectives and Key Results) for [department / solopreneur goal]. Provide 1 inspiring Objective and 3 quantitative, measurable Key Results.',
    exampleUsage: '/okr Solopreneur launching first digital product line in Q3'
  },
  {
    id: 62,
    command: '/report',
    action: 'draft a report',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Draft an executive status report on [project/initiative]. Include: Executive Summary, Key Milestones Achieved, Metrics & KPIs, Open Risks/Blockers, and Next Week Focus.',
    exampleUsage: '/report Monthly store performance report: $12k revenue, 420 orders, 3.8% conversion rate'
  },
  {
    id: 63,
    command: '/meeting',
    action: 'meeting agenda',
    category: 'Business & Career',
    page: 2,
    promptTemplate: 'Create a tight 30-minute meeting agenda for [meeting purpose]. Include timed agenda items, required pre-reads, discussion owner, and expected tangible decision outputs.',
    exampleUsage: '/meeting Quarterly digital product roadmapping and pricing revision'
  },

  // Page 3: Creative (64-75)
  {
    id: 64,
    command: '/poem',
    action: 'poem on a theme',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Write a vivid, modern 16-line poem exploring the theme of [theme]. Avoid cliché rhymes; focus on visceral imagery, rhythm, and unexpected metaphors.',
    exampleUsage: '/poem The quiet hum of an electric city at 3:00 AM'
  },
  {
    id: 65,
    command: '/songidea',
    action: 'original song concept/lyrics',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Develop an original song concept for [genre: Indie Pop / Lofi / R&B]. Provide: Song title, core emotional narrative, Verse 1, Pre-Chorus, Chorus, and musical chord suggestion.',
    exampleUsage: '/songidea Nostalgic lofi track about growing up and leaving home'
  },
  {
    id: 66,
    command: '/namegen',
    action: 'names for product/character',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Generate 15 creative, memorable name ideas for [product / company / fictional character]. Group into: Modern Minimalist, Evocative/Poetic, Tech/Futuristic, and Playful.',
    exampleUsage: '/namegen An all-in-one Notion workspace for freelancers'
  },
  {
    id: 67,
    command: '/worldbuild',
    action: 'build a fictional world',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Create a rich world-building brief for a fictional setting characterized by [premise]. Detail geography, social hierarchy, unique energy/magic system, and primary political tension.',
    exampleUsage: '/worldbuild A subterranean cyberpunk metropolis where sunlight is traded as a luxury currency'
  },
  {
    id: 68,
    command: '/character',
    action: 'character profile',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Create a deep, multidimensional character profile for [character role]. Include: Core desire, fatal flaw, distinctive speaking pattern, physical quirk, and backstory trauma.',
    exampleUsage: '/character A renegade archivist preserving forbidden analog books in an automated AI future'
  },
  {
    id: 69,
    command: '/plot',
    action: 'plot twist idea',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Given this story premise: [insert premise], generate 3 unexpected yet narratively satisfying plot twists that recontextualize the protagonist’s journey without feeling like cheap gimmicks.',
    exampleUsage: '/plot A detective investigating an art heist that only targeted fake paintings'
  },
  {
    id: 70,
    command: '/dialogue',
    action: 'dialogue between characters',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Write a tense, subtext-heavy dialogue scene between Character A: [personality] and Character B: [personality] arguing about [subject] without ever stating their real grievance explicitly.',
    exampleUsage: '/dialogue Two co-founders deciding whether to accept an acquisition offer'
  },
  {
    id: 71,
    command: '/joke',
    action: 'joke on a topic',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Write 5 clever, punchy jokes or stand-up observations about [topic]. Ensure clean misdirection and smart cultural references without being offensive.',
    exampleUsage: '/joke Being a software developer in the age of AI coding assistants'
  },
  {
    id: 72,
    command: '/riddle',
    action: 'riddle on a topic',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Write an intricate, poetic riddle whose answer is [answer/concept]. Give subtle sensory clues and reveal the answer only in a hidden spoiler at the end.',
    exampleUsage: '/riddle Compound Interest'
  },
  {
    id: 73,
    command: '/metaphor',
    action: 'metaphor for a concept',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Create 4 vivid, unconventional metaphors or similes explaining [abstract concept] to an audience that has never encountered it before.',
    exampleUsage: '/metaphor Technical debt in software development'
  },
  {
    id: 74,
    command: '/script',
    action: 'short scene script',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Write a formatted 2-page screenplay scene in standard courier format. Scene heading, action description, and dialogue between [characters] confronting [dramatic obstacle].',
    exampleUsage: '/script Two astronauts discovering an analog radio broadcast transmitting from deep space'
  },
  {
    id: 75,
    command: '/artprompt',
    action: 'image-generation prompt',
    category: 'Creative',
    page: 3,
    promptTemplate: 'Generate 3 photorealistic, highly detailed image generation prompts for Midjourney / DALL-E 3 on the subject: [subject]. Include lighting, camera lens, color grading, and aspect ratio.',
    exampleUsage: '/artprompt Cyberpunk digital library glowing in deep neon indigo and emerald tones'
  },

  // Page 3: Personal & Lifestyle (76-87)
  {
    id: 76,
    command: '/motivate',
    action: 'motivational message',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Write a grounding, stoic motivational reflection for someone dealing with [struggle/doubt]. Avoid toxic positivity; focus on agency, discipline, and the compound nature of daily effort.',
    exampleUsage: '/motivate Overwhelmed by slow progress on launching my first digital business'
  },
  {
    id: 77,
    command: '/journal',
    action: 'journal prompts',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Provide 5 penetrating journal prompts designed to uncover subconscious assumptions, gratitude, and emotional clarity around [current life theme].',
    exampleUsage: '/journal Transitioning from college into full-time self-directed career'
  },
  {
    id: 78,
    command: '/advice',
    action: 'advice for a situation',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Act as a wise, empathetic mentor. I am facing this situation: [describe situation]. Give me practical advice considering short-term peace of mind vs long-term trajectory.',
    exampleUsage: '/advice Balancing a demanding day job with building an indie digital product store'
  },
  {
    id: 79,
    command: '/mealplan',
    action: 'meal plan for a goal',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Create a 7-day high-protein, budget-friendly meal plan for [goal/dietary preference]. Include meal names, estimated macros, prep time under 30 minutes, and a consolidated grocery list.',
    exampleUsage: '/mealplan 2000 calories/day, vegetarian, quick student meal prep under $50/week'
  },
  {
    id: 80,
    command: '/workout',
    action: 'workout routine',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Design an efficient 4-day workout split for [fitness goal: muscle hypertrophy / endurance / strength] given equipment access: [equipment]. Include exercises, sets, reps, and RPE.',
    exampleUsage: '/workout 45-minute dumbbell and bodyweight home routine for muscle tone'
  },
  {
    id: 81,
    command: '/budget',
    action: 'simple budget plan',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Construct a simple, zero-based monthly budget using the 50/30/20 rule based on a net monthly income of [income amount]. Allocate exact dollar figures to Needs, Wants, and Savings/Debt.',
    exampleUsage: '/budget $3,200 net monthly income living in a shared apartment'
  },
  {
    id: 82,
    command: '/travel',
    action: 'travel itinerary',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Create a realistic, curated [X]-day travel itinerary for [destination] catering to [travel style: budget backpacker / foodie / cultural]. Include morning, afternoon, and evening recommendations.',
    exampleUsage: '/travel 5-day itinerary in Tokyo for photography, coffee culture, and vintage fashion'
  },
  {
    id: 83,
    command: '/giftideas',
    action: 'gift suggestions',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Suggest 5 thoughtful, unique gift ideas under $[budget] for a [relationship/recipient] who loves [interests]. Avoid generic gift cards; suggest items with genuine utility or emotional resonance.',
    exampleUsage: '/giftideas Under $40 for a friend who loves specialty pour-over coffee and journaling'
  },
  {
    id: 84,
    command: '/selfcare',
    action: 'self-care routine',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Design a restorative 90-minute evening self-care and digital wind-down routine to reduce anxiety, lower cortisol, and prepare for deep restorative sleep.',
    exampleUsage: '/selfcare Screen fatigue and mental burnout after 10 hours at a computer'
  },
  {
    id: 85,
    command: '/booklist',
    action: 'book recommendations',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Recommend 4 transformative non-fiction books on [topic]. For each book, explain the central thesis, who should read it, and one counter-intuitive lesson.',
    exampleUsage: '/booklist Building wealth, asymmetric risk, and personal sovereignty'
  },
  {
    id: 86,
    command: '/skill',
    action: 'fast way to learn a skill',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Using the 80/20 Pareto principle, outline the fastest roadmap to reach functional proficiency (top 20%) in [skill] in 20 focused hours. Identify the 3 core sub-skills that deliver 80% of results.',
    exampleUsage: '/skill Learning UI design and typography in Figma from scratch'
  },
  {
    id: 87,
    command: '/decisionhelp',
    action: 'weigh two options',
    category: 'Personal & Lifestyle',
    page: 3,
    promptTemplate: 'Help me make a difficult decision between: Option 1: [Option 1] vs Option 2: [Option 2]. Use the 10/10/10 rule (how will I feel in 10 minutes, 10 months, 10 years) and regret minimization framework.',
    exampleUsage: '/decisionhelp Taking a safe corporate promotion vs leaving to work full-time on my digital store'
  },

  // Page 3 & 4: Marketing & Social (88-100)
  {
    id: 88,
    command: '/hashtags',
    action: 'hashtag suggestions',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Generate 20 strategic hashtags for an Instagram / TikTok post about [topic]. Categorize them into High-Volume (500k+), Niche Specific (50k-500k), and Micro Community (<50k) tags.',
    exampleUsage: '/hashtags Digital products, Notion templates, and solo entrepreneurship'
  },
  {
    id: 89,
    command: '/adcopy',
    action: 'ad copy for a product',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Write 3 high-converting Meta/Facebook ad copy variations for [product]. Include a scroll-stopping first sentence, clear problem-agitation, social proof placeholder, and urgent CTA.',
    exampleUsage: '/adcopy 100 Trending ChatGPT Slash Prompts cheatsheet for creators and students'
  },
  {
    id: 90,
    command: '/socialpost',
    action: 'social media post',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Draft an engaging, viral-optimized LinkedIn / Twitter thread starter on the topic of [insight/topic]. Hook the reader in line 1, give 3 concise value points, and ask a discussion question.',
    exampleUsage: '/socialpost Why 90% of people use ChatGPT wrong and how slash commands fix it'
  },
  {
    id: 91,
    command: '/emailmarketing',
    action: 'marketing email',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Write a promotional email broadcast announcing [product/offer]. Include: 3 curiosity-inducing subject lines, preview text, storytelling hook, product benefit bullet list, and single CTA button copy.',
    exampleUsage: '/emailmarketing Launching a 48-hour flash sale for our digital marketplace library'
  },
  {
    id: 92,
    command: '/seotitle',
    action: 'SEO-friendly title',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Generate 7 SEO-optimized page titles (under 60 characters) and corresponding meta descriptions (under 155 characters) targeting the primary keyword: [target keyword].',
    exampleUsage: '/seotitle ChatGPT slash prompts cheatsheet pdf download'
  },
  {
    id: 93,
    command: '/productdesc',
    action: 'product description',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Write a compelling e-commerce product description for [product]. Highlight the emotional transformation, list 4 tangible features with translated customer benefits, and include FAQ bullets.',
    exampleUsage: '/productdesc 100 Trending ChatGPT Slash Prompts PDF & Interactive Vault'
  },
  {
    id: 94,
    command: '/brandvoice',
    action: 'define a brand voice',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Define a brand voice and messaging guidelines for [brand/niche]. Outline: Tone characteristics, "We Sound Like / We Never Sound Like" comparison table, and 3 sample phrases.',
    exampleUsage: '/brandvoice Lumina Digital: Empowering, minimalist, anti-hustle, practical for Gen Z'
  },
  {
    id: 95,
    command: '/contentcalendar',
    action: 'monthly content calendar',
    category: 'Marketing & Social',
    page: 3,
    promptTemplate: 'Build a 4-week content calendar (3 posts per week) for [business/creator] on [platform]. For each post, define: Content Pillar, Hook / Title, Format (Carousel/Reel/Text), and CTA goal.',
    exampleUsage: '/contentcalendar Digital finance educator helping Gen Z students budget and save'
  },

  // Page 4: Marketing & Social (96-100)
  {
    id: 96,
    command: '/influencer',
    action: 'outreach message',
    category: 'Marketing & Social',
    page: 4,
    promptTemplate: 'Draft a short, non-spammy cold outreach DM or email to a creator/influencer proposing [collaboration/gifting]. Acknowledge a specific piece of their recent work and state what is in it for them.',
    exampleUsage: '/influencer Offering free access to our AI prompt vault in exchange for honest feedback'
  },
  {
    id: 97,
    command: '/landingpage',
    action: 'landing page copy',
    category: 'Marketing & Social',
    page: 4,
    promptTemplate: 'Write high-conversion landing page copy for [product]. Include: Hero Headline & Subhead, Problem statement, 3 Solution pillars, Social proof snippet, and Final risk-reversal CTA.',
    exampleUsage: '/landingpage Digital prompt cheat sheet enabling instant ChatGPT slash shortcuts'
  },
  {
    id: 98,
    command: '/testimonial',
    action: 'sample testimonial',
    category: 'Marketing & Social',
    page: 4,
    promptTemplate: 'Draft 3 realistic, persuasive customer testimonials for [product]. Structure with: Initial skepticism, specific breakthrough result achieved, and why they recommend it over alternatives.',
    exampleUsage: '/testimonial Student using the 100 ChatGPT slash prompts for exam revision and essays'
  },
  {
    id: 99,
    command: '/videoscript',
    action: 'video script',
    category: 'Marketing & Social',
    page: 4,
    promptTemplate: 'Write a 45-second high-retention short-form video script (Reel/TikTok) showcasing [product/tip]. Include: 0-3s visual hook, on-screen text directions, fast paced body, and strong CTA.',
    exampleUsage: '/videoscript How typing "/plan" or "/eli5" in ChatGPT saves 2 hours of study time daily'
  },
  {
    id: 100,
    command: '/analytics',
    action: 'KPIs for a campaign',
    category: 'Marketing & Social',
    page: 4,
    promptTemplate: 'Define the core KPI measurement framework for a marketing campaign launching [product/campaign]. Detail Primary North Star metric, Secondary vanity vs sanity metrics, and benchmark goals.',
    exampleUsage: '/analytics Email marketing flash sale campaign for a digital download product catalog'
  }
];
