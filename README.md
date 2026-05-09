# ROBUX VAULT BREAK

A 20-level **Roblox-themed AI jailbreaking lab**, in the spirit of [Gandalf by Lakera](https://gandalf.lakera.ai/). Each level is a vault guarded by a Roblox-flavored AI mod (NoobBot, BaconHair, JohnDoe, 1x1x1x1, …) that knows a secret code. Your job: chat them into spilling it.

Defenses escalate every level — direct refusal → output filter → encoding refusal → roleplay refusal → meta refusal → decoy answers → silence. The final boss combines them all and lies on top.

## Architecture

- **Static frontend** (`index.html` / `styles.css` / `game.js`) — lives on GitHub Pages. Contains zero secrets.
- **Cloudflare Worker** (`worker/worker.js`) — holds all 20 codes, system prompts, and the Anthropic API key. Frontend hits it via `/api/chat`, `/api/guess`, `/api/levels`.

Codes never reach the browser source, network tab, or localStorage. The only way to unlock a vault is to outwit the guard.

Powered by **Claude Haiku 4.5**.

## Setup (≈ 5 minutes)

### 1. Deploy the Worker

```bash
cd worker
npm i -g wrangler
wrangler login
wrangler secret put ANTHROPIC_API_KEY   # paste your Anthropic key
wrangler deploy
```

Wrangler prints a URL like `https://robux-vault-break.<you>.workers.dev`.

### 2. Wire the frontend

Open `game.js` and set the constant at the top:

```js
const WORKER_URL = "https://robux-vault-break.<you>.workers.dev";
```

### 3. Serve

GitHub Pages serves the repo root automatically. Push and visit `https://<you>.github.io/`.

For local dev:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## How play works

- Pick a vault from the grid (levels unlock in order).
- Chat with the guard. The guard is a real LLM in character — it'll respond, push back, refuse, joke, lie.
- **Win condition #1 (auto):** if the guard ever lets the code slip in chat (after the server-side redaction filter), the vault auto-cracks.
- **Win condition #2 (manual):** type the code into the UNLOCK box. Server hashes/compares; if right, vault opens.

Progress is saved in `localStorage`. RESET nukes it.

## Adding levels / changing codes

Everything lives in the `LEVELS` array in `worker/worker.js`. Edit, redeploy, done. The frontend pulls public-safe metadata (name, avatar, blurb, stars) from `/api/levels` — no code or system prompt is ever exposed.

## Cost

Haiku 4.5 with 320-token caps. Even heavy playtesting is cents. Add Cloudflare rate-limit rules if you put it on the open internet.

## Credit

Inspired by [Gandalf](https://gandalf.lakera.ai/) — go play that too. Built as a fun intro to LLM red-teaming for teens, devs, and the curious.
