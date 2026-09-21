"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playMines } from "../../../lib/games";

export default function Mines() {
  const [state, setState] = useState(null);
  const [bet, setBet] = useState(10000);
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in</Link></div>;

  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (state.balance < b) return alert("Not enough chips.");
    const r = playMines(b);
    const next = { ...state, balance: state.balance - b + r.win };
    addHistory(next, { type: "mines", bet: b, win: r.win, note: r.win ? "clear" : "boom" });
    saveState(next);
    setState({ ...next });
    setRes(r);
  }

  return (
    <div className="wrap">
      <div className="nav"><Link href="/" className="brand">← Floor</Link><div className="bal">{state.balance.toLocaleString()} chips</div></div>
      <div className="card">
        <h2>Mines</h2>
        <p className="muted">House picks 3 tiles. 3 bombs on a 3x3. Clear pays 4x.</p>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go}>Reveal</button>
        {res && <p>{res.win > 0 ? `Safe. Won ${res.win.toLocaleString()}` : "Hit a bomb."} Picks {res.picks.join(", ")} / bombs {res.bombs.join(", ")}</p>}
      </div>
    </div>
  );
}
