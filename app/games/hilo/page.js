"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playHiLo } from "../../../lib/games";

export default function HiLo() {
  const [state, setState] = useState(null);
  const [bet, setBet] = useState(10000);
  const [guess, setGuess] = useState("high");
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in</Link></div>;

  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (state.balance < b) return alert("Not enough chips.");
    const r = playHiLo(b, guess);
    const next = { ...state, balance: state.balance - b + r.win };
    addHistory(next, { type: "hilo", bet: b, win: r.win, note: "card " + r.card });
    saveState(next);
    setState({ ...next });
    setRes(r);
  }

  return (
    <div className="wrap">
      <div className="nav"><Link href="/" className="brand">← Floor</Link><div className="bal">{state.balance.toLocaleString()} chips</div></div>
      <div className="card">
        <h2>Hi-Lo</h2>
        <select value={guess} onChange={(e) => setGuess(e.target.value)}>
          <option value="high">High (8-13) 2x</option>
          <option value="low">Low (1-6) 2x</option>
          <option value="seven">Seven 8x</option>
        </select>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go}>Draw</button>
        {res && <p>Card {res.card}. {res.win > 0 ? `Won ${res.win.toLocaleString()}` : "Lost"}</p>}
      </div>
    </div>
  );
}
