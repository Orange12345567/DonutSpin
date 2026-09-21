"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playRoulette } from "../../../lib/games";

export default function Roulette() {
  const [state, setState] = useState(null);
  const [bet, setBet] = useState(50);
  const [pick, setPick] = useState("red");
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in</Link></div>;

  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (state.balance < b) return alert("Not enough chips.");
    const r = playRoulette(b, pick);
    const next = { ...state, balance: state.balance - b + r.win };
    addHistory(next, { type: "roulette", bet: b, win: r.win, note: `${r.n} ${r.color}` });
    saveState(next);
    setState({ ...next });
    setRes(r);
  }

  return (
    <div className="wrap">
      <div className="nav"><Link href="/" className="brand">← Floor</Link><div className="bal">{state.balance.toLocaleString()} chips</div></div>
      <div className="card">
        <h2>Roulette</h2>
        <select value={pick} onChange={(e) => setPick(e.target.value)}>
          <option value="red">Red (2x)</option>
          <option value="black">Black (2x)</option>
          <option value="green">Green 0 (14x)</option>
        </select>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go}>Spin wheel</button>
        {res && <p>Ball: {res.n} {res.color}. {res.win > 0 ? `Won ${res.win}` : "Lost"}</p>}
      </div>
    </div>
  );
}
