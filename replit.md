# Trackademiq Landing Page

## Overview
Modern, SEO-optimized landing page for Trackademiq, an AI-powered education intelligence platform based in Chennai, India. The platform connects Students, Teachers, Parents, and Administrators through real-time analytics and automation.

## Project Structure
```
├── client/                 # Frontend React application
│   ├── public/            # Static assets (favicon, robots.txt, sitemap.xml)
│   ├── src/
│   │   ├── assets/        # Brand assets (logo)
│   │   ├── components/ui/ # Shadcn UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and query client
│   │   ├── pages/         # Page components
│   │   │   └── landing.tsx # Main landing page with all sections
│   │   ├── App.tsx        # Root application component
│   │   └── index.css      # Global styles and CSS variables
│   └── index.html         # HTML template with SEO meta tags
├── server/                 # Backend Express application
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # In-memory storage implementation
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle schemas and Zod validation
├── attached_assets/        # Generated assets
│   ├── generated_images/   # AI-generated Indian imagery
│   └── generated_videos/   # Promotional videos
└── design_guidelines.md    # Design system documentation
```

## Key Features

### Landing Page ("/")
- Hero section with "Next-Generation Education Systems" headline
- 8 feature cards (AI Analytics, Attendance, Marks, Fees, Homework, Messaging, Leave Management, Multi-Tenant)
- 3-step onboarding process (How It Works)
- Benefits for Schools, Teachers, and Parents
- Demo Request CTA (replaced pricing section)
- Testimonials from Chennai schools
- Contact form with validation
- Responsive design with smooth Framer Motion animations
- SEO optimized with Schema.org structured data
- Live Chat Widget with conversational demo request flow (bottom-right corner)
- Connected Intelligence section showing personalized tools for each user type

### Extended Pages
- **Blog** ("/blog") - EdTech articles and insights
- **Blog Post** ("/blog/:id") - Individual article pages
- **Case Studies** ("/case-studies") - Chennai school success stories
- **Product Tour** ("/product-tour") - Interactive feature walkthrough

### Technical Features
- Google Analytics integration (requires GA_MEASUREMENT_ID configuration)
- In-memory storage for contact form demo requests
- Backend API at POST /api/demo-requests

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, TypeScript
- **Validation**: Zod, React Hook Form
- **State**: TanStack Query
- **UI Components**: Shadcn/ui

## Design System
- **Colors**: Indigo/Violet gradient theme with Emerald (success) and Amber (warnings) accents
  - Primary: Indigo (#6366F1 light / #818CF8 dark)
  - Secondary: Emerald (#10B981 light / #34D399 dark)
  - Tertiary: Amber (#F59E0B light / #FBBF24 dark)
- **Typography**: System fonts (-apple-system, 'Segoe UI', Roboto)
- **Spacing**: Consistent 4px base unit
- **Border Radius**: Rounded-xl (12-20px) for premium feel
- **Role Colors**: Student=Indigo, Teacher=Emerald, Admin=Amber

## Company Details
- **Location**: G1 - CC Mithilla, Karnan Nagar, Polichalur, Chennai 600074, India
- **Phone**: +91 9894836016
- **Email**: info@trackademiq.com

## Running the Project
The application runs with `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

## Future Enhancements
- **Email Integration**: To enable automatic email notifications for demo requests, set up Resend or SendGrid integration. The chatbot collects user info and stores it, but email sending requires API key configuration.

## Recent Changes
- February 2026: Connected Intelligence Section & Enhanced Chatbot
  - Added new "Connected Intelligence" section showing personalized tools for Students, Teachers, Parents, and Administrators connected through AI analytics hub
  - Enhanced chat widget with conversational flow to collect demo request info (role, name, school, email, phone, interest)
  - Chat submissions stored via /api/demo-requests API
  - Hero headline forced to two lines consistently
  - Hero section redesigned to Zoho/Freshworks light background style
- February 2026: Section Reorganization
  - Moved "Transform Education with AI" (analytics preview) above "Comprehensive Education Intelligence" (features)
  - Merged "Get Started in 3 Easy Steps" and "Why Switch to Trackademiq" into single "Get Started" section
  - Updated navigation links to new #get-started anchor
- February 2026: Mobile Optimization Update
  - Horizontal swipeable carousels for features, testimonials, benefits on mobile
  - Reduced section padding on mobile only (py-10 vs sm:py-20 md:py-28)
  - Compact KPI cards on mobile with abbreviated labels
  - Student table limited to 3 rows on mobile (5 on desktop)
  - Added scrollbar-hide CSS utility for clean carousel scrolling
  - Hero illustration now visible on all screen sizes
- February 2026: Trackademiq Rebrand
  - Rebranded from Edufy to Trackademiq
  - New tagline: "Next-Generation Education Systems"
  - Added new AI graduation cap logo with circuit patterns
  - Replaced pricing section with Demo Request CTA
  - Updated features to 8 comprehensive modules
  - Generated new AI analytics promo video
  - Updated all meta tags and structured data
- January 2026: Major design refresh
  - Migrated from teal/coral to indigo/emerald/amber color palette
  - Implemented role-based color coding (Students=Indigo, Teachers=Emerald, Admin=Amber)
  - Enhanced glassmorphism effects and premium visual feel
- December 2024: Initial landing page implementation
