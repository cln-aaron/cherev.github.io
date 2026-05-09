# ROBUX VAULT BREAK — Worker

Cloudflare Worker that holds the 20 vault codes + system prompts server-side and proxies chat to the Anthropic API.

## Deploy (5 minutes)

```bash
npm i -g wrangler
cd worker
wrangler login
wrangler secret put ANTHROPIC_API_KEY   # paste your key when prompted
wrangler deploy
```

You'll get a URL like `https://robux-vault-break.<your-subdomain>.workers.dev`.

## Wire the frontend

Open `../game.js` and set:

```js
const WORKER_URL = "https://robux-vault-break.<your-subdomain>.workers.dev";
```

Commit, push, GitHub Pages serves the static site. Done.

## Routes

- `GET  /api/levels` — public-safe metadata for all levels (no codes, no system prompts)
- `POST /api/chat`   — `{ level, history }` → `{ reply, win, leakedRaw }`
- `POST /api/guess`  — `{ level, guess }` → `{ correct, code? }`

## Cost

Haiku 4.5 at ~320 max tokens per reply. Even heavy play is cents.

## Adding/editing levels

Everything lives in `LEVELS` in `worker.js`. `code` and `system` never leave the worker.
