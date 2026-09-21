const KEY = "donut_casino_demo_v3";

export function loadState() {
  if (typeof window === "undefined") return { balance: 10000000, history: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const state = { balance: 10000000, history: [] };
  localStorage.setItem(KEY, JSON.stringify(state));
  return state;
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function addHistory(state, entry) {
  state.history = [{ ts: Date.now(), ...entry }, ...(state.history || [])].slice(0, 40);
  return state;
}

export function addChips(state, amount) {
  state.balance += amount;
  return addHistory(state, { type: "dev", amount, note: "dev menu" });
}
