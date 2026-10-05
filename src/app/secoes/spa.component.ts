import { Component, OnDestroy, computed, signal } from '@angular/core';
import { MENSAGENS, rotuloPrioridade } from '../mensagem';

type Modo = 'sem' | 'com';
type Pagina = 'caixa' | 'urgentes' | 'contador' | 'sobre';

/** Navegador de brinquedo: compara site tradicional (recarrega tudo) com SPA (troca só o miolo). */
@Component({
  selector: 'app-spa',
  standalone: true,
  template: `
    <section class="sec">
      <span class="eb">Momento 4</span>
      <h1 class="h1">Uma página <span style="color:var(--violet)">só</span></h1>
      <p class="lead">
        No site tradicional, cada clique <strong>baixa a página inteira de novo</strong>: topo, menu, tudo.
        No Angular o topo e o menu ficam, e <strong>só o miolo troca</strong>. Em Angular a tela também é uma <strong>fotografia dos dados</strong>: o contador mantém o valor ao navegar, enquanto no site tradicional ele volta ao zero a cada recarga. Clique nas abas nos dois modos e compare.
      </p>
      <div class="modos">
        <button class="chip" [class.on]="modo() === 'sem'" (click)="trocarModo('sem')">Site tradicional</button>
        <button class="chip" [class.on]="modo() === 'com'" (click)="trocarModo('com')">Angular (SPA)</button>
      </div>
    </section>

    <section class="sec sec-last">
      <div class="card nav-win">
        <div class="url">
          <span class="b" style="background:#f87171"></span><span class="b" style="background:#fbbf24"></span><span class="b" style="background:#34d399"></span>
          <div class="endereco mono">sistema.exemplo/{{ pagina() }}</div>
          @if (carregando()) { <span class="girando mono">carregando…</span> }
        </div>
        <div class="progresso">@if (carregando()) { <div class="fita"></div> }</div>

        @if (carregando()) {
          <div class="branco" aria-live="polite">
            <p class="mono">Página em branco: o navegador está baixando tudo outra vez…</p>
          </div>
        } @else {
          <div class="site">
            <div class="cab-site">
              <strong class="mono" [class.pisca]="piscou()">⚓ SISTEMA</strong>
              <span class="tag">contador: {{ n() }}</span>
              <nav>
                @for (p of paginas; track p.id) {
                  <button class="aba" [class.on]="pagina() === p.id" (click)="ir(p.id)">{{ p.nome }}</button>
                }
              </nav>
            </div>
            <div class="miolo" [class.troca]="piscou()">
              @switch (pagina()) {
                @case ('caixa') {
                  <h3>Caixa de entrada</h3>
                  @for (m of caixa; track m.assunto) {
                    <div class="msg"><span>{{ m.assunto }}</span><span class="muted">{{ m.remetente }}</span></div>
                  }
                }
                @case ('urgentes') {
                  <h3>Urgentes</h3>
                  @for (m of urgentes; track m.assunto) {
                    <div class="msg"><span>{{ m.assunto }}</span><span class="tag">{{ rotulo(m.prioridade) }}</span></div>
                  }
                }
                @case ('contador') {
                  <h3>Contador compartilhado</h3>
                  <div class="cont">
                    <button class="btn ghost" (click)="mudar(-1)" aria-label="Diminuir">−</button>
                    <div class="num" [style.color]="cor()">{{ n() }}</div>
                    <button class="btn" (click)="mudar(1)" aria-label="Aumentar">+</button>
                  </div>
                  <div class="barra"><div class="enche" [style.width.%]="pct()" [style.background]="cor()"></div></div>
                  <div class="chips">
                    <span class="tag">título: Contagem {{ n() }}</span>
                    <span class="tag">{{ n() % 2 === 0 ? 'par' : 'ímpar' }}</span>
                    <span class="tag">{{ pct() }}%</span>
                  </div>
                  <p class="muted">Um número só. Número, barra, cor, etiquetas e o contador do topo seguem ele. Mude de aba e volte: no tradicional ele zera.</p>
                }
                @case ('sobre') {
                  <h3>Sobre</h3>
                  <p class="muted">Esta área mudou, mas o topo e o menu nem piscaram. É o que a SPA faz.</p>
                }
              }
            </div>
          </div>
        }
      </div>

      <div class="grid placar">
        <div class="card cx">
          <div class="mono rot">Recarregamentos completos</div>
          <div class="v" [style.color]="recargas() ? 'var(--red)' : 'var(--green)'">{{ recargas() }}</div>
        </div>
        <div class="card cx">
          <div class="mono rot">Cliques</div>
          <div class="v">{{ cliques() }}</div>
        </div>
        <div class="card cx">
          <div class="mono rot">Modo</div>
          <div class="v peq">{{ modo() === 'sem' ? 'Tradicional' : 'Angular' }}</div>
        </div>
      </div>

      <div class="dica">
        <span>💡</span>
        <span>Menos coisa para baixar, nada de tela piscando, e o sistema parece um <strong>aplicativo</strong>, não um site.</span>
      </div>
    </section>
  `,
  styles: [`
    .modos { display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap; }
    .nav-win { overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,.5); }
    .url { display: flex; align-items: center; gap: 8px; padding: 14px 18px; border-bottom: 1px solid var(--line); }
    .b { width: 11px; height: 11px; border-radius: 50%; }
    .endereco { margin-left: 12px; flex: 1; padding: 8px 14px; border-radius: 8px; background: var(--surface-2); font-size: 13px; color: var(--muted-2); }
    .girando { font-size: 12px; color: var(--amber); }
    .progresso { height: 3px; background: transparent; overflow: hidden; }
    .fita { width: 30%; height: 100%; background: var(--amber); animation: slide .9s linear infinite; }
    .branco { min-height: 340px; background: #fff; color: #888; display: flex; align-items: center; justify-content: center; text-align: center; padding: 24px; }
    .site { min-height: 340px; }
    .cab-site { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding: 12px 20px; background: var(--surface-2); border-bottom: 1px solid var(--line); }
    .aba { min-height: 44px; padding: 0 16px; border: 0; border-radius: 9px; background: transparent; color: var(--muted-2); font-size: 15px; }
    .aba.on { background: var(--surface-3); color: #fff; }
    .pisca { color: var(--green); }
    .miolo { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
    .miolo.troca { animation: pop .25s ease; }
    h3 { margin: 0 0 8px; font-size: 22px; }
    .cont { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .cont .btn { width: 64px; font-size: 26px; }
    .num { font-family: var(--mono); font-size: 72px; font-weight: 700; line-height: 1; transition: color .3s; }
    .barra { height: 12px; border-radius: 999px; background: var(--surface-3); overflow: hidden; }
    .enche { height: 100%; border-radius: 999px; transition: width .3s, background .3s; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .msg { display: flex; justify-content: space-between; gap: 12px; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--line); }
    .placar { margin-top: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
    .cx { padding: 20px 24px; }
    .rot { font-size: 12px; color: var(--muted-2); text-transform: uppercase; letter-spacing: .08em; }
    .v { font-family: var(--mono); font-size: 48px; font-weight: 700; margin-top: 6px; }
    .v.peq { font-size: 32px; padding-top: 10px; }
  `],
})
export class SpaComponent implements OnDestroy {
  readonly paginas: { id: Pagina; nome: string }[] = [
    { id: 'caixa', nome: 'Caixa' }, { id: 'urgentes', nome: 'Urgentes' }, { id: 'contador', nome: 'Contador' }, { id: 'sobre', nome: 'Sobre' },
  ];
  readonly rotulo = rotuloPrioridade;
  readonly caixa = MENSAGENS.slice(0, 4);
  readonly urgentes = MENSAGENS.filter(m => m.prioridade === 'emergencia' || m.prioridade === 'imediata').slice(0, 4);

  modo = signal<Modo>('sem');
  pagina = signal<Pagina>('caixa');
  carregando = signal(false);
  piscou = signal(false);
  recargas = signal(0);
  cliques = signal(0);
  n = signal(5);
  pct = computed(() => Math.round(Math.min(Math.max(this.n(), 0), 20) / 20 * 100));
  cor = computed(() => (this.n() < 0 ? '#f87171' : this.n() < 10 ? '#fbbf24' : '#34d399'));
  mudar(d: number) { this.n.update(v => v + d); }
  private timer?: ReturnType<typeof setTimeout>;

  ir(p: Pagina) {
    if (p === this.pagina() || this.carregando()) return;
    this.cliques.update(v => v + 1);
    if (this.modo() === 'sem') {
      this.carregando.set(true);
      this.recargas.update(v => v + 1);
      this.timer = setTimeout(() => { this.pagina.set(p); this.n.set(5); this.carregando.set(false); }, 1100);
    } else {
      this.pagina.set(p);
      this.piscou.set(true);
      this.timer = setTimeout(() => this.piscou.set(false), 300);
    }
  }

  trocarModo(m: Modo) {
    clearTimeout(this.timer);
    this.modo.set(m);
    this.carregando.set(false);
    this.recargas.set(0);
    this.cliques.set(0);
    this.n.set(5);
    this.pagina.set('caixa');
  }

  ngOnDestroy() { clearTimeout(this.timer); }
}
