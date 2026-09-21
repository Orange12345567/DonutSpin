"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playCoinflip } from "../../../lib/games";

export default function Coinflip() {
  const [state, setState] = useState(null);
  const [bet, setBet] = useState(10000);
  const [pick, setPick] = useState("heads");
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in</Link></div>;

  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (state.balance < b) return alert("Not enough chips.");
    const r = playCoinflip(b, pick);
    const next = { ...state, balance: state.balance - b + r.win };
    addHistory(next, { type: "coinflip", bet: b, win: r.win, note: r.side });
    saveState(next);
    setState({ ...next });
    setRes(r);
  }

  return (
    <div className="wrap">
      <div className="nav"><Link href="/" className="brand">← Floor</Link><div className="bal">{state.balance.toLocaleString()} chips</div></div>
      <div className="card">
        <h2>Coinflip</h2>
        <select value={pick} onChange={(e) => setPick(e.target.value)}>
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go}>Flip</button>
        {res && <p>{res.side}. {res.win > 0 ? `Won ${res.win.toLocaleString()}` : "Lost"}</p>}
      </div>
    </div>
  );
}
