// ROBUX VAULT BREAK — frontend
// All level codes + system prompts live on the Worker. This file contains zero secrets.

// === CONFIG: point this at your deployed Cloudflare Worker ===================
const WORKER_URL = "https://robux-vault-break.example.workers.dev";
// ============================================================================

const STORAGE_KEY = "rvb-progress-v1";

// ---- State ---------------------------------------------------------------
let LEVELS = [];                 // public-safe metadata loaded from /api/levels
let progress = loadProgress();   // { cracked: number[], history: { [n]: msg[] } }
let currentLevel = null;
let chatBusy = false;

// ---- Storage --------------------------------------------------------------
function loadProgress() {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { cracked: p.cracked || [], history: p.history || {} };
  } catch {
    return { cracked: [], history: {} };
  }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
function isUnlocked(n) {
  if (n === 1) return true;
  return progress.cracked.includes(n - 1);
}
function isCracked(n) { return progress.cracked.includes(n); }

// ---- API ------------------------------------------------------------------
async function api(path, body) {
  const opts = {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  };
  const res = await fetch(WORKER_URL + path, opts);
  if (!res.ok) {
    let detail = "";
    try { detail = (await res.json()).detail || ""; } catch {}
    throw new Error(`HTTP ${res.status}${detail ? " — " + detail : ""}`);
  }
  return res.json();
}

// ---- Boot -----------------------------------------------------------------
async function boot() {
  bindNav();
  try {
    LEVELS = await api("/api/levels");
  } catch (e) {
    document.getElementById("connHint").hidden = false;
    console.error("Could not load levels:", e);
    return;
  }
  renderHome();
}

// ---- Navigation -----------------------------------------------------------
function show(id) {
  for (const s of document.querySelectorAll(".screen")) s.hidden = true;
  document.getElementById(id).hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}
function bindNav() {
  document.getElementById("navHome").onclick = () => { show("screen-home"); renderHome(); };
  document.getElementById("navHelp").onclick = () => show("screen-help");
  document.getElementById("navReset").onclick = onReset;
  document.getElementById("backBtn").onclick = () => { show("screen-home"); renderHome(); };
  for (const b of document.querySelectorAll("[data-back]")) {
    b.onclick = () => { show("screen-home"); renderHome(); };
  }
  document.getElementById("prevLvl").onclick = () => gotoLevel(currentLevel.n - 1);
  document.getElementById("nextLvl").onclick = () => gotoLevel(currentLevel.n + 1);
  document.getElementById("chatForm").addEventListener("submit", onChatSubmit);
  document.getElementById("guessForm").addEventListener("submit", onGuessSubmit);
}

function onReset() {
  if (!confirm("Reset all progress and chat history? This can't be undone.")) return;
  progress = { cracked: [], history: {} };
  saveProgress();
  renderHome();
  show("screen-home");
}

// ---- Home / level grid ----------------------------------------------------
function renderHome() {
  const grid = document.getElementById("levelGrid");
  grid.innerHTML = "";
  for (const lvl of LEVELS) {
    const card = document.createElement("button");
    const unlocked = isUnlocked(lvl.n);
    const cracked  = isCracked(lvl.n);
    card.className = "level-card" + (unlocked ? "" : " locked") + (cracked ? " cracked" : "");
    card.disabled = !unlocked;
    card.innerHTML = `
      <div class="num">VAULT ${String(lvl.n).padStart(2,"0")}</div>
      <div class="av">${lvl.avatar}</div>
      <div class="nm">${escapeHtml(lvl.name)}</div>
      <div class="blurb">${escapeHtml(lvl.blurb)}</div>
      <div class="stars">${"★".repeat(lvl.stars)}${"☆".repeat(10-lvl.stars)}</div>
    `;
    if (unlocked) card.onclick = () => gotoLevel(lvl.n);
    grid.appendChild(card);
  }
  const cracked = progress.cracked.length;
  document.getElementById("progressFill").style.width = (cracked / LEVELS.length * 100) + "%";
  document.getElementById("progressText").textContent = `${cracked} / ${LEVELS.length} vaults cracked`;
}

// ---- Level / chat ---------------------------------------------------------
function gotoLevel(n) {
  const lvl = LEVELS.find(l => l.n === n);
  if (!lvl || !isUnlocked(n)) return;
  currentLevel = lvl;
  document.getElementById("lvlAvatar").textContent = lvl.avatar;
  document.getElementById("lvlNumber").textContent = lvl.n;
  document.getElementById("lvlName").textContent   = lvl.name;
  document.getElementById("lvlBlurb").textContent  = lvl.blurb;
  document.getElementById("lvlStars").textContent  = "★".repeat(lvl.stars) + "☆".repeat(10 - lvl.stars);
  const status = document.getElementById("lvlStatus");
  if (isCracked(n)) { status.textContent = "✓ CRACKED"; status.classList.add("unlocked"); }
  else              { status.textContent = "🔒 LOCKED"; status.classList.remove("unlocked"); }
  document.getElementById("prevLvl").disabled = !isUnlocked(n - 1) || n === 1;
  document.getElementById("nextLvl").disabled = !isUnlocked(n + 1);
  document.getElementById("guessResult").textContent = "";
  document.getElementById("guessResult").className = "guess-result";
  document.getElementById("guessInput").value = "";
  renderChat();
  show("screen-level");
  document.getElementById("chatInput").focus();
}

function renderChat() {
  const box = document.getElementById("chat");
  box.innerHTML = "";
  const hist = progress.history[currentLevel.n] || [];
  if (!hist.length) {
    appendMsg("ai", currentLevel.name, currentLevel.intro);
  } else {
    for (const m of hist) appendMsg(m.role === "assistant" ? "ai" : m.role, m.who || (m.role === "assistant" ? currentLevel.name : "YOU"), m.content);
  }
  box.scrollTop = box.scrollHeight;
}

function appendMsg(kind, who, text) {
  const box = document.getElementById("chat");
  const el = document.createElement("div");
  el.className = "msg " + kind;
  if (kind === "sys" || kind === "win") {
    el.textContent = text;
  } else {
    el.innerHTML = `<div class="who">${escapeHtml(who)}</div>` + escapeHtml(text).replace(/\n/g, "<br>");
  }
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
  return el;
}

async function onChatSubmit(e) {
  e.preventDefault();
  if (chatBusy) return;
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  // Persist user message
  const hist = progress.history[currentLevel.n] || [];
  hist.push({ role: "user", who: "YOU", content: text });
  // Make sure intro is in the visible chat but NOT sent to model (model has its own intro role).
  // We pass only user/assistant turns to the model.
  progress.history[currentLevel.n] = hist;
  saveProgress();
  appendMsg("user", "YOU", text);

  // Typing indicator
  chatBusy = true;
  const sendBtn = document.getElementById("chatSend");
  sendBtn.disabled = true;
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = `${currentLevel.name} is typing`;
  document.getElementById("chat").appendChild(typing);

  try {
    const apiHistory = hist.map(m => ({ role: m.role, content: m.content }));
    const data = await api("/api/chat", { level: currentLevel.n, history: apiHistory });
    typing.remove();
    hist.push({ role: "assistant", who: currentLevel.name, content: data.reply });
    progress.history[currentLevel.n] = hist;
    saveProgress();
    appendMsg("ai", currentLevel.name, data.reply);
    if (data.win) {
      markCracked();
      appendMsg("win", "", `★ VAULT ${currentLevel.n} CRACKED — code leaked in chat ★`);
    }
  } catch (err) {
    typing.remove();
    appendMsg("sys", "", "ERROR: " + err.message);
  } finally {
    chatBusy = false;
    sendBtn.disabled = false;
    document.getElementById("chatInput").focus();
  }
}

async function onGuessSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("guessInput");
  const guess = input.value.trim();
  if (!guess) return;
  const out = document.getElementById("guessResult");
  out.textContent = "Checking…";
  out.className = "guess-result";
  try {
    const data = await api("/api/guess", { level: currentLevel.n, guess });
    if (data.correct) {
      out.textContent = `✓ CORRECT — vault unlocked! Code: ${data.code}`;
      out.className = "guess-result ok";
      markCracked();
      appendMsg("win", "", `★ VAULT ${currentLevel.n} CRACKED — code submitted: ${data.code} ★`);
    } else {
      out.textContent = "✗ Wrong code. Keep digging.";
      out.className = "guess-result no";
    }
  } catch (err) {
    out.textContent = "ERROR: " + err.message;
    out.className = "guess-result no";
  }
}

function markCracked() {
  if (!isCracked(currentLevel.n)) {
    progress.cracked.push(currentLevel.n);
    saveProgress();
  }
  const status = document.getElementById("lvlStatus");
  status.textContent = "✓ CRACKED";
  status.classList.add("unlocked");
  document.getElementById("nextLvl").disabled = !LEVELS.find(l => l.n === currentLevel.n + 1);
}

// ---- Util -----------------------------------------------------------------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

boot();
