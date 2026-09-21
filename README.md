# DonutSMP Casino

New accounts start with **10,000,000** chips.

Games: Slots, Roulette, Blackjack, Craps, Coinflip, Mines, Hi-Lo.

Balance goes up and down when you bet. Saved in the browser.

## GitHub + Vercel (what you asked for)

1. Unzip this folder.
2. Create an empty GitHub repo named `donutsmp-casino`.
3. In the folder:

```
git init
git add .
git commit -m "first chip"
git branch -M main
git remote add origin https://github.com/YOURUSER/donutsmp-casino.git
git push -u origin main
```

4. vercel.com → Add New → Project → import that repo → Next.js → Deploy.

## Local test (optional)

Install Node.js LTS, then in this folder:

```
npm install
npm run dev
```

Open http://localhost:3000

If you already signed in on an old version, hit Sign out once so the 10M starter applies.
