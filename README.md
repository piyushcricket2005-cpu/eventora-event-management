# Eventora — Event Management Website

Eventora is a responsive event discovery and registration website built as a web-design assignment. Visitors can browse upcoming experiences, search and filter events, save favourites, view event details, and register for events.

## Live demo

Add your deployed website URL here after deployment.

## Features

- Responsive layout for mobile, tablet and desktop screens
- Event cards with category, date, location and ticket price
- Live search across event titles, categories, descriptions and locations
- Category filters (Music, Technology, Art & Culture, Food and Business)
- Event detail modal with registration form
- Client-side validation for name, email, phone number and consent
- Registration records saved in browser LocalStorage
- Save/favourite events using LocalStorage
- Dark/light theme toggle with saved preference
- Newsletter demo form with LocalStorage persistence
- Accessible labels, keyboard support for event cards, and modal close via Escape

## Technologies used

- **HTML5** — semantic page structure and forms
- **CSS3** — custom styling, CSS Grid/Flexbox, responsive breakpoints and theme variables
- **JavaScript (Vanilla)** — rendering, filtering, validation, modal interactions and LocalStorage

## Run locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a modern browser.

For a local development server, you can use the VS Code Live Server extension.

## Project structure

```text
eventora/
├── index.html   # Main page and registration modal
├── styles.css   # Styling and responsive layout
├── script.js    # Event data and interactive functionality
└── README.md    # Project documentation
```

## How it works

The sample event data is stored in an array in `script.js`. JavaScript renders the event cards and updates them when a visitor searches or selects a category. Selecting a card opens a detail modal. The registration form validates the entered information before saving a registration object in LocalStorage. Saved events, theme preference and newsletter sign-ups are also stored locally in the browser.

> **Important implementation note:** This is a front-end demonstration. LocalStorage is browser-specific and is not a secure database. No real ticket, payment, email or server-side booking is performed. A production platform would require a backend, database, authentication, and a payment/booking provider.

## Deployment

### Deploy with Vercel

1. Push the project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) using GitHub.
3. Select **Add New → Project** and import the Eventora repository.
4. Keep the framework preset as **Other**. No build command or output directory is required for this static site.
5. Select **Deploy**.
6. Copy the generated live URL and add it to the Live demo section above and your assignment submission form.

You can also deploy the static files using Netlify or GitHub Pages.

## Customisation before submission

- Replace the sample event details, dates, venues and prices with details you want to present.
- Check that all image links load and that the site works on mobile.
- Add your name, course and assignment details if required by your instructor.
- Update this README with your actual GitHub and deployed website links.
