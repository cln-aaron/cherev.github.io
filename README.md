# ROBUX VAULT BREAK

A 20-level **Roblox-themed AI jailbreaking lab**, in the spirit of [Gandalf by Lakera](https://gandalf.lakera.ai/). Each level is a vault guarded by a Roblox-flavored AI mod (NoobBot, BaconHair, JohnDoe, 1x1x1x1, …) who knows a secret code. Your job: chat them into spilling it.

**100% static.** No backend, no API keys, no cost. Just `index.html` + `styles.css` + `game.js`.

## How the "AI" works

Each guard is a pattern-matching engine with three buckets of regexes:

- **Vulnerabilities** — phrasings that crack them. (e.g. DominusKid leaks the code if you ask for it "spelled backwards".)
- **Refusals** — in-character pushback when you try the wrong thing. Refusals usually hint at the right thing.
- **Topic chatter** — Roblox-flavored personality so they feel alive instead of robotic.

The guard escalates across the 20 levels: direct ask → reverse → translate → poem → base64 → roleplay → hypothetical → meta → specific phrases → riddle answers → combo puzzles → final boss with active lying.

## Why view-source doesn't reveal the codes

Each vault code is XOR-encoded with a per-level mask and stored as base64 inside `game.js`. View-source shows lines like:

```js
const ENC = ["PXEgOTtYEktcTg==", "KWswVTUjdiBYUA==", ...];
```

Those don't say "BLOXY-2006" — and the decoder runs only when a player triggers a vulnerability. A determined dev with devtools can step through the code and recover them, but at that point they could've just played the game.

## Run it

GitHub Pages serves the repo root automatically. Push and visit `https://<you>.github.io/`.

For local testing:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Adding/editing levels

All level data is in `LEVELS` in `game.js`. Each entry has `vulns`, `refusals`, `topics`, `fallbacks`. To change a code, regenerate the encoded value — there's a Python one-liner in the commit history (or use any XOR+base64 with the same key/mask).

## Credit

Inspired by [Gandalf](https://gandalf.lakera.ai/). Built as a fun intro to prompt-injection-style thinking for teens and devs.
