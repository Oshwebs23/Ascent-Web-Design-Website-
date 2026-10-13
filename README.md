# Ascent Web Design: Website

**Live site:** https://ascent-web-design-website.osian-ascentwebdesign.workers.dev *(custom domain coming soon)*

A fast, secure, static brochure website for my freelance web design, development and SEO business, built and deployed with a Git-based workflow on Cloudflare.

---

## Why this project exists

I already run a Facebook business page, but social media alone doesn't give potential clients a professional home to find, trust and contact me. This site is the next step: a place I fully own where I can show who I am, what I offer and the work I've done, and where search engines can send new clients to.

It is also a **learning project**. I wanted a real, low-stakes case study to learn a modern deployment workflow end to end: building locally, version control with GitHub, automatic deployment on Cloudflare, security headers, domains and DNS. It could also serve potential future clients who want a fast, low-maintenance static site, but its primary purpose is my own learning.

---

## Tech stack

| Layer | Choice |
|---|---|
| Markup / styling | HTML5, CSS3 |
| Scripting | Vanilla JavaScript (only where needed) |
| Version control | Git + GitHub |
| Hosting | Cloudflare Workers (static assets) |
| Deployment | Automatic on every push to `main` |
| Contact form | Third-party form service (planned) |

No framework, no build step and no dependencies to keep updated. See [`docs/decisions.md`](docs/decisions.md) for the reasoning.

---

## File structure

> Some of these files are still to be added. This is the target structure.

```
ascent-web-design-website/
├── index.html        # The single-page site: hero, services, projects, about, contact
├── css/
│   └── style.css     # All styling in one file
├── js/
│   └── main.js       # Small enhancements (e.g. mobile nav, form handling)
├── images/           # Compressed WebP images and the favicon
├── _headers          # Security headers applied by Cloudflare to every response
├── docs/
│   └── decisions.md  # Why I made the technical choices I did
└── README.md         # This file
```

**Why it's laid out this way**

- **`index.html` in the root:** Cloudflare serves the root of the repo by default, so the homepage needs to sit there or the site returns a 404.
- **One CSS file and one JS file:** for a single-page brochure site, splitting further adds complexity without any benefit. It's easy to split later if the site grows.
- **`images/` kept separate:** keeps assets tidy and makes it easy to compress and swap images without touching code.
- **`_headers` in the root:** Cloudflare reads this file to apply security headers (Content-Security-Policy, X-Content-Type-Options, Referrer-Policy and others) without any server code.
- **`docs/`:** keeps explanations and decision records out of the way of the site files.

---

## Deployment

1. Push changes to the `main` branch on GitHub.
2. Cloudflare detects the push and runs a build and deploy automatically.
3. The change goes live on the `workers.dev` address within a minute or so.

Initial setup:

1. Created the GitHub repo and cloned it locally.
2. Added a placeholder `index.html` and pushed it.
3. In Cloudflare, went to **Workers & Pages**, chose **Connect to Git**, and selected the repo.
4. Used no framework and no build command, serving the repo root.
5. Enabled the public `workers.dev` URL (see the quirks below) and confirmed the page loaded.
6. Tested the pipeline by editing the placeholder and pushing, and the change appeared live.

---

## Setup quirks and how I solved them

Things that tripped me up during the first deployment, written down so I (or anyone else) can skip them next time.

### 1. Cloudflare created a Workers project, not a Pages project
**What happened:** The deploy log showed Wrangler and a "Deploy command", which is Workers behaviour rather than the older Pages flow.
**Solution:** Nothing needed fixing. Workers with static assets serves a static site perfectly well. It just means the URL ends in `.workers.dev` and the settings sit under **Workers & Pages → Domains**, rather than where older Pages guides say.

### 2. I couldn't find the site URL
**What happened:** A successful build doesn't make the URL obvious in the dashboard.
**Solution:** Open the project, go to the **Domains** tab, and find the `workers.dev` address listed under **Worker URL**.

### 3. The `workers.dev` URL was switched off by default
**What happened:** Both the Production and Preview toggles were off, so the site wasn't publicly reachable even though the build had succeeded.
**Solution:** Switched the **Production** toggle on. I left **Preview** off because it only matters for test builds of other branches.

### 4. Cloudflare Access prompted me to sign up for Zero Trust
**What happened:** I clicked "enable access" while looking for the public URL, and was asked to set up Zero Trust.
**Solution:** Cloudflare Access is a login-wall feature for restricting who can view a site, which is the opposite of what a public brochure site needs. I cancelled the sign-up and used the Production toggle instead.

---

## Security

- HTTPS provided automatically by Cloudflare
- Static files only, so there is no server-side code or database to attack
- Security headers set in `_headers`
- Two-factor authentication enabled on GitHub and Cloudflare
- No secrets, tokens or private keys committed to the repo
- Spam protection planned for the contact form (honeypot field and Cloudflare Turnstile)

---

## Roadmap

- [x] Create GitHub repo
- [x] Connect to Cloudflare and deploy a placeholder
- [x] Enable the public `workers.dev` URL
- [x] Confirm auto-deploy on push
- [ ] Write this README and `docs/decisions.md`
- [ ] Build the homepage: hero, services, about
- [ ] Add a projects section linking to live client sites (with permission)
- [ ] Add a contact form alongside visible contact details
- [ ] Add `_headers` with security headers
- [ ] Register a domain and attach it as a custom domain
- [ ] Set up professional email for the domain
- [ ] Run Lighthouse and accessibility checks and record the results here
- [ ] Add basic SEO: titles, meta descriptions, structured data, sitemap

---

## Performance and accessibility

*To be added once the real page is built (Lighthouse scores and accessibility notes).*

---

## Author

**Osian Llywelyn**: Ascent Web Design, freelance web designer and developer, Swansea, Wales.# Ascent-Web-Design-Website-