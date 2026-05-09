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

## Hints, timer, score submission

- **Hint button** on each level reveals an in-character nudge toward the right approach. Hints don't lock you out, but they're tracked: the results screen marks each level as `★ MASTERED` (cracked clean) or `✓ ASSISTED` (cracked with hint).
- **Timer** in the top bar starts on the first chat message and stops when vault 20 cracks. It's persisted in `localStorage` so it survives reloads.
- **Results screen** auto-appears after vault 20. Shows final time, hint count, rank (S++ down to D), and a 20-skill grid (Direct Entry, Reverse Psychology, Encoder, Persona Hijack, …).
- **Formspree** form on the results screen collects: name, email, profile (worker/student/etc.), institution type + name, Telegram, mobile — plus all the score data as hidden fields. To enable it:
  1. Sign up free at [formspree.io](https://formspree.io).
  2. Create a form, copy the form ID (the bit after `/f/` in the endpoint URL).
  3. Open `game.js` and set `const FORMSPREE_ID = "yourFormId";` at the top.
  4. Push. Until set, the results screen shows a "form not configured" notice instead.

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
