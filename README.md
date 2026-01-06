# Dr. Gorima Chakraborty - Professional Website

A modern, professional React website for Dr. Gorima Chakraborty with smooth animations and a clean design.

## Features

- **Sticky Navigation Bar** - Smooth scrolling navigation with active section highlighting
- **Hero Section** - Elegant landing section with animated title
- **Education Section** - Multiple degree cards with placeholder content ready for your details
- **Services Section** - Professional services showcase
- **Contact Section** - Contact form and information display
- **Smooth Animations** - Powered by Anime.js for professional transitions
- **Responsive Design** - Works beautifully on all devices
- **Customizable Colors** - Easy color scheme management via CSS variables

## Color Scheme

Colors are defined in `src/index.css` using CSS variables:

- `--color-primary`: #ffffff (White - Main)
- `--color-secondary`: #ff69b4 (Pink - Secondary)
- `--color-tertiary`: #ff1493 (Deep Pink - Tertiary)

You can easily change these colors by modifying the variables in `src/index.css`.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization

### Adding Education Details

Edit `src/components/About.js` to add your actual degree information. Replace the placeholder content in the `degree-card` components.

### Updating Contact Information

Edit `src/components/Contact.js` to add your actual contact details (address, phone, email).

### Changing Colors

Modify the CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #ffffff;      /* Main color */
  --color-secondary: #ff69b4;    /* Secondary color */
  --color-tertiary: #ff1493;     /* Tertiary color */
}
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technologies Used

- React 18
- Anime.js (for animations)
- CSS3 (custom styling, no frameworks)

