# Calusa residence listing

Static, dependency-free landing page for 13300 SW 99th Terrace, Miami, FL 33186. Authored site files are in `dist/`.

## Preview

Run `python3 -m http.server 4173 --directory dist` from this folder.

## GoHighLevel integration

Replace the contents of `#ghl-form-slot` in `dist/index.html` between the `GOHIGHLEVEL EMBED START` and `GOHIGHLEVEL EMBED END` comments with the supplied iframe and required script. Keep the wrapper and the `#contact` anchor. Remove the disabled placeholder fields and placeholder notice when the real embed is installed. The current placeholder does not collect or submit any information; call and email links work.

## Media and listing details

All 55 photographs were downloaded from the supplied Spiro property catalog. Web-optimized copies are served locally. The original Dropbox video is retained in `originals/` (excluded from Git); a compressed 720p, fast-start copy is served from `dist/assets/property-tour.mp4`. The supplied floor plan is included.

Address, agent contact information and source credits are based on the supplied property media page and screenshot. Price, bed/bath counts, square footage, listing status and other unconfirmed claims are intentionally omitted. Confirm all listing facts and rights to use supplied media before public launch. The Sites preview is owner-private by default.
