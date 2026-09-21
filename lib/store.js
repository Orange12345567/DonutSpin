const KEY = "donut_casino_v2";

export function loadState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function defaultState(username) {
  const code = "DONUT-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return {
    username,
    balance: 10000000,
    depositCode: code,
    history: [],
    createdAt: Date.now(),
  };
}

export function addHistory(state, entry) {
  state.history = [{ ts: Date.now(), ...entry }, ...(state.history || [])].slice(0, 50);
  return state;
}
