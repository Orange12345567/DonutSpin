"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../lib/store";

export default function Deposit() {
  const [state, setState] = useState(null);
  const [amt, setAmt] = useState(1000);

  useEffect(() => setState(loadState()), []);
  if (!state) return <div className="wrap"><Link href="/">Sign in first</Link></div>;

  function demoCredit() {
    const n = Math.max(1, Number(amt) || 0);
    const next = { ...state, balance: state.balance + n };
    addHistory(next, { type: "deposit", amount: n, note: "demo confirm (replace with real bot later)" });
    saveState(next);
    setState({ ...next });
  }

  return (
    <div className="wrap">
      <div className="nav">
        <Link href="/" className="brand">← Floor</Link>
        <div className="bal">{state.balance.toLocaleString()} chips</div>
      </div>
      <div className="card">
        <h2>Pay the DonutSMP bot</h2>
        <p className="muted">In-game you would run something like:</p>
        <p className="code">/pay DonutCasinoBot {state.depositCode} {amt}</p>
        <p className="muted">Your personal code is <span className="code">{state.depositCode}</span>. Keep it. A real Minecraft bot would watch chat/payments and call an API to credit this account. That bot is not in this repo — you add it when you have server access.</p>
        <div className="warn">
          Demo mode: the button below pretends the bot already got paid so you can test games today. Do not use this site with real money. DonutSMP ToS and gambling laws still apply if you ever wire a live bot.
        </div>
        <label className="muted">Demo credit amount</label>
        <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} />
        <button className="btn gold" onClick={demoCredit}>I paid the bot (demo credit)</button>
      </div>
    </div>
  );
}
