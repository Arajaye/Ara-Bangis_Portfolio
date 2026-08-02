# Asset fix — drop-in package

This folder matches the exact paths your live site (arajaye.github.io/Ara-Bangis_Portfolio)
is already requesting:

assets/images/headshot.jpg
assets/videos/intro.mp4
assets/videos/clip1.mp4
assets/videos/clip2.mp4
assets/videos/clip3.mp4
assets/videos/clip4.mp4
assets/videos/clip5.mp4   <-- placeholder, see note below
assets/resume/Araniza-Jaye-Bangis-Resume.pdf

## ⚠️ One thing to know
Your page references 6 video slots (intro + clip1–clip5), but only 5 unique source
videos were ever uploaded to me. So right now:
- clip5.mp4 is a duplicate of clip1.mp4, just so the link doesn't 404.
- Swap in a real 6th clip whenever you have one, using that exact filename.

## How to install (copy-paste into Terminal / Git Bash)

1. Clone your repo fresh (or `cd` into your existing local copy):
   git clone https://github.com/arajaye/Ara-Bangis_Portfolio.git
   cd Ara-Bangis_Portfolio

2. Copy everything from this "assets-fix" folder into the repo root,
   so it merges into the existing `assets/` folder (overwrite when asked).

3. Push it:
   git add .
   git commit -m "Add missing media assets"
   git push

4. Wait ~1 minute, then hard refresh the live site (Ctrl/Cmd+Shift+R).

If `git push` is rejected, run `git pull` first, resolve, then push again.
