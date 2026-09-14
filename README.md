# Marigold & Bean

A fully static, multi-page cafe website for Assignment 01 - Web Technologies. It uses plain HTML5, CSS3, and vanilla JavaScript only: no framework, backend, or database.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, interactive morning carousel, featured menu, visiting steps, and reviews |
| About | `about.html` | Cafe story, values, hours table, and FAQ accordion |
| Menu | `menu.html` | Full menu grid with a category filter |
| Gallery | `gallery.html` | Photo gallery with a keyboard-accessible lightbox |
| Contact | `contact.html` | Client-side validated contact form, location map, and contact details |

Every page shares the same header, navigation links, footer, stylesheet, and JavaScript file.

## Structure

```
marigold-and-bean/
|- index.html
|- about.html
|- menu.html
|- gallery.html
|- contact.html
|- css/style.css
|- js/script.js
|- images/
`- README.md
```

## Assignment requirements covered

- Semantic HTML5, including sections, articles, an aside, a table, and a form.
- One shared external stylesheet using CSS variables, Flexbox, CSS Grid, and responsive breakpoints.
- Five properly interlinked pages with a consistent navigation bar and footer.
- Interactive JavaScript features: mobile navigation, home carousel, FAQ accordion, menu filtering, gallery lightbox, contact-form validation, scroll reveal, and a back-to-top control.
- Responsive layout plus reduced-motion support.

## Images

The `images/` folder contains the local artwork and cafe photography used by the pages. Keep it with the HTML, CSS, and JavaScript folders when sharing or deploying the website.

## Run locally

No build step is needed. Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
