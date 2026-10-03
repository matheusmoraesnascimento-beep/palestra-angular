import { Component, computed, signal } from '@angular/core';
import { MENSAGENS, rotuloPrioridade } from '../mensagem';

/** Tudo reage ao que o usuário digita/clica, sem código de "atualizar a tela". */
@Component({
  selector: 'app-dados-vivos',
  standalone: true,
  template: `
    <section class="sec">
      <span class="eb">Momento 4</span>
      <h1 class="h1">Dados <span style="color:var(--amber)">vivos</span></h1>
      <p class="lead">
        Em Angular, a tela é uma <strong>fotografia dos dados</strong>. Mudou o dado, a tela se redesenha sozinha.
        Mexa nos controles.
      </p>
    </section>

    <section class="sec">
      <div class="grid duas">
        <!-- Experimento 1: nome ao vivo -->
        <div class="card box">
          <div class="mono tt">Experimento 1 · Escreva seu nome</div>
          <input class="input" [value]="nome()" (input)="nome.set($any($event.target).value)" placeholder="Digite aqui..." maxlength="24" aria-label="Seu nome">
          <div class="espelho">
            <span class="avatar">{{ inicial() }}</span>
            <div>
              <div class="oi">Olá, {{ nome() || 'visitante' }}!</div>
              <div class="muted">{{ nome().length }} letras</div>
            </div>
          </div>
          <pre class="code">nome = '{{ nome() }}'</pre>
          <p class="muted peq">Três lugares mudam. Você escreveu zero linhas para atualizar cada um.</p>
        </div>

        <!-- Experimento 2: contador -->
        <div class="card box">
          <div class="mono tt">Experimento 2 · Contador compartilhado</div>
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
          <p class="muted peq">Um número só. Número, barra, cor e etiquetas seguem ele.</p>
        </div>
      </div>

      <!-- Experimento 3: filtro -->
      <div class="card box grande">
        <div class="mono tt">Experimento 3 · Filtrar mensagens enquanto digita</div>
        <input class="input" [value]="busca()" (input)="busca.set($any($event.target).value)" placeholder="Tente: capitania, escala, alfa..." aria-label="Buscar mensagens">
        <div class="prio">
          @for (p of prioridades; track p) {
            <button class="chip" [class.on]="filtro() === p" (click)="filtro.set(filtro() === p ? '' : p)">{{ rotulo(p) }}</button>
          }
          <span class="tag" style="margin-left:auto">{{ resultado().length }} de {{ todas.length }}</span>
        </div>
        <ul class="lista">
          @for (m of resultado(); track m.assunto) {
            <li class="linha">
              <span class="p" [attr.data-p]="m.prioridade">{{ rotulo(m.prioridade) }}</span>
              <span class="a">{{ m.assunto }}</span>
              <span class="r muted">{{ m.remetente }}</span>
            </li>
          } @empty {
            <li class="vazio">Nada encontrado. Apague uma letra.</li>
          }
        </ul>
      </div>

      <div class="dica">
        <span>💡</span>
        <span><strong>Sem Angular</strong> você escreve: "achou o elemento, apagou a lista, recriou cada linha, atualizou o contador". <strong>Com Angular</strong> você só diz como a tela é, a partir dos dados.</span>
      </div>
    </section>
    <div style="height:96px"></div>
  `,
  styles: [`
    .duas { grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); }
    .box { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
    .grande { margin-top: 20px; }
    .tt { font-size: 12px; color: #7dd3fc; text-transform: uppercase; letter-spacing: .1em; }
    .espelho { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 14px; background: var(--surface-2); }
    .avatar { width: 56px; height: 56px; border-radius: 16px; background: var(--blue); display: flex;
      align-items: center; justify-content: center; font-size: 26px; font-weight: 700; color: #fff; }
    .oi { font-size: 24px; font-weight: 700; letter-spacing: -.02em; overflow-wrap: anywhere; }
    .code { padding: 12px 16px; background: var(--surface-2); border-radius: 10px; }
    .peq { font-size: 14px; margin: 0; }
    .cont { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .cont .btn { width: 64px; font-size: 26px; }
    .num { font-family: var(--mono); font-size: 84px; font-weight: 700; line-height: 1; transition: color .3s; }
    .barra { height: 12px; border-radius: 999px; background: var(--surface-3); overflow: hidden; }
    .enche { height: 100%; border-radius: 999px; transition: width .3s, background .3s; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .prio { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .lista { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .linha { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 12px 16px; border-radius: 12px;
      border: 1px solid var(--line); background: var(--surface-2); animation: pop .2s ease; }
    .a { flex: 1 1 220px; font-weight: 600; }
    .r { font-size: 14px; }
    .p { font-family: var(--mono); font-size: 11px; padding: 4px 9px; border-radius: 6px; background: var(--surface-3); min-width: 96px; text-align: center; }
    .p[data-p='emergencia'] { background: #4a1d1d; color: #fca5a5; }
    .p[data-p='imediata'] { background: #4a3a10; color: #fcd34d; }
    .p[data-p='instantanea'] { background: #2d2358; color: #c4b5fd; }
    .p[data-p='preferencial'] { background: #0f3a45; color: #67e8f9; }
    .vazio { color: var(--muted-2); padding: 12px 4px; }
  `],
})
export class DadosVivosComponent {
  readonly todas = MENSAGENS;
  readonly prioridades = ['emergencia', 'imediata', 'preferencial', 'rotina', 'instantanea'] as const;
  readonly rotulo = rotuloPrioridade;

  nome = signal('');
  inicial = computed(() => this.nome().trim().charAt(0).toUpperCase() || '?');

  n = signal(5);
  pct = computed(() => Math.round(Math.min(Math.max(this.n(), 0), 20) / 20 * 100));
  cor = computed(() => (this.n() < 0 ? '#f87171' : this.n() < 10 ? '#fbbf24' : '#34d399'));
  mudar(d: number) { this.n.update(v => v + d); }

  busca = signal('');
  filtro = signal('');
  resultado = computed(() => {
    const q = this.busca().trim().toLowerCase();
    return this.todas.filter(m =>
      (!this.filtro() || m.prioridade === this.filtro()) &&
      (!q || (m.assunto + ' ' + m.remetente).toLowerCase().includes(q)));
  });
}
