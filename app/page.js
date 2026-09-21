"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addChips } from "../lib/store";

export default function Home() {
  const [state, setState] = useState({ balance: 10000000 });
  const [open, setOpen] = useState(false);
  useEffect(() => setState(loadState()), []);
  function credit(n) {
    const next = addChips({ ...state }, n);
    saveState(next);
    setState({ ...next });
  }
  return (
    <div className="wrap">
      <div className="nav">
        <div className="brand">Donut Floor</div>
        <div className="bal">{Number(state.balance || 0).toLocaleString()} chips</div>
      </div>
      <div className="grid">
        <Link href="/games/roulette" className="cover">
          <div className="art art-roulette" />
          <div className="label"><h2>Roulette</h2><p>Live wheel. Red, black, green.</p></div>
        </Link>
        <Link href="/games/blackjack" className="cover">
          <div className="art art-bj" />
          <div className="label"><h2>Blackjack</h2><p>Hit or stand. Beat the dealer.</p></div>
        </Link>
        <Link href="/games/slots" className="cover">
          <div className="art art-slots">🍩 7️⃣ 💎</div>
          <div className="label"><h2>Slots</h2><p>Three spinning reels.</p></div>
        </Link>
        <div className="cover soon">
          <div className="art art-dice" />
          <div className="label"><h2>Craps</h2><p>Your table. Dice pit later.</p></div>
        </div>
        <div className="cover soon">
          <div className="art art-coin" />
          <div className="label"><h2>Coinflip</h2><p>Your table. 50/50 later.</p></div>
        </div>
        <div className="cover soon">
          <div className="art art-mines" />
          <div className="label"><h2>Mines</h2><p>Your table. Tiles later.</p></div>
        </div>
      </div>
      <div className="dev">
        <button className="btn ghost" onClick={() => setOpen(!open)}>{open ? "Hide" : "Dev menu"}</button>
        {open && (
          <div style={{ marginTop: 12 }}>
            <p className="muted">Demo bank. This browser only.</p>
            <div className="row">
              <button className="btn gold" onClick={() => credit(100000)}>+100K</button>
              <button className="btn gold" onClick={() => credit(1000000)}>+1M</button>
              <button className="btn gold" onClick={() => credit(10000000)}>+10M</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
