# palestra-angular

Guia interativo de Angular (apresentação). Angular 17, standalone components, Material.
Abas em `src/app/app.component.html`; cada seção em `src/app/secoes/`.

## Regra de deploy (IMPORTANTE)
**Sempre que modificar qualquer coisa do site, já buildar e publicar** — sem esperar o usuário pedir.
Rodar `./deploy.sh` (commit da fonte no `main` continua manual/normal).

Deploy = branch `gh-pages` (GitHub Pages serve dela na raiz):
1. `./node_modules/.bin/ng build` — **nunca `npx ng build`** (trava e estoura timeout)
2. corrige `<base href="/">` → `<base href="/palestra-angular/">` (o flag `--base-href` some via proxy RTK, por isso sed)
3. conteúdo de `dist/palestra-angular/browser/` na raiz da branch + `404.html` (cópia do index, fallback SPA) + `.nojekyll`
4. push `gh-pages`

Site: https://matheusmoraesnascimento-beep.github.io/palestra-angular/ (propaga em ~1-2 min).

## Autor
Assinatura no header: **1T(RM2-T) Moraes**.
