# Calusa residence listing

Static, dependency-free landing page for 13300 SW 99th Terrace, Miami, FL 33186. Authored site files are in `dist/`.

## Preview

Run `python3 -m http.server 4173 --directory dist` from this folder.

## Mailgun lead capture on Vercel

The showing form posts to `/api/leads`, a Vercel function. Set `MAILGUN_API_KEY` (a domain sending key), `MAILGUN_DOMAIN=mail.dianapgomez.com`, and `MAILGUN_REGION=US` as Vercel environment variables, then redeploy. Never commit API keys. DNS/domain verification must be complete before sending.

Sender name: 13300 Showing Lead. Sender address: leads at the configured Mailgun domain. Recipients: dianapagomez@gmail.com and miamihomesbyred@gmail.com. Reply-To is the visitor’s validated email. Tracking is disabled. No database is used. Missing configuration or Mailgun failures produce an error, not a false success. The function is available on Vercel only; a plain static server/Sites preview cannot process this form.

Basic protections include fixed recipients, same-origin checks, validation, size/length limits and a honeypot. For public launch, enable Vercel firewall rate limiting or add a bot-challenge service; the honeypot alone is not robust abuse protection.

Header logo source: https://kwcapital.kw.com/ (the Coral Gables office’s KW Capital logo). Agent name follows the user’s requested spelling, Diana P. Gomez. A public portrait was located on Homes.com but acquisition was blocked; the avatar was removed in favor of a contact-information card.

## Media and listing details

All 55 photographs were downloaded from the supplied Spiro property catalog. Web-optimized copies are served locally. The original Dropbox video is retained in `originals/` (excluded from Git); a compressed 720p, fast-start copy is served from `dist/assets/property-tour.mp4`. The supplied floor plan is included.

Address, agent contact information and source credits are based on the supplied property media page and screenshot. Price, bed/bath counts, square footage, listing status and other unconfirmed claims are intentionally omitted. Confirm all listing facts and rights to use supplied media before public launch. The Sites preview is owner-private by default.
