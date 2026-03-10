Create a complete React multi-page website for "Havos" — a digital transformation & IT services company. Use Vite + React + React Router. The design should replicate the layout patterns from antimatterai.com but with a WHITE/LIGHT theme using blue (#2B5CFF) as the primary accent color.

## Project Setup
- Use Vite with React template
- Install: react-router-dom, framer-motion (for animations)
- Use CSS Modules or a single global CSS file
- The logo file is at ./public/logo.png (Havos logo — bold blue text with diagonal lines through the "A")

## Design System
- **Primary color:** #2B5CFF (Havos blue from the logo)
- **Background:** #FFFFFF (white), off-white: #FAFBFD
- **Text:** #0A0F1C (near-black), secondary: #4A5068, muted: #8890A4
- **Border:** #E8EAF0
- **Blue pale:** #EEF2FF (for card backgrounds)
- **Font:** "Outfit" from Google Fonts (weights 300-900)
- **Mono font:** "JetBrains Mono" for code/numbers
- **Border radius:** 8px small, 12px medium, 16px large, 24px xl
- **Theme:** Clean, premium, white with blue accent — NOT dark theme

## Pages to Create (with React Router)

### 1. HOME PAGE (/)
Replicate antimatterai.com homepage structure:
- **Hero section:** Light blue gradient rays from top, subtle grid background, centered layout with:
  - "HAVOS" label in blue
  - Large heading: "Building Digital Solutions That Drive Growth" (blue highlight on "That Drive Growth")
  - Subtitle paragraph
  - "Start Your Project" CTA button (blue)
  - Stats row below: "50+" Projects Delivered, "98%" Client Satisfaction, "24/7" Support
- **Services section:** 8 service cards in 3-column grid (on off-white bg), each with:
  - Number (01-08) in monospace blue
  - Title, description, "Services" label, tag pills
  - Hover: lift up, blue glow shadow, top blue gradient line
- **Case Studies section:** Left column with 5 numbered project items (hover highlights blue), right column with sticky preview card
- **Trusted By marquee:** Infinite horizontal scroll of client name pills with fade edges
- **CTA section:** Centered with blue glow background, heading + button

### 2. ABOUT PAGE (/about)
- Hero with "About Havos" label + title
- Two-column layout: left = Who We Are + Mission text, right = Why Choose Havos with 4 value cards
- Process section (off-white bg): 4-step cards (Discovery, Design, Develop, Launch)

### 3. SERVICES MAIN PAGE (/services)
- All 8 service cards in responsive grid
- Each card links to its dedicated service page

### 4. INDIVIDUAL SERVICE PAGES (/services/:slug)
One page per service with dynamic routing:
- services/web-app-development — Website & App Development
- services/digital-marketing — Digital Marketing
- services/cybersecurity — Cybersecurity
- services/it-consulting — IT Consulting
- services/ai-automation — AI & Workflow Automation
- services/ecommerce — E-Commerce Solutions
- services/whatsapp-automation — WhatsApp Automation & Backup
- services/custom-lms — Custom Learning App (LMS)

Each service page has:
- Back link to services
- Service number + title + full description
- Tag pills in blue
- CTA card at bottom

### 5. CASE STUDIES PAGE (/case-studies)
- Full page listing of 5 projects
- Each project: left side info + tags, right side gradient preview card
- Grid layout per project

### 6. BLOG PAGE (/blog)
- 3 blog preview cards in grid
- Each card: thumbnail area with icon, tag, title, excerpt
- Hover animation (lift + blue border glow)

### 7. CAREERS PAGE (/careers)
- Intro section
- 5 job listings as interactive rows (title, type, location, arrow icon)
- Hover highlights with blue tint

### 8. CONTACT PAGE (/contact)
- Two columns: left = contact info (email, phone, location), right = form
- Form fields: Name, Email, Company, Project Details (textarea)
- Blue submit button
- Input focus state: blue border

### 9. FAQ PAGE (/faq)
- Accordion-style FAQ with 5 items
- Click to expand/collapse with + icon rotating to ×
- Smooth height animation

### 10. PRIVACY POLICY (/privacy) & TERMS (/terms)
- Simple text pages with legal placeholder content

## Global Components

### Navbar (fixed, all pages)
- Logo (./public/logo.png) on left, links on right
- Links: Work, About, Services (dropdown), Blog, Careers, Contact
- Services dropdown: mega menu with all 8 services (2-column grid) - shows on hover
- "Start Your Project" blue CTA button
- On scroll: white background with blur + bottom border
- Mobile: hamburger menu

### Footer (all pages)
- 5-column grid: Brand + 4 link columns (Services, Solutions, Company, Resources)
- Brand column: logo + description + email
- Bottom bar: copyright, "Serving clients globally", live clock (HH:MM:SS), social icons (in, 𝕏, ig)
- Live clock updates every second in JetBrains Mono font

## Animations & Interactions
- Scroll reveal: elements fade up when entering viewport (use Framer Motion or Intersection Observer)
- Service cards: hover lifts card, adds blue shadow glow, shows top blue gradient line
- Case study items: hover indents left and highlights blue
- Nav: smooth transition between transparent and blurred white on scroll
- Services dropdown: fade in/slide down with smooth transition
- FAQ: smooth height toggle animation
- Stats: large blue numbers
- Marquee: infinite horizontal CSS animation with mask fade on edges
- CTA buttons: hover lifts + blue box shadow glow
- Page transitions: smooth scroll to top on navigation

## File Structure
src/
components/
Navbar.jsx
Footer.jsx
ServiceCard.jsx
Reveal.jsx (scroll animation wrapper)
pages/
Home.jsx
About.jsx
Services.jsx
ServiceDetail.jsx
CaseStudies.jsx
Blog.jsx
Careers.jsx
Contact.jsx
FAQ.jsx
Privacy.jsx
Terms.jsx
data/
services.js
caseStudies.js
blog.js
styles/
global.css
App.jsx
main.jsx
public/
logo.png

## Important Notes
- Make sure all routing works with React Router v6+
- Use the Havos logo from ./public/logo.png in navbar and footer
- All hover effects should have smooth transitions
- Keep the design clean and premium — white backgrounds, blue accents only
- No dark theme — this is a light/white themed site
- Mobile responsive with hamburger nav
- Use semantic HTML