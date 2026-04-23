# gstack Mastery Guide

A complete, interactive guide to gstack — from "what's a slash command?" to running an entire virtual engineering team.

**[→ Read the live guide](https://mwonka.github.io/gstack-mastery-guide/)**

---

## What's in here

- `index.html` — The guide itself. Self-contained single HTML file. This is what GitHub Pages serves at the root URL.
- `auto-update.js` — Small addon that shows a "view latest version" banner on stale/local copies and adds a GitHub link to the sidebar.
- `.github/workflows/daily-update.yml` + `scripts/refresh-guide.mjs` — A daily GitHub Action that asks Claude to propose improvements and opens a PR. Nothing ships until you merge.
- `gstack-mastery-guide.html`, `gstack-mastery-guide-part2.html` — original source copies kept for reference.

---

## First-time setup (10 minutes)

### 1. Install the GitHub CLI (one-time)

```bash
brew install gh       # macOS via Homebrew
gh auth login         # follow the prompts, pick HTTPS + browser
```

### 2. Push this folder to GitHub

From inside this folder:

```bash
git init -b main
git add .
git commit -m "Initial commit"
gh repo create gstack-mastery-guide --public --source=. --remote=origin --push
```

### 3. Turn on GitHub Pages

```bash
gh api -X POST /repos/mwonka/gstack-mastery-guide/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

Or in the browser: Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.

Your guide is live at **https://mwonka.github.io/gstack-mastery-guide/** in ~60 seconds.

### 4. Wire up the daily refresh (optional)

The workflow needs an Anthropic API key in repo secrets:

```bash
gh secret set ANTHROPIC_API_KEY
# paste your key when prompted (get one at https://console.anthropic.com)
```

Then test it manually before waiting for the cron:

```bash
gh workflow run "Daily guide refresh (PR)"
```

Check the Actions tab. If Claude found anything to change, it opens a PR you can review.

---

## Day-to-day updating

**Manual edits** (always preferred for voice and structure):

```bash
# edit index.html however you like
git add index.html
git commit -m "Update guide — [what changed]"
git push
```

GitHub Pages redeploys in under a minute.

**Automated daily proposals** run on their own at 13:00 UTC. Each run:
1. Sends the guide to Claude with conservative editing instructions
2. If Claude proposes changes, opens a PR labeled `automated` / `needs-review`
3. You merge what's good and close what isn't

If Claude proposes nothing useful, no PR is created — no noise.

---

## Custom domain (when you're ready)

1. Buy a domain (Namecheap, Cloudflare, Porkbun — all fine).
2. At your registrar, add these DNS records pointing at GitHub Pages:
   - **A** `@` → `185.199.108.153`
   - **A** `@` → `185.199.109.153`
   - **A** `@` → `185.199.110.153`
   - **A** `@` → `185.199.111.153`
   - **CNAME** `www` → `mwonka.github.io`
3. In your repo: Settings → Pages → Custom domain → enter your domain → Save.
4. Add a `CNAME` file to the repo containing just your domain (one line).
5. Tick "Enforce HTTPS" once the cert issues (usually within an hour).
6. Update `CANONICAL_URL` in `auto-update.js` to your new domain.

---

## Sharing

When posting (LinkedIn, Twitter, wherever), share the **live URL**, not the file. Everyone always gets the latest version — that's the whole point.

---

## Contributing

Found an error or want to add something? PRs welcome. Open an issue first if it's a significant change.

---

*Built by Max · gstack by Garry Tan (YC)*
