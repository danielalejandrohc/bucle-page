# Architecture One-Page Website

A minimalist, responsive one-page site to showcase architecture services: Interior Design, Residential Design, Remodeling, and Permit Management. Includes English/Spanish toggle, WhatsApp contact, and social links.

## Features

- Minimal, responsive layout using vanilla HTML/CSS/JS
- Sections with photo grids (4 placeholders each; add more by duplicating a `figure.card`)
- Multilingual (EN/ES) toggle with persisted choice
- WhatsApp quick contact to +503 77432781
- Footer with Instagram and Facebook link placeholders
- Ready for GitHub Pages
- Local dev server command
 - Dev Container support (reopen in container with Node LTS)

## Project Structure

```
/ (repo root)
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   └── placeholder.svg
├── .devcontainer/
│   ├── devcontainer.json
│   └── Dockerfile
├── package.json
└── README.md
```

## Customize

- Update brand name in `index.html` (elements with `data-i18n="brandName"` and `brandShort`) or edit the text in `script.js` translations.
- Replace logos in `assets/` with your PNG or SVG files, but keep the same filenames or update `index.html` references.
- Replace placeholder images in each section by editing the `<img src="./assets/placeholder.svg" ...>` paths.
- Add more photos by duplicating `figure.card` items inside any `.grid`.
- Set your social links in `script.js` (`initSocial()`), or directly update the `#instagram-link` and `#facebook-link` `href` values in `index.html`.

## Local Development

1. Install Node.js (LTS) if you don't have it.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
4. Open your browser at http://localhost:5173

## Dev Container (Recommended)

This repo includes a VS Code Dev Container for a preconfigured environment with Node LTS.

Steps:

1. Install the "Dev Containers" extension in VS Code.
2. With this folder open in VS Code, press Ctrl+Shift+P (or F1) and run: "Dev Containers: Reopen in Container".
3. The first build will take a few minutes. After it opens:
   - Dependencies are installed automatically (via `postCreateCommand`).
   - Start the server inside the container terminal:
     ```bash
     npm run dev
     ```
   - VS Code will auto-forward port 5173 and open your browser.

## Deploy to GitHub Pages

You can deploy from the repository root (recommended for a simple static site):

1. Commit and push your files to the `main` branch.
2. In your GitHub repo, go to Settings → Pages.
3. Under "Build and deployment", set:
   - Source: `Deploy from a branch`
   - Branch: `main` and folder `/ (root)`
4. Save. Your site will be available at the URL provided by GitHub Pages.

Alternatively, if you prefer the `docs/` method:

- Move the site files into a `docs/` folder and set GitHub Pages to serve from `main` → `/docs`.

## WhatsApp Link

The contact button uses `https://wa.me/50377432781` and auto-fills a localized message depending on the language toggle.

## License

MIT
