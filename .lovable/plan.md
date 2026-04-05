
# Investy — AI-Powered Investing Platform

## Design System Setup
- Update CSS variables and Tailwind config with the Investy dark theme colors (#0B0B12 background, #14141E surfaces, #00F0A0 accent, #7C5CFC secondary, etc.)
- Import Inter font from Google Fonts in index.html
- Set border-radius tokens (12px cards, 8px buttons/inputs)

## Routing
Set up React Router with all specified routes. Placeholder pages for: `/signup`, `/onboarding`, `/home`, `/trade`, `/research`, `/podcast`, `/strategy/:id`, `/execute/:id`, `/approve/:id`.

## Welcome Screen (`/`)
- Full-screen dark background, centered content, max-width 430px
- Circular avatar/logo with gradient border (#00F0A0 → #7C5CFC)
- "Hi, I'm Investy" heading (24px bold white)
- Two lines of muted subtext (14px and 13px)
- Full-width "Let's go" button (#00F0A0 bg, dark text, 600 weight, 12px radius)
- Staggered fade-in animation on load (avatar → text → button)
- No nav bar
- Button navigates to `/signup`
