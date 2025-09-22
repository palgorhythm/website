# Jacob Richards Portfolio

Professional portfolio website for Jacob Richards - drummer, producer, and software engineer. Featured on NBC, Showtime, and creator of the electronic music project BATTERY.

🔗 **Live Site**: [jacobrichards.net](https://jacobrichards.net)

## Overview

A modern, responsive portfolio showcasing:

- **Music Projects** - Jazz collaborations, BATTERY electronic project, TV/film work, and tours
- **Professional Experience** - Software engineering roles at Discord, Mothership, and teaching positions
- **Live Gigs** - Integrated Google Calendar for upcoming and past performances
- **Interactive Media Player** - Built-in YouTube player featuring BATTERY tracks

## Features

- ⚡ **Modern Stack** - Next.js 15, TypeScript, Tailwind CSS
- 🎵 **Integrated Music Player** - YouTube embed with playlist functionality
- 📅 **Live Gig Calendar** - Google Calendar integration via Netlify Functions
- 🎨 **Interactive Animations** - Framer Motion with particle background
- 📱 **Fully Responsive** - Optimized for all device sizes
- 🔍 **SEO Optimized** - Open Graph meta tags for rich social media previews
- 🔋 **Custom Branding** - Battery emoji favicon and BATTERY color scheme

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom gradient themes
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify with Netlify Functions
- **Calendar API**: Google Calendar API integration

## Project Structure

```
├── components/          # React components
│   ├── ModernHero.tsx   # Landing hero section
│   ├── ModernMusic.tsx  # Music projects showcase
│   ├── GigsSection.tsx  # Live calendar integration
│   ├── ModernAbout.tsx  # Experience & skills
│   ├── ModernContact.tsx# Contact methods & social links
│   └── ...
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper with global styles
│   └── index.tsx        # Main page with all sections
├── netlify/functions/   # Serverless functions
│   └── gigs.ts          # Google Calendar integration
├── styles/              # Global CSS and Tailwind config
└── public/              # Static assets
```

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local with:
   GOOGLE_CLIENT_EMAIL=your-service-account-email
   GOOGLE_PRIVATE_KEY=your-private-key
   GOOGLE_CALENDAR_ID=your-calendar-id
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or use Netlify Dev for functions
   netlify dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `netlify dev` - Run with Netlify Functions locally

## Key Components

### Music Section
Showcases four main project categories:
- **Artist Collaborations** - Jazz and contemporary performances
- **BATTERY** - Solo electronic project with Bandcamp integration
- **TV & Film** - NBC, Showtime, and HBO Max credits
- **Tours** - National and international touring history

### Gigs Calendar
Real-time integration with Google Calendar displaying:
- Upcoming shows with venue details and times
- Past performance history
- Responsive horizontal scrolling design

### Interactive Elements
- Particle background animation with mouse interaction
- YouTube player with BATTERY track playlist
- Smooth scroll navigation between sections
- Hover animations and transitions throughout

## Deployment

The site is deployed on Netlify with:
- Automatic builds from the main branch
- Netlify Functions for Google Calendar API
- Custom domain: jacobrichards.net

## Social Media Integration

Includes comprehensive Open Graph and Twitter Card meta tags for rich previews on:
- Facebook, LinkedIn, Discord
- Twitter/X with large image cards
- iMessage and other messaging platforms

## Contact

For technical questions about this portfolio site, reach out via the contact methods listed on [jacobrichards.net](https://jacobrichards.net).