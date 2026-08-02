# Ara Bangis — Portfolio

A single-page, motion-driven portfolio for Araniza "Ara" Jaye Bangis, AI-driven video editor for DTC beauty & wellness brands. Built with plain HTML/CSS/JS — no build step, no dependencies to install.

## What's inside
```
index.html          the whole site
styles.css           design system + animations
script.js            scroll reveals, reel autoplay/mute, back-to-top
assets/
  img/profile.jpg    hero portrait
  videos/reel-1..5.mp4   compressed sample reels (~5MB each, web-optimized)
  posters/reel-1..5.jpg  poster frames for the reel cards
  docs/Araniza-Bangis-Resume.pdf   downloadable résumé
```

## Preview it locally
Just open `index.html` in a browser — everything is relative paths, nothing to configure.

For the smoothest video autoplay behavior, serve it over a local server instead of `file://`:
```bash
cd ara-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages
1. Create a new repository on GitHub (e.g. `ara-portfolio`).
2. Push these files to the `main` branch:
   ```bash
   cd ara-portfolio
   git init
   git add .
   git commit -m "Launch portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ara-portfolio.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set Source to `main` / `root`, and save.
4. Your site goes live at `https://<your-username>.github.io/ara-portfolio/`.

The video files are already compressed and under GitHub's 100MB per-file limit, so a normal `git push` works — no Git LFS needed.

## Swapping content later
- **Videos/posters**: replace files in `assets/videos` and `assets/posters` keeping the same names, or update the `data-src` / `src` paths in `index.html`.
- **Résumé**: replace `assets/docs/Araniza-Bangis-Resume.pdf` with an updated file of the same name.
- **Drive link**: search `drive.google.com` in `index.html` to update the "full reel library" button.
- **Colors**: all tokens live at the top of `styles.css` under `:root`.
