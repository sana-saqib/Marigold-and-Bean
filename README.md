# Marigold & Bean

A fully static, multi-page website for a fictional neighborhood cafe, built for **Assignment 01 — Web Technologies** (Faculty of Information and Technology). Built with plain HTML5, CSS3, and vanilla JavaScript only — no frameworks, backend, or database.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero introduction, featured menu items, visiting steps, reviews |
| About | `about.html` | Cafe story, values, hours table, FAQ accordion |
| Menu | `menu.html` | Full menu grid with a live category filter |
| Gallery | `gallery.html` | Photo grid with a keyboard-accessible lightbox/slider |
| Contact | `contact.html` | Contact form with client-side validation, location, hours |

Every page shares the same header/navigation and footer.

## Folder structure

```
marigold-and-bean/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/          (original SVG illustrations, no stock photos)
└── README.md
```

## HTML

Semantic HTML5 throughout (`header`, `nav`, `main` sections via `<section>`, `article`, `footer`), a real `<table>` for cafe hours, and a validated contact `<form>`.

## CSS

- Single external stylesheet (`css/style.css`) reusing one design-token system (`--espresso`, `--cream`, `--caramel`, `--sage`, `--blush`).
- Flexbox (header, hero, footer, contact layout) and CSS Grid (menu, values, gallery) for layout.
- Responsive down to mobile with breakpoints at 860px, 720px, and 640px/520px.
- `prefers-reduced-motion` respected: animations and smooth scrolling are disabled for users who ask for it.

## JavaScript features (`js/script.js`)

1. **Hamburger navigation menu** — collapses into a toggleable panel on small screens.
2. **Gallery lightbox/slider** — click any thumbnail to open a full-size view with next/prev buttons and arrow-key navigation.
3. **Contact form validation** — required fields, email/phone format checks, inline error messages, and a success confirmation, all client-side (no backend to submit to).
4. **FAQ accordion** — one panel open at a time, animated height.
5. **Menu category filter** — filters the menu grid by "Drinks"/"Bakes" without a page reload.
6. **Scroll-reveal** — card grids fade/slide in as they enter the viewport (`IntersectionObserver`), skipped entirely if the user has reduced motion enabled.
7. **Back-to-top button** and **active nav-link highlighting** as small supporting touches.

## Images

All artwork in `images/` is original hand-coded SVG illustration created for this project (no stock photography), to keep the design fully original and avoid any copyright concerns.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.
