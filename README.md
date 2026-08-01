# Ara Bangis — Portfolio Site

A one-page, motion-driven portfolio for **Ara Bangis**, AI-powered video editor. Built with plain HTML/CSS/JS — no build step, no dependencies to install.

**Highlights**
- Hero with autoplaying vertical showreel clip in a phone frame + cycling "hook" captions
- Horizontal-scrolling reel rail of video samples (hover to preview, click for full-screen)
- A **"pivot" timeline** — her career visualized like a video-editing timeline, showing the move from recruitment into AI video editing
- Résumé download button (PDF included in `/assets`)
- Fully responsive, keyboard-accessible, and respects `prefers-reduced-motion`

All video/image assets have been compressed for the web (~23 MB total, down from the ~300 MB of original source files), so the whole site stays light and fast to load.

---

## 1. View it right now (no setup)

Just double-click `index.html` to open it in your browser. Everything runs locally — no server needed for a quick look, though a local server (see below) gives the smoothest video playback.

## 2. Put it on GitHub Pages (free hosting)

1. Create a new repository on GitHub, e.g. `ara-portfolio`.
2. Upload **all files in this folder** (`index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder) to the repo root — keep the folder structure exactly as-is.
   - Easiest way: on the repo page, click **Add file → Upload files**, drag the whole folder's contents in, and commit.
   - Or, with git installed locally:
     ```bash
     cd ara-portfolio
     git init
     git add .
     git commit -m "Launch portfolio"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/ara-portfolio.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. Wait a minute, then your site is live at:
   `https://YOUR-USERNAME.github.io/ara-portfolio/`

## 3. Preview locally with a real server (optional, recommended)

Some browsers restrict video playback when opening files directly (`file://`). To avoid that, run a tiny local server from this folder:

```bash
# Python 3 (most computers already have this)
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Folder structure

```
index.html               → the whole page
style.css                → all styling, colors, motion
script.js                → interactions (menu, scroll reveals, video playback, lightbox)
assets/
  resume-ara-bangis.pdf  → downloadable résumé
  videos/
    intro.mp4            → hero showreel clip
    sample1.mp4           → reel card 1
    sample2.mp4           → reel card 2
    sample3.mp4           → reel card 3
  img/
    profile.jpg           → headshot used in the About section
    poster_*.jpg          → video thumbnail frames
    favicon.svg            → browser tab icon
```

## Customizing

- **Copy / text**: edit directly in `index.html` — every section is clearly commented (`<!-- ============ SECTION ============ -->`).
- **Colors**: all colors are CSS variables at the top of `style.css` under `:root`. Change `--pink`, `--violet`, `--gold`, `--bg` to restyle the whole site in one place.
- **Swap videos**: replace files in `assets/videos/` (keep the same filenames) or update the `data-video` / `src` paths in `index.html`.
- **Timeline dates**: the career timeline in the "Pivot" section uses hand-set percentage positions (`left` / `width` inline styles) matched to real dates — if her work history changes, recalculate positions proportionally against the date range shown in `.tl-ruler`.

---

Built to stop the scroll. 💗
