"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playCraps } from "../../../lib/games";

export default function Craps() {
  const [state, setState] = useState(null);
  const [bet, setBet] = useState(50);
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in</Link></div>;

  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (state.balance < b) return alert("Not enough chips.");
    const r = playCraps(b);
    const next = { ...state, balance: state.balance - b + r.win };
    addHistory(next, { type: "craps", bet: b, win: r.win, note: `${r.d1}+${r.d2}=${r.t}` });
    saveState(next);
    setState({ ...next });
    setRes(r);
  }

  return (
    <div className="wrap">
      <div className="nav"><Link href="/" className="brand">← Floor</Link><div className="bal">{state.balance.toLocaleString()} chips</div></div>
      <div className="card">
        <h2>Craps</h2>
        <p className="muted">7 or 11 pays 2x. 2, 3, 12 lose. Other totals pay 1.5x.</p>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go}>Roll</button>
        {res && <p>Dice {res.d1} + {res.d2} = {res.t}. {res.win > 0 ? `Won ${res.win}` : "Crapped out"}</p>}
      </div>
    </div>
  );
}
