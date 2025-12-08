# Edufy Landing Page Design Guidelines

## Design Approach
Reference-based approach drawing from successful EdTech platforms (Coursera, Udemy) and modern SaaS products (Linear, Notion) with Indian educational context. Clean, trustworthy aesthetic emphasizing AI capabilities and ease of use.

## Core Visual Language

### Typography
- **Headings**: Inter or Plus Jakarta Sans (600-700 weight)
- **Body**: Inter or System fonts (400-500 weight)  
- **Hierarchy**: h1 (48-60px), h2 (36-42px), h3 (24-30px), body (16-18px)
- **Mobile scaling**: Reduce by 25-30%

### Layout System
- **Container**: max-w-7xl for content sections, max-w-6xl for text-heavy areas
- **Spacing primitives**: Tailwind units of 4, 6, 8, 12, 16, 20 for consistent rhythm
- **Section padding**: py-16 to py-24 (desktop), py-12 to py-16 (mobile)
- **Grid system**: 12-column responsive grid

### Visual Treatment
- **Teal/Cyan gradient**: Primary brand gradient (from teal-600 #0D9488 to cyan-600 #0891B2)
- **Accent gradient**: Lighter teal variants for cards and CTAs
- **Cards**: Soft shadows, subtle borders, rounded corners (12-16px radius)
- **Glassmorphism**: Subtle backdrop blur for buttons over hero images

## Section-Specific Designs

### Hero Section (100vh)
- **Layout**: Full-viewport with large hero image background (Indian students in modern classroom)
- **Content**: Left-aligned or centered text overlay with blurred-background CTAs
- **CTAs**: Two prominent buttons - "Request Demo" (primary gradient) and "Download App" (secondary outline/white)
- **Background treatment**: Gradient overlay (60% opacity) over hero image for text legibility

### Features Grid (6 items)
- **Layout**: 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- **Cards**: Icon + title + description, hover lift effect
- **Icons**: Use Heroicons via CDN - outline style for consistency
- **Visual**: Each card with subtle gradient border-top accent

### How It Works (3 steps)
- **Layout**: Horizontal timeline/stepped progression with connecting lines
- **Content**: Icon/number + heading + description for each step
- **Visual**: Progressive gradient intensity for step numbers

### Benefits Section (3 stakeholder cards)
- **Layout**: 3-column grid with image + content for Schools, Teachers, Parents
- **Images**: Indian context - classroom/principal, teacher, parent-child studying
- **Cards**: Equal height, icon at top, bullet points for key benefits

### Pricing (3 tiers)
- **Layout**: 3-column comparison table with featured tier highlighted
- **Visual**: Middle tier (Professional) with gradient border and "Most Popular" badge
- **Content**: Tier name, price (₹), feature checklist, CTA button per tier

### Testimonials
- **Layout**: 2-3 column grid or carousel
- **Cards**: Quote + school logo placeholder + name + role + Chennai school name
- **Visual**: Soft background cards with quotation mark accent

### Contact Form
- **Layout**: 2-column split - form (60%) + info/image (40%)
- **Form fields**: School Name, Email, Phone (+91 prefix), Message
- **Right column**: Contact details (Chennai address, phone, email) + trust indicators

### Footer
- **Layout**: 4-column structure - Logo/about, Quick Links, Contact, Social
- **Content**: Chennai address, phone +91 9894836016, social icons, copyright
- **Visual**: Dark background with lighter text, minimal divider lines

## Images Strategy

### Required Images (Indian Context)
1. **Hero**: Wide-angle modern Indian classroom with diverse students (uniforms), natural lighting
2. **Benefits - Schools**: Principal/administrator with students in school setting
3. **Benefits - Teachers**: Indian teacher using tablet/technology with students
4. **Benefits - Parents**: Indian parent helping child with homework/app on phone
5. **Features section**: Indian students collaborating, using devices (optional supporting images)
6. **Testimonials**: School logo placeholders or stock building photos

All images should showcase: Modern Indian schools, diverse students in uniforms, authentic educational settings from Chennai/South India region, contemporary learning environments.

## Component Library

### Buttons
- **Primary**: Gradient background, white text, medium roundedness (8px)
- **Secondary**: White/outlined, gradient text/border
- **Sizes**: Large (hero CTAs), medium (forms), small (cards)

### Cards
- **Elevation**: shadow-lg on hover, shadow-md default
- **Padding**: p-6 to p-8
- **Border radius**: rounded-xl (12px)

### Forms
- **Inputs**: Clean borders, focus states with gradient outline
- **Labels**: Above inputs, small caps or medium weight
- **Validation**: Inline error states

### Navigation
- **Header**: Sticky top navigation with logo left, links center/right, CTA button
- **Mobile**: Hamburger menu with slide-in panel

## Animations (Minimal)
- **Scroll reveals**: Fade-up on section entry (subtle, 300-400ms)
- **Hover states**: Card lifts, button scale (1.02-1.05)
- **No**: Complex parallax, excessive motion, distracting autoplay

## SEO Implementation Notes
- Semantic HTML5 structure throughout
- H1 only in hero ("Smart School Management, Simplified")
- Alt text for all images describing Indian educational context
- Schema.org: Organization + SoftwareApplication with Chennai location data
- Meta descriptions under 160 characters, include "Chennai" and "India" keywords