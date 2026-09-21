# DonutSMP Casino — run this in PowerShell on your PC
# Right-click this file -> Run with PowerShell
# Or:  Set-ExecutionPolicy -Scope Process Bypass; .\setup.ps1

$ErrorActionPreference = "Stop"
Write-Host "=== DonutSMP Casino setup ===" -ForegroundColor Magenta

function Need-Cmd($name, $hint) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Host "MISSING: $name" -ForegroundColor Red
    Write-Host $hint
    exit 1
  }
}

Need-Cmd node "Install Node.js LTS from https://nodejs.org then reopen PowerShell."
Need-Cmd npm  "Node installed but npm missing. Reinstall Node.js LTS."
Need-Cmd git  "Install Git from https://git-scm.com/download/win then reopen PowerShell."

Set-Location $PSScriptRoot
Write-Host "Installing packages..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Local site:  npm run dev" -ForegroundColor Green
Write-Host "Then open   http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Put it on GitHub + Vercel:" -ForegroundColor Cyan
Write-Host "  1. Create an empty GitHub repo named donutsmp-casino"
Write-Host "  2. Run the commands printed below (edit YOURUSER)"
Write-Host ""
Write-Host "git init"
Write-Host "git add ."
Write-Host "git commit -m `"first chip`""
Write-Host "git branch -M main"
Write-Host "git remote add origin https://github.com/YOURUSER/donutsmp-casino.git"
Write-Host "git push -u origin main"
Write-Host ""
Write-Host "  3. Go to https://vercel.com -> Add New -> Project -> Import that repo"
Write-Host "  4. Framework preset: Next.js -> Deploy"
Write-Host ""
Write-Host "Demo deposit button is ON PURPOSE. A live DonutSMP pay-bot is a separate Minecraft plugin you add later."
Write-Host "Done."
