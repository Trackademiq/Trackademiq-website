# Edufy - Edu-Trakup Landing Page

## Overview
Modern, SEO-optimized landing page for Edufy, an EdTech company based in Chennai, India. The site promotes Edu-Trakup, an AI-powered mobile app connecting students, teachers, parents, and administrators.

## Project Structure
```
├── client/                 # Frontend React application
│   ├── public/            # Static assets (favicon, robots.txt, sitemap.xml)
│   ├── src/
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
├── attached_assets/        # Generated images
│   └── generated_images/   # AI-generated Indian student images
└── design_guidelines.md    # Design system documentation
```

## Key Features

### Landing Page ("/")
- Hero section with "Smart School Management, Simplified" headline
- 6 feature cards (AI Analytics, Attendance, Fees, Homework, Messaging, Multi-School)
- 3-step onboarding process (How It Works)
- Benefits for Schools, Teachers, and Parents
- 3-tier pricing (Starter, Professional, Enterprise)
- Testimonials from Chennai schools
- Contact form with validation
- Responsive design with smooth Framer Motion animations
- SEO optimized with Schema.org structured data
- Live Chat Widget (bottom-right corner)

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
- **Colors**: Blue/purple gradient theme (Violet-600 to Indigo-600)
- **Typography**: Inter and Plus Jakarta Sans
- **Spacing**: Consistent 4px base unit
- **Border Radius**: Rounded-md (6px) for most elements

## Company Details
- **Location**: Chennai, India (123 Tech Park, OMR, Chennai 600096)
- **Phone**: +91 9894836016
- **Email**: contact@edufy.in

## Running the Project
The application runs with `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

## Recent Changes
- December 2024: Initial landing page implementation
  - Generated AI images of Indian students, teachers, and parents
  - Built all 8 landing page sections
  - Implemented contact form with backend validation
  - Added SEO meta tags, Schema.org data, robots.txt, sitemap.xml
  - Added Blog, Case Studies, and Product Tour pages
  - Implemented Live Chat Widget component
  - Added Google Analytics integration (placeholder ID)
  - Updated footer with links to extended pages
