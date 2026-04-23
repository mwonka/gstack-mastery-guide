/**
 * gstack Mastery Guide — Auto-Update Addon
 * ─────────────────────────────────────────
 * Drop this file next to your gstack-mastery-guide.html and add ONE line
 * before </body> in your HTML:
 *
 *   <script src="auto-update.js"></script>
 *
 * Then update the two constants below after you set up GitHub Pages.
 */

// ─── CONFIGURE THESE ──────────────────────────────────────────────────────────
const CANONICAL_URL  = 'https://mwonka.github.io/gstack-mastery-guide/';
const GITHUB_REPO    = 'https://github.com/mwonka/gstack-mastery-guide';
const GUIDE_VERSION  = '1.0';
const LAST_UPDATED   = 'April 2026';
// ──────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ── 1. Inject CSS ────────────────────────────────────────────────────────────
  const css = `
    /* auto-update addon styles */
    .gu-banner {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: #1a1d27;
      border: 1px solid #7c6aef;
      border-radius: 12px;
      padding: 14px 18px;
      max-width: 320px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      animation: gu-slide-in 0.35s ease;
    }
    @keyframes gu-slide-in {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    .gu-banner-icon  { font-size: 22px; flex-shrink: 0; line-height: 1; margin-top: 1px; }
    .gu-banner-body  { flex: 1; min-width: 0; }
    .gu-banner-title { font-weight: 700; font-size: 14px; color: #9d8ff5; margin-bottom: 4px; }
    .gu-banner-text  { font-size: 13px; color: #8b8fa3; line-height: 1.55; margin: 0; }
    .gu-banner-link  {
      display: inline-block;
      margin-top: 10px;
      padding: 6px 14px;
      background: #7c6aef;
      color: #fff;
      border-radius: 6px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: opacity 0.2s;
    }
    .gu-banner-link:hover { opacity: 0.85; }
    .gu-banner-close {
      background: none;
      border: none;
      color: #8b8fa3;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      line-height: 1;
      transition: color 0.15s;
    }
    .gu-banner-close:hover { color: #e2e4ed; }

    /* GitHub link injected into sidebar */
    .gu-github-link {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 24px 0;
      padding: 8px 12px;
      background: #232736;
      border: 1px solid #2e3348;
      border-radius: 8px;
      text-decoration: none;
      color: #8b8fa3;
      font-size: 13px;
      font-weight: 500;
      transition: border-color 0.15s, color 0.15s;
      font-family: inherit;
    }
    .gu-github-link:hover { border-color: #7c6aef; color: #e2e4ed; }
    .gu-sidebar-meta {
      padding: 10px 24px 0;
      font-size: 11px;
      color: #8b8fa3;
      line-height: 1.7;
    }
    .gu-sidebar-meta a { color: #9d8ff5; text-decoration: none; }
    .gu-sidebar-meta a:hover { text-decoration: underline; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);


  // ── 2. Inject sidebar metadata + GitHub link ──────────────────────────────────
  const sidebarLogo = document.querySelector('.sidebar-logo');
  if (sidebarLogo) {
    const meta = document.createElement('div');
    meta.className = 'gu-sidebar-meta';
    meta.innerHTML = `
      v${GUIDE_VERSION} &middot; Updated ${LAST_UPDATED}<br>
      <a href="${CANONICAL_URL}" target="_blank">View live version →</a>
    `;
    sidebarLogo.after(meta);

    const ghLink = document.createElement('a');
    ghLink.className = 'gu-github-link';
    ghLink.href = GITHUB_REPO;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener';
    ghLink.innerHTML = `
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" style="flex-shrink:0">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
                 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41
                 -1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815
                 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925
                 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23
                 .96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65
                 .24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925
                 .435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57
                 A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      ⭐ Star on GitHub
    `;
    meta.after(ghLink);
  }


  // ── 3. Show "outdated copy" banner when not on canonical URL ──────────────────
  const loc = window.location.href;

  // Don't show banner when:
  // - already on the canonical GitHub Pages URL
  // - running on localhost / 127.0.0.1 (dev mode)
  const isCanonical = CANONICAL_URL !== 'https://YOUR-USERNAME.github.io/gstack-mastery-guide/'
                      && loc.startsWith(CANONICAL_URL);
  const isDev       = loc.includes('localhost') || loc.includes('127.0.0.1');
  const isFileProt  = window.location.protocol === 'file:';

  if (!isCanonical && !isDev) {
    // Build banner
    const banner = document.createElement('div');
    banner.className = 'gu-banner';
    banner.id        = 'guUpdateBanner';

    const linkText = isFileProt
      ? 'This is a locally saved file — it may be out of date.'
      : 'You may be viewing an older cached copy of this guide.';

    banner.innerHTML = `
      <span class="gu-banner-icon">🔄</span>
      <div class="gu-banner-body">
        <div class="gu-banner-title">Always-fresh version available</div>
        <p class="gu-banner-text">${linkText}</p>
        <a class="gu-banner-link" href="${CANONICAL_URL}" target="_blank">View latest version →</a>
      </div>
      <button class="gu-banner-close" onclick="this.closest('.gu-banner').remove()" aria-label="Dismiss">✕</button>
    `;

    document.body.appendChild(banner);

    // Auto-dismiss after 15 s if user hasn't interacted
    setTimeout(() => {
      const el = document.getElementById('guUpdateBanner');
      if (el) {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 500);
      }
    }, 15000);
  }

})();
