# Qbnox Systems - AI Coding Instructions

## Project Overview
A static corporate website for Qbnox Systems, based on the **FlexStart Bootstrap template**. The site uses Bootstrap 5.3.3 and is styled with SCSS.

## Architecture & Structure
- **HTML Files**: Root directory contains all page templates (`index.html`, `blog.html`, etc.).
- **CSS/SCSS**: Modular SCSS in `assets/scss/`.
  - `layouts/`: Core layout components (header, footer, nav).
  - `sections/`: Individual page sections (hero, about, services).
  - `main.scss`: Main entry point (compiles to `assets/css/main.css`).
- **JavaScript**:
  - `assets/js/main.js`: Main template logic (scroll, mobile nav, AOS).
  - `assets/js/blog-side-widget.js`: Dynamically generates the "Recent Posts" sidebar.
- **Vendors**: Third-party libraries are local in `assets/vendor/`.

## Key Patterns & Conventions

### 1. Adding a New Section
To add a new section to a page:
1. Create a new `_new-section.scss` in `assets/scss/sections/`.
2. Import it in `assets/scss/_sections.scss`.
3. Add the HTML markup to the relevant page (e.g., `index.html`) using the `<section id="id" class="name section">` pattern.

### 2. Updating the Blog
The blog follows a structured pattern:
- **New Post**: Create a new HTML file (e.g., `blog-new.html`) based on `blog-details.html`.
- **Sidebar Integration**: To ensure the new post appears in the "Recent Posts" sidebar, you **must** update the `recentPosts` array in `assets/js/blog-side-widget.js`.

### 3. Styling
- Use CSS variables defined in `assets/scss/_variables.scss` for colors and fonts.
- Prefer `color-mix(in srgb, var(--accent-color), transparent 90%)` for background tints, matching the existing template style.

## Critical Workflows
- **SCSS Compilation**: This project relies on local compilation (e.g., VS Code "Easy Compile" extension). Always ensure `assets/css/main.css` is updated after SCSS changes.
- **Forms & Environment Variables**: Contact and Newsletter forms are handled by PHP scripts in `forms/`. They rely on `$_SERVER` variables for configuration:
  - `SMTP_RECV_EMAIL`: Recipient address.
  - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_PORT`: SMTP settings.
  - `GOOGLE_KEY`: Secret key for reCAPTCHA v3.
- **reCAPTCHA**: The site uses Google reCAPTCHA v3. The site key is embedded in `index.html`.

## Common Pitfall
Avoid hardcoding "Recent Posts" into the blog sidebar HTML. It is dynamically rendered via `assets/js/blog-side-widget.js`.
