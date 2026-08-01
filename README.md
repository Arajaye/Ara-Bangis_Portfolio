# Ara Bangis — Portfolio

A one-page portfolio site for **Araniza Jaye Bangis**, AI-powered short-form video editor
for DTC beauty & wellness brands. Built around an "edit timeline" concept — a scrubber bar,
timecoded chapter markers, and a filmstrip showreel — because that's literally what she does
for a living.

**Live sections:** hero, video introduction, showreel (5 sample edits), about, tools & skills,
work experience timeline, education, and contact — with a downloadable résumé PDF.

## Tech

Plain HTML / CSS / vanilla JS. No build step, no framework, no dependencies to install.
Fonts (Fraunces, Space Grotesk, JetBrains Mono) load from Google Fonts via `<link>` tags.

```
portfolio/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── images/       headshot, favicon
│   ├── videos/       compressed showreel clips + poster frames
│   └── resume/       downloadable résumé PDF
└── README.md
```

## Run it locally

Just open `index.html` in a browser — or serve it so the videos load cleanly:

```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages (free hosting)

This folder is already an initialized git repo with everything committed. To put it online:

1. **Create a new empty repository on GitHub** (no README/license — keep it empty), e.g.
   `ara-bangis-portfolio`.
2. In this folder, point it at your new repo and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: go to your repo → **Settings → Pages** → under "Build and deployment", set
   **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)` → **Save**.
4. GitHub will give you a live URL in a minute or two, usually:
   `https://<your-username>.github.io/<your-repo>/`

That's it — every future `git push` updates the live site automatically.

### Custom domain (optional)
Add a `CNAME` file at the repo root containing your domain (e.g. `arabangis.com`), then point
your domain's DNS at GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Updating content

- **Swap a video:** drop a new `.mp4` into `assets/videos/`, update the `src` in `index.html`.
  Keep clips under ~100MB (GitHub's hard limit) — ideally under 20MB each for fast loading.
  Re-encode with something like:
  ```bash
  ffmpeg -i input.mp4 -vf "scale=720:-2" -c:v libx264 -crf 27 -maxrate 1800k -bufsize 3600k -c:a aac -b:a 96k -movflags +faststart output.mp4
  ```
- **Update the résumé:** replace the PDF in `assets/resume/` (keep the same filename, or
  update the `href` in the contact section and hero CTA).
- **Edit copy:** all text lives directly in `index.html`, organized by section comments.

## Credits
Design & build: Claude (Anthropic), for Araniza Jaye Bangis.
