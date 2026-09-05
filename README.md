# Fuel Calculator PWA – GitHub Pages

## Upload
Upload these files to the repository root:
- index.html
- manifest.webmanifest
- sw.js

## Enable GitHub Pages
Repository → Settings → Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)
- Save

Then open the GitHub Pages HTTPS address in Safari on the iPhone and choose:
Share → Add to Home Screen.

The manifest and service worker use relative paths and therefore work when the
site is hosted below a repository path such as /fuel-calculator/.
