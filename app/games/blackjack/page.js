"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playBlackjack } from "../../../lib/games";

export default function Blackjack() {
  const [state, setState] = useState(null);
  const [bet, setBet] = useState(50);
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in</Link></div>;

  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (state.balance < b) return alert("Not enough chips.");
    const r = playBlackjack(b);
    const next = { ...state, balance: state.balance - b + r.win };
    addHistory(next, { type: "blackjack", bet: b, win: r.win, note: `P${r.ps} D${r.ds}` });
    saveState(next);
    setState({ ...next });
    setRes(r);
  }

  return (
    <div className="wrap">
      <div className="nav"><Link href="/" className="brand">← Floor</Link><div className="bal">{state.balance.toLocaleString()} chips</div></div>
      <div className="card">
        <h2>Blackjack</h2>
        <p className="muted">Auto-hit to 17 for both sides. Push returns the bet.</p>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go}>Deal</button>
        {res && <p>You {res.player.join("+")} = {res.ps}. Dealer {res.dealer.join("+")} = {res.ds}. {res.win === bet ? "Push" : res.win > 0 ? `Won ${res.win}` : "Lost"}</p>}
      </div>
    </div>
  );
}
