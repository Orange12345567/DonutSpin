"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";
import { playSlots } from "../../../lib/games";

export default function Slots() {
  const [state, setState] = useState({ balance: 0 });
  const [bet, setBet] = useState(25000);
  const [reels, setReels] = useState(["🍩", "💎", "7️⃣"]);
  const [spinning, setSpinning] = useState(false);
  const [msg, setMsg] = useState("");
  const pool = ["🍩", "💎", "7️⃣", "🍒", "⭐", "💰"];
  useEffect(() => setState(loadState()), []);
  function go() {
    const b = Math.max(1, Number(bet) || 0);
    if (spinning) return;
    if (loadState().balance < b) return alert("Need more chips.");
    setSpinning(true);
    setMsg("");
    const iv = setInterval(() => {
      setReels([
        pool[Math.floor(Math.random() * 6)],
        pool[Math.floor(Math.random() * 6)],
        pool[Math.floor(Math.random() * 6)]
      ]);
    }, 90);
    setTimeout(() => {
      clearInterval(iv);
      const rr = playSlots(b);
      const bank = loadState();
      const next = { ...bank, balance: bank.balance - b + rr.win };
      addHistory(next, { type: "slots", bet: b, win: rr.win, note: rr.text });
      saveState(next);
      setState({ ...next });
      setReels(rr.reels);
      setMsg(rr.win ? "Won " + rr.win.toLocaleString() : "No line");
      setSpinning(false);
    }, 1600);
  }
  return (
    <div className="wrap">
      <div className="nav">
        <Link href="/" className="brand">← Floor</Link>
        <div className="bal">{Number(state.balance).toLocaleString()}</div>
      </div>
      <div className="table">
        <h2>Slots</h2>
        <div className="reels">
          {reels.map((x, i) => <div key={i} className={"reel" + (spinning ? " spinning" : "")}>{x}</div>)}
        </div>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        <button className="btn" onClick={go} disabled={spinning}>{spinning ? "..." : "Spin"}</button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
