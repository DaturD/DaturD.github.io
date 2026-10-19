# Deniel Datur — Portfolio Redesign

A responsive, dark developer portfolio using plain HTML, CSS, and JavaScript. Designed for GitHub Pages; no build step or paid hosting is required.

## Preview locally
Open `index.html` in your browser. For a local server, run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Install into your existing repository
1. Back up your current `index.html`, `style.css`, and `script.js`.
2. Copy the redesigned `index.html`, `style.css`, and `script.js` into the root of `DaturD.github.io`.
3. Keep your existing `assets/` folder and `.nojekyll` file. This design uses your existing asset paths.
4. Replace the placeholder email `your.email@example.com` in `index.html` and `script.js`.
5. Add your portrait at `assets/profile/deniel.jpg`.
6. Add project screenshots, demo videos, certificate images, and resume using the paths below.
7. Test locally, then commit and push to GitHub.

## Asset paths expected
- `assets/profile/deniel.jpg`
- `assets/projects/signbridge/01.webp` and `demo.mp4`
- `assets/projects/edusync/01.webp` and `demo.mp4`
- `assets/projects/gwd/01.webp`
- `assets/certificates/kaggle-python.jpg`
- `assets/certificates/kaggle-intro-programming.jpg`
- `assets/certificates/kaggle-intro-ml.jpg`
- `assets/resume/Deniel_Datur_Resume.pdf`

Missing images show a designed placeholder rather than a broken-image icon. Add your real files to make the site complete.

## Before publishing
- Replace the placeholder email address everywhere.
- Confirm that every linked repository and demo is public and ready to review.
- Make sure project descriptions accurately describe your actual contribution and technologies.
- Verify resume and certificate files before pushing. Anything in a public Pages repository can be accessed by visitors.
- This is a static contact form: submitting it opens the visitor's email app. It does not send data to a server.
- `script.js` has a local browser theme preference and filters project cards; it requires no dependencies.

## GitHub Pages
GitHub Pages serves static HTML, CSS, JavaScript, images, and PDFs. Keep `index.html` at the publishing root and use the relative asset paths in this template. Preserve `.nojekyll` if your repository already uses it.
