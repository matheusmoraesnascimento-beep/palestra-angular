#!/usr/bin/env bash
# Deploy do site para GitHub Pages (branch gh-pages).
# Uso: ./deploy.sh
# Faz: build -> corrige <base href> -> monta browser/ + 404.html + .nojekyll -> push gh-pages
set -euo pipefail

cd "$(dirname "$0")"

BASE="/palestra-angular/"
BROWSER="dist/palestra-angular/browser"
WT="/tmp/ghp-palestra"

echo ">> build"
# Usa o binario local: `npx ng build` trava (resolucao de pacote) e estoura timeout.
# --base-href some via proxy RTK; corrigimos por sed abaixo em vez de confiar no flag.
./node_modules/.bin/ng build

echo ">> corrige <base href>"
sed -i "s#<base href=\"/\">#<base href=\"$BASE\">#" "$BROWSER/index.html"
grep -o '<base[^>]*>' "$BROWSER/index.html"

echo ">> monta worktree gh-pages"
rm -rf "$WT"
git worktree add --force "$WT" gh-pages
find "$WT" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r "$BROWSER"/. "$WT"/
cp "$WT/index.html" "$WT/404.html"   # fallback SPA no GitHub Pages
touch "$WT/.nojekyll"

echo ">> commit + push"
git -C "$WT" add -A
git -C "$WT" commit -q -m "deploy: ${1:-atualizacao do site}" || echo "nada a commitar"
git -C "$WT" push origin gh-pages

echo ">> limpa worktree"
git worktree remove "$WT" --force
git worktree prune

echo ">> pronto: https://matheusmoraesnascimento-beep.github.io/palestra-angular/"
