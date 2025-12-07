# Creative Works Manager (CWM)

A small single-page web app for managing plays, poems, and prose pieces.  
Users can browse works, filter by type and tags, view details, and edit or delete entries—all client-side.

Live site: **https://cwm.bw8.org**  
Hosted on **Vercel**, behind **Cloudflare DNS**.

---

## Overview

- **Frontend framework:** Angular 21 (standalone components, no NgModules)
- **UI library:** Angular Material (MDC-based, Material 3 theming)
- **Language:** TypeScript
- **Styling:** CSS + SCSS theming (`custom-theme.scss`), light Tailwind import for utilities
- **Routing:** Angular Router (list view, detail view, edit view)
- **State/data:** In-memory service (`WorksService`) providing sample works
- **Build & deploy:** Vercel static deployment from GitHub
- **Domain:** `cwm.bw8.org` → CNAME to `cwm-snowvy.vercel.app` via Cloudflare

This project is intentionally front-end only: no authentication, no backend, and no persistent storage. It’s a UI/UX and deployment demo.

---

## Tech Stack Details

### Angular

- **Angular 21** using:
  - `bootstrapApplication` in `src/main.ts`
  - **Standalone components** (e.g. `WorkDetailComponent`, list/dashboard component)
  - **Angular Router** for:
    - `/` – main works dashboard
    - `/detail/:id` – work detail view
    - `/edit/:id` – work edit form
- **Zone.js** is included in `main.ts` for change detection.

### Angular Material

- Material 3 theming via `custom-theme.scss`:

  - Uses `@use '@angular/material' as mat;`
  - Defines a theme with Material palettes (primary/tertiary) and typography
  - Applies theme at the `html`/`body` level

- Components in use:
  - `MatCardModule` – work cards and detail view
  - `MatButtonModule` – primary actions, Edit/Delete, New Work
  - `MatIconModule` – icons for type, actions, and metadata
  - `MatChipsModule` – tags and status badges

### Styling / Layout

- Global styles in `src/styles.css`:
  - Resets and base typography
  - Imports Tailwind (`@import "tailwindcss";`) for utility classes if needed
- Background implemented in `app.component.css`:
  - Uses a **Lara Croft archer** image at `src/assets/images/bg.png`
  - Combined with a soft gradient:

    ```css
    background-image:
      linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%),
      url('../assets/images/bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: soft-light;
    ```

- Detail page layout (`work-detail.component.css`):
  - Centered card (`max-width: 900px`)
  - Top row inside the card: back arrow on the left, Edit/Delete on the right
  - Metadata row (Created / Modified)
  - Tag chips
  - Poem/content displayed in a styled `<pre>` block
  - Notes section with highlighted background

### Data Layer

- `WorksService` holds a collection of `Work` items in memory.
- `Work` model includes fields like:
  - `id`, `title`, `type`, `status`
  - `tags`, `content`, `notes`
  - `dateCreated`, `lastModified`
- All CRUD actions (create, edit, delete) happen in the browser; data is not persisted across refreshes.

---

## Build & Scripts

Defined in `package.json`:

- `npm start` → `ng serve`
- `npm run build` → `ng build`
- `npm run watch` → `ng build --watch --configuration development`
- `npm test` → `ng test` (not heavily used for this demo)

`angular.json` build setup:

- Builder: `@angular/build:application`
- Entry: `"browser": "src/main.ts"`
- Assets:

  ```json
  "assets": [
    "src/favicon.ico",
    "src/assets"
  ]

Deployment
Repo: GitHub (BradWyatt-code/cwm)
CI/CD: Vercel is connected to the GitHub repo
Branch: main
Build command: npm run build
Output directory: dist/cwm
Default Vercel domain: cwm-snowvy.vercel.app
Production custom domain:
Cloudflare DNS:

Notes / Limitations
All data is ephemeral and lives only in memory.
No login, multi-user features, or backend storage.
Designed as a portfolio / demo app to show:
Angular 21 + standalone components
Material theming and UI polish
Clean deployment pipeline (GitHub → Vercel → Cloudflare custom domain)
Visual design over a static image background
This file exists so future-you can quickly remember what’s going on under the hood without spelunking through Angular configs at midnight.
