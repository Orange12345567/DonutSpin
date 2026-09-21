"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playRoulette } from "../../../lib/games";

export default function Roulette() {
  const [state, setState] = useState({ balance: 0 });
  const [bet, setBet] = useState(25000);
  const [pick, setPick] = useState("red");
  const [spinning, setSpinning] = useState(false);
  const [res, setRes] = useState(null);
  useEffect(() => setState(loadState()), []);
  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (spinning) return;
    if (state.balance < b) return alert("Need more chips. Dev menu on the floor.");
    setSpinning(true);
    setRes(null);
    setTimeout(() => {
      const rr = playRoulette(b, pick);
      const bank = loadState();
      const next = { ...bank, balance: bank.balance - b + rr.win };
      addHistory(next, { type: "roulette", bet: b, win: rr.win, note: rr.n + " " + rr.color });
      saveState(next);
      setState({ ...next });
      setRes(rr);
      setSpinning(false);
    }, 2400);
  }
  return (
    <div className="wrap">
      <div className="nav">
        <Link href="/" className="brand">← Floor</Link>
        <div className="bal">{Number(state.balance).toLocaleString()}</div>
      </div>
      <div className="table">
        <h2>Roulette</h2>
        <div className="wheel-wrap">
          <div className="pointer" />
          <div className={"wheel" + (spinning ? " spin" : "")} />
        </div>
        <div className="row">
          <button className="btn ghost" onClick={() => setPick("red")}>Red</button>
          <button className="btn ghost" onClick={() => setPick("black")}>Black</button>
          <button className="btn ghost" onClick={() => setPick("green")}>Green 0</button>
        </div>
        <p className="muted">On: {pick}</p>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go} disabled={spinning}>{spinning ? "Spinning..." : "Spin"}</button>
        {res && <p>Ball {res.n} {res.color}. {res.win ? "Won " + res.win.toLocaleString() : "Lost"}</p>}
      </div>
    </div>
  );
}
