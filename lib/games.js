export function playSlots(bet) {
  const reels = ["🍩", "💎", "7️⃣", "🍒", "⭐", "💰"];
  const spin = () => reels[Math.floor(Math.random() * reels.length)];
  const a = spin(), b = spin(), c = spin();
  let mult = 0;
  if (a === b && b === c) mult = a === "7️⃣" ? 20 : a === "💎" ? 12 : 8;
  else if (a === b || b === c || a === c) mult = 2;
  const win = Math.floor(bet * mult);
  return { reels: [a, b, c], win, text: `${a} ${b} ${c}` };
}

export function playRoulette(bet, pick) {
  const n = Math.floor(Math.random() * 37);
  const color = n === 0 ? "green" : n % 2 === 0 ? "black" : "red";
  let win = 0;
  if (pick === "red" && color === "red") win = bet * 2;
  if (pick === "black" && color === "black") win = bet * 2;
  if (pick === "green" && color === "green") win = bet * 14;
  if (String(pick) === String(n)) win = bet * 35;
  return { n, color, win };
}

export function playCraps(bet) {
  const d1 = 1 + Math.floor(Math.random() * 6);
  const d2 = 1 + Math.floor(Math.random() * 6);
  const t = d1 + d2;
  let win = 0;
  if (t === 7 || t === 11) win = bet * 2;
  else if (t === 2 || t === 3 || t === 12) win = 0;
  else win = Math.floor(bet * 1.5);
  return { d1, d2, t, win };
}

export function playCoinflip(bet, pick) {
  const side = Math.random() < 0.5 ? "heads" : "tails";
  const win = pick === side ? bet * 2 : 0;
  return { side, win };
}

export function playMines(bet) {
  const bombs = new Set();
  while (bombs.size < 3) bombs.add(Math.floor(Math.random() * 9));
  const picks = [];
  while (picks.length < 3) {
    const p = Math.floor(Math.random() * 9);
    if (!picks.includes(p)) picks.push(p);
  }
  const hit = picks.some((p) => bombs.has(p));
  const win = hit ? 0 : bet * 4;
  return { bombs: [...bombs], picks, win };
}

export function playHiLo(bet, guess) {
  const card = 1 + Math.floor(Math.random() * 13);
  let win = 0;
  if (guess === "high" && card >= 8) win = bet * 2;
  if (guess === "low" && card <= 6) win = bet * 2;
  if (guess === "seven" && card === 7) win = bet * 8;
  return { card, win };
}

export function playBlackjack(bet) {
  const draw = () => 2 + Math.floor(Math.random() * 10);
  const player = [draw(), draw()];
  const dealer = [draw(), draw()];
  const sum = (h) => h.reduce((a, b) => a + b, 0);
  while (sum(player) < 17) player.push(draw());
  while (sum(dealer) < 17) dealer.push(draw());
  const ps = sum(player), ds = sum(dealer);
  let win = 0;
  if (ps > 21) win = 0;
  else if (ds > 21 || ps > ds) win = bet * 2;
  else if (ps === ds) win = bet;
  return { player, dealer, ps, ds, win };
}
