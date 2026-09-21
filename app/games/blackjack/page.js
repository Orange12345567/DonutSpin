"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState, addHistory } from "../../../lib/store";

function draw() {
  const faces = [
    { v: 11, t: "A♠" }, { v: 10, t: "K♥", red: true }, { v: 10, t: "Q♦", red: true },
    { v: 10, t: "J♣" }, { v: 10, t: "10♠" }, { v: 9, t: "9♥", red: true },
    { v: 8, t: "8♦", red: true }, { v: 7, t: "7♣" }, { v: 6, t: "6♠" },
    { v: 5, t: "5♥", red: true }, { v: 4, t: "4♦", red: true }, { v: 3, t: "3♣" }, { v: 2, t: "2♠" }
  ];
  return faces[Math.floor(Math.random() * faces.length)];
}
function total(hand) {
  let s = hand.reduce((a, c) => a + c.v, 0);
  let aces = hand.filter((c) => c.v === 11).length;
  while (s > 21 && aces) { s -= 10; aces--; }
  return s;
}

export default function Blackjack() {
  const [state, setState] = useState({ balance: 0 });
  const [bet, setBet] = useState(25000);
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [live, setLive] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => setState(loadState()), []);

  function settle(p, d, b) {
    const ps = total(p), ds = total(d);
    let win = 0;
    if (ps > 21) win = 0;
    else if (ds > 21 || ps > ds) win = b * 2;
    else if (ps === ds) win = b;
    const bank = loadState();
    const next = { ...bank, balance: bank.balance - b + win };
    addHistory(next, { type: "blackjack", bet: b, win, note: ps + " vs " + ds });
    saveState(next);
    setState({ ...next });
    setLive(false);
    if (ps > 21) setMsg("Bust");
    else if (win === b) setMsg("Push");
    else if (win > 0) setMsg("You win " + win.toLocaleString());
    else setMsg("Dealer wins");
  }

  function deal() {
    const b = Math.max(1, Number(bet) || 0);
    if (loadState().balance < b) return alert("Need more chips.");
    const p = [draw(), draw()];
    const d = [draw(), draw()];
    setPlayer(p); setDealer(d); setLive(true); setMsg("");
    if (total(p) === 21) settle(p, d, b);
  }
  function hit() {
    if (!live) return;
    const p = [...player, draw()];
    setPlayer(p);
    if (total(p) >= 21) stay(p);
  }
  function stay(pHand) {
    const p = pHand || player;
    let d = [...dealer];
    while (total(d) < 17) d.push(draw());
    setDealer(d);
    settle(p, d, Math.max(1, Number(bet) || 0));
  }

  return (
    <div className="wrap">
      <div className="nav">
        <Link href="/" className="brand">← Floor</Link>
        <div className="bal">{Number(state.balance).toLocaleString()}</div>
      </div>
      <div className="table">
        <h2>Blackjack</h2>
        <p className="muted">Dealer {dealer.length ? (live ? total([dealer[0]]) + " + ?" : total(dealer)) : "-"}</p>
        <div className="hand">
          {dealer.map((c, i) => (
            <div key={i} className={"playing-card" + (live && i === 1 ? " back" : c.red ? " red" : "")}>
              {live && i === 1 ? "" : c.t}
            </div>
          ))}
        </div>
        <p className="muted">You {player.length ? total(player) : "-"}</p>
        <div className="hand">
          {player.map((c, i) => (
            <div key={i} className={"playing-card" + (c.red ? " red" : "")}>{c.t}</div>
          ))}
        </div>
        <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} disabled={live} />
        <div className="row">
          {!live && <button className="btn" onClick={deal}>Deal</button>}
          {live && <button className="btn" onClick={hit}>Hit</button>}
          {live && <button className="btn gold" onClick={() => stay()}>Stand</button>}
        </div>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
