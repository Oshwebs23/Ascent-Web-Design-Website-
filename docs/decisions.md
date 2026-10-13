# Decisions

A record of the main technical choices behind this site, why I made them, and the trade-offs I accepted. Written so I can explain my reasoning to clients and employers, and revisit it later if requirements change.

---

## 1. A static site instead of WordPress

**Decision:** Build the site as static HTML/CSS/JS rather than using WordPress.

**Why:**
- **Security:** no PHP, plugins or database means a much smaller attack surface.
- **Speed:** static files served from a CDN load faster than a typical WordPress install, which matters for user experience and SEO.
- **Maintenance:** no core, theme or plugin updates to keep on top of.
- **Cost:** no paid hosting required.
- **Fit:** the site is a brochure (who I am, what I offer, how to contact me), not something that needs a content management system.

**Trade-offs:** no admin dashboard, so content changes are made by editing files and pushing to GitHub. Dynamic features, such as the contact form, need a third-party service or a small serverless function.

---

## 2. Cloudflare for hosting

**Decision:** Host the site on Cloudflare.

**Why:**
- **Cost:** the free tier covers a static site, with free SSL and a global CDN.
- **Git-based deployment:** pushing to GitHub deploys automatically, with no manual file uploads.
- **Performance and security:** served from edge locations, with HTTPS by default.
- **Domains and DNS in one place:** registering and managing the domain alongside the hosting keeps things simple.
- **Learning value:** the workflow (Git, automated deploys, DNS, headers) is one I want to understand properly for my own development.

**Trade-offs:** no built-in email hosting, no server-side languages or databases (beyond what Workers functions offer), and the dashboard has a learning curve.

---

## 3. Workers (static assets) rather than Pages

**Decision:** Accept the Workers-based project that Cloudflare created, rather than forcing the older Pages flow.

**Why:** it serves static files just as well, and it appears to be where Cloudflare is directing new projects. The practical differences are the `workers.dev` URL and where settings sit in the dashboard.

**Trade-offs:** much of the older documentation and tutorials refer to Pages, so I sometimes have to translate instructions to the Workers dashboard.

---

## 4. Plain HTML/CSS with minimal JavaScript, no framework

**Decision:** No framework, no bundler, no npm dependencies.

**Why:**
- **Zero dependency maintenance:** nothing to update, audit or break.
- **Performance:** no framework overhead, so high Lighthouse scores are easy to reach.
- **Readability:** anyone reviewing the repo can understand it in minutes.
- **Right-sized:** a single-page brochure site doesn't need components or state management.

**Trade-offs:** repeated elements such as the header and footer are duplicated if I add more pages. If the site grows (a blog or case-study pages), I would move to a static site generator like Astro.

---

## 5. A single-page layout to start

**Decision:** One page with sections (hero, services, projects, about, contact) rather than a multi-page site.

**Why:** it's quick to build and easy to maintain, and visitors see everything in one scroll.

**Trade-offs:** fewer individual pages to rank for specific search terms. Separate service pages are a planned later improvement for SEO.

---

## 6. Contact form via a third-party service

**Decision:** Use a form-handling service (such as Web3Forms or Formspree) alongside visible contact details, rather than building a back end.

**Why:** a static site can't process form submissions itself. A service keeps the site static and secure while still giving visitors an easy way to get in touch.

**Spam protection:** a honeypot field, with Cloudflare Turnstile as an option.

**Trade-offs:** reliance on an external provider and its free-tier limits. Contact details stay visible on the page, so the form is never the only way to reach me.

---

## 7. Security approach

**Decision:** Rely on the static architecture, security headers and account hygiene.

- Static files only, so no server-side code to exploit
- Security headers via a `_headers` file (Content-Security-Policy, X-Content-Type-Options, Referrer-Policy and others)
- Two-factor authentication on GitHub and Cloudflare, since those accounts are the real point of control
- No secrets committed to the repo

---

## Revisit if...

- The site needs a blog or many pages → consider Astro or another static site generator
- I need server-side features such as bookings or logins → add Workers functions or a dedicated service
- The form volume outgrows the free tier → move the form handling into a Cloudflare Worker