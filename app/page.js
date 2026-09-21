"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, defaultState } from "../lib/store";

export default function Home() {
  const [state, setState] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setState(loadState());
  }, []);

  function signIn(e) {
    e.preventDefault();
    const username = name.trim() || "Player";
    const next = loadState() && loadState().username === username
      ? loadState()
      : defaultState(username);
    saveState(next);
    setState(next);
  }

  function signOut() {
    localStorage.removeItem("donut_casino_v2");
    localStorage.removeItem("donut_casino_v1");
    setState(null);
  }

  if (!state) {
    return (
      <div className="wrap">
        <h1 className="brand">DonutSMP Casino</h1>
        <div className="card" style={{ maxWidth: 420, marginTop: 24 }}>
          <h2>Sign in</h2>
          <p className="muted">Pick a name. Every new account starts with 10,000,000 chips.</p>
          <form onSubmit={signIn}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Minecraft username" />
            <button className="btn" type="submit">Enter the floor</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="nav">
        <div className="brand">DonutSMP Casino</div>
        <div className="bal">{state.username} · {state.balance.toLocaleString()} chips</div>
      </div>
      <div className="grid">
        <Link href="/deposit" className="card"><h2>Pay the bot</h2><p className="muted">Get a DonutSMP pay code. When the bot sees it, chips land here.</p></Link>
        <Link href="/games/slots" className="card"><h2>Slots</h2><p className="muted">Three reels. Donuts and sevens.</p></Link>
        <Link href="/games/roulette" className="card"><h2>Roulette</h2><p className="muted">Red, black, or green zero.</p></Link>
        <Link href="/games/blackjack" className="card"><h2>Blackjack</h2><p className="muted">Hit 17 house style.</p></Link>
        <Link href="/games/craps" className="card"><h2>Craps</h2><p className="muted">Two dice. Seven or eleven pays.</p></Link>
        <Link href="/games/coinflip" className="card"><h2>Coinflip</h2><p className="muted">Heads or tails. Even money.</p></Link>
        <Link href="/games/mines" className="card"><h2>Mines</h2><p className="muted">3 safe tiles vs 3 bombs. 4x.</p></Link>
        <Link href="/games/hilo" className="card"><h2>Hi-Lo</h2><p className="muted">High, low, or lucky 7.</p></Link>
      </div>
      <p style={{ marginTop: 24 }}>
        <button className="btn ghost" onClick={signOut}>Sign out</button>
      </p>
    </div>
  );
}
