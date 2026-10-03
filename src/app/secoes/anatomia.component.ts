import { Component, computed, signal } from '@angular/core';
import { NgStyle } from '@angular/common';

interface Passo {
  arquivo: string;
  nome: string;
  papel: string;
  cor: string;
  explica: string;
  tarefa: string;
  exemplo: string;
  sugestao: string;
}

const PROPS_OK = ['background', 'background-color', 'color', 'border-radius', 'font-size', 'padding', 'border', 'width'];

/** Exercício guiado: o público DIGITA HTML, SCSS e TS (mini-interpretadores pré-programados) e vê a peça reagir. */
@Component({
  selector: 'app-anatomia',
  standalone: true,
  imports: [NgStyle],
  template: `
    <section class="sec">
      <span class="eb">Momento 1</span>
      <h1 class="h1">Toda peça tem <span style="color:var(--blue)">3 arquivos</span></h1>
      <p class="lead">
        Cada arquivo tem <strong>uma função só</strong>. Em vez de ler sobre isso, <strong>escreva</strong> cada um:
        o que você digitar aparece na peça ao lado, na hora.
      </p>
    </section>

    <section class="sec sec-last">
      <div class="passos">
        @for (p of passos; track p.arquivo; let i = $index) {
          <button class="passo" [class.on]="nivel() === i + 1" [class.feito]="ok(i + 1)" (click)="nivel.set(i + 1)">
            <span class="num mono" [style.color]="p.cor">{{ ok(i + 1) ? '✓' : i + 1 }}</span>
            <span class="pt"><strong>{{ p.nome }}</strong><span class="muted">{{ p.papel }}</span></span>
          </button>
        }
      </div>

      <div class="duo">
        <!-- EDITOR -->
        <div class="card box">
          <div class="mono tt" [style.color]="ativo().cor">{{ ativo().arquivo }}</div>
          <p class="explica">{{ ativo().explica }}</p>

          <div class="tarefa">
            <span class="mono rot">Escreva isto:</span>
            <pre class="code ex">{{ ativo().exemplo }}</pre>
            <button class="btn ghost peq" (click)="preencher()">Preencher para mim</button>
          </div>

          @switch (nivel()) {
            @case (1) {
              <textarea class="ed" rows="3" spellcheck="false" aria-label="Editor HTML" [value]="html()"
                (input)="html.set($any($event.target).value)" placeholder="Digite o HTML aqui..."></textarea>
            }
            @case (2) {
              <textarea class="ed" rows="6" spellcheck="false" aria-label="Editor SCSS" [value]="scss()"
                (input)="scss.set($any($event.target).value)" placeholder="Digite o SCSS aqui..."></textarea>
            }
            @default {
              <textarea class="ed" rows="4" spellcheck="false" aria-label="Editor TypeScript" [value]="ts()"
                (input)="ts.set($any($event.target).value)" placeholder="Digite o TS aqui..."></textarea>
            }
          }

          <div class="status" [class.bom]="ok(nivel())">
            @if (ok(nivel())) { ✓ {{ msgOk() }} } @else { {{ msgFalta() }} }
          </div>
          <p class="tente muted">{{ ativo().sugestao }}</p>
        </div>

        <!-- PREVIEW -->
        <div class="card box">
          <div class="mono tt">Resultado na tela</div>
          <div class="palco" [class.escuro]="nivel() >= 2">
            @if (nivel() === 1 && !htmlOk()) {
              <span class="vazio">Nada aqui ainda. Escreva o HTML.</span>
            } @else {
              <div class="coluna">
                <button class="alvo" [ngStyle]="estilo()" [class.cru]="nivel() === 1" (click)="clicar()">{{ texto() }}</button>
                @if (nivel() === 3) {
                  <div class="trilho"><div class="nave" [style.left.px]="x()" [style.background]="corNave()"></div></div>
                }
              </div>
            }
          </div>
          <p class="legenda">{{ legenda() }}</p>
          @if (nivel() === 3) {
            <button class="btn ghost peq" (click)="reiniciar()">Voltar a peça ao início</button>
          }
        </div>
      </div>

      @if (ok(1) && ok(2) && ok(3)) {
        <div class="parabens">
          <strong>Você acabou de escrever uma peça Angular completa.</strong>
          Estrutura (HTML) + aparência (SCSS) + comportamento (TS). É assim com toda peça do sistema.
        </div>
      }

      <div class="dica">
        <span>💡</span>
        <span>Separar assim facilita: quem cuida do <strong>visual</strong> mexe só no SCSS, e a <strong>lógica</strong> fica no TS.</span>
      </div>
    </section>
  `,
  styles: [`
    .passos { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-bottom: 20px; }
    .passo { display: flex; align-items: center; gap: 16px; padding: 18px 20px; text-align: left; color: var(--ink);
      border: 1px solid var(--line); border-radius: 16px; background: var(--surface); transition: border-color .2s, background .2s; }
    .passo:hover { border-color: var(--line-2); }
    .passo.on { border-color: var(--blue); background: var(--surface-3); }
    .passo.feito { border-color: #1f5a46; }
    .passo:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
    .num { font-size: 34px; font-weight: 700; min-width: 30px; }
    .pt { display: flex; flex-direction: column; gap: 2px; font-size: 18px; }
    .pt .muted { font-size: 14px; }
    .duo { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px; }
    .box { padding: 24px; display: flex; flex-direction: column; gap: 14px; }
    .tt { font-size: 12px; text-transform: uppercase; letter-spacing: .1em; color: #7dd3fc; }
    .explica { margin: 0; font-size: 17px; line-height: 1.6; color: var(--muted); }
    .tarefa { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
    .rot { font-size: 12px; color: var(--muted-2); text-transform: uppercase; letter-spacing: .1em; }
    .ex { width: 100%; background: var(--surface-2); border-radius: 10px; border: 1px dashed var(--line-2); padding: 12px 16px; color: var(--amber); }
    .peq { min-height: 40px; font-size: 13px; padding: 0 14px; }
    .ed { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line-2); background: #050a14;
      color: #c7d3f0; font-family: var(--mono); font-size: 15px; line-height: 1.6; resize: vertical; }
    .ed:focus { outline: 2px solid var(--blue); outline-offset: 1px; }
    .status { padding: 12px 14px; border-radius: 10px; background: var(--surface-2); font-size: 15px; color: var(--muted-2); }
    .status.bom { background: #0e2a22; color: var(--green); font-weight: 600; }
    .tente { margin: 0; font-size: 14px; }
    .palco { display: flex; align-items: center; justify-content: center; min-height: 260px; padding: 24px; border-radius: 14px;
      background: #fff; transition: background .4s; }
    .palco.escuro { background: var(--surface-2); }
    .coluna { display: flex; flex-direction: column; gap: 28px; width: 100%; align-items: center; }
    .vazio { color: #888; font-size: 15px; }
    .alvo { cursor: pointer; transition: all .3s; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 16px;
      min-height: 44px; padding: 0 22px; border: 0; border-radius: 12px; background: var(--blue); color: #fff; font-weight: 600; }
    .alvo.cru { font: 13px Arial, sans-serif; min-height: 0; padding: 2px 8px; border: 1px solid #767676; border-radius: 3px;
      background: #efefef; color: #000; font-weight: 400; }
    .trilho { position: relative; width: 100%; max-width: 360px; height: 40px; border-radius: 10px; background: var(--surface-3); }
    .nave { position: absolute; top: 4px; width: 32px; height: 32px; border-radius: 9px; transition: left .6s cubic-bezier(.3,1.3,.5,1), background .3s; }
    .legenda { margin: 0; font-size: 15px; color: var(--muted-2); }
    .parabens { margin-top: 20px; padding: 20px 24px; border-radius: 16px; border: 1px solid #1f5a46; background: #0e2a22;
      color: #a7f3d0; font-size: 18px; line-height: 1.5; animation: pop .3s ease; }
    .parabens strong { display: block; color: #fff; font-size: 20px; margin-bottom: 4px; }
  `],
})
export class AnatomiaComponent {
  readonly passos: Passo[] = [
    {
      arquivo: 'aviso.component.html', nome: 'HTML', cor: '#fb923c', papel: 'o esqueleto: o que existe na tela',
      explica: 'O HTML diz quais elementos existem. Sozinho, é cru e feio, e não faz nada. Crie um botão:',
      tarefa: 'botao', exemplo: '<button>Confirmar presença</button>',
      sugestao: 'Depois tente trocar o texto entre as marcas, por exemplo: <button>Enviar relatório</button>',
    },
    {
      arquivo: 'aviso.component.scss', nome: 'SCSS', cor: '#f472b6', papel: 'a roupa: como parece',
      explica: 'O SCSS cuida só da aparência: cores, formas, tamanhos. Não muda o que a peça faz. Vista o botão:',
      tarefa: 'estilo', exemplo: 'button {\n  background: orange;\n  border-radius: 20px;\n}',
      sugestao: 'Tente outras cores (purple, tomato, green), ou font-size: 24px; ou padding: 0 50px;',
    },
    {
      arquivo: 'aviso.component.ts', nome: 'TS', cor: '#60a5fa', papel: 'o cérebro: o que faz',
      explica: 'O TypeScript guarda os dados e as ações. Diga o que acontece quando clicam no botão: mova a nave.',
      tarefa: 'acao', exemplo: 'this.x = 220;',
      sugestao: 'Tente this.x = 50; ou this.x += 60; ou this.cor = \'tomato\'; (uma por linha) e clique no botão.',
    },
  ];

  readonly exemplos = this.passos.map(p => p.exemplo);

  nivel = signal(1);
  html = signal('');
  scss = signal('');
  ts = signal('');
  x = signal(0);
  corNave = signal('#22d3ee');

  ativo = computed(() => this.passos[this.nivel() - 1]);

  // ---- HTML: aceita <button>qualquer texto</button> ----
  private htmlMatch = computed(() => /^\s*<button>([^<>]+)<\/button>\s*$/i.exec(this.html()));
  htmlOk = computed(() => this.htmlMatch() !== null);
  texto = computed(() => this.htmlMatch()?.[1].trim() || 'Confirmar presença');

  // ---- SCSS: button { prop: valor; ... } ----
  private estiloObj = computed(() => {
    const m = /button\s*\{([^}]*)\}/i.exec(this.scss());
    const out: Record<string, string> = {};
    if (!m) return out;
    for (const d of m[1].split(';')) {
      const i = d.indexOf(':');
      if (i < 0) continue;
      const prop = d.slice(0, i).trim().toLowerCase();
      const val = d.slice(i + 1).trim();
      if (PROPS_OK.includes(prop) && val && CSS.supports(prop, val)) out[prop] = val;
    }
    return out;
  });
  scssOk = computed(() => Object.keys(this.estiloObj()).length > 0);
  estilo = computed(() => (this.nivel() >= 2 ? this.estiloObj() : {}));

  // ---- TS: this.x = N; this.x += N; this.x -= N; this.cor = '...'; ----
  private acoes = computed(() => {
    const out: (() => void)[] = [];
    for (const l of this.ts().split(/[;\n]/)) {
      const s = l.trim();
      let m = /^this\.x\s*(=|\+=|-=)\s*(-?\d+)$/.exec(s);
      if (m) {
        const n = parseInt(m[2], 10);
        out.push(() => this.x.update(v => this.limita(m![1] === '=' ? n : m![1] === '+=' ? v + n : v - n)));
        continue;
      }
      m = /^this\.cor\s*=\s*['"]([^'"]+)['"]$/.exec(s);
      if (m && CSS.supports('color', m[1])) { const c = m[1]; out.push(() => this.corNave.set(c)); }
    }
    return out;
  });
  tsOk = computed(() => this.acoes().length > 0);

  ok(n: number) { return n === 1 ? this.htmlOk() : n === 2 ? this.scssOk() : this.tsOk(); }

  msgOk = computed(() => {
    switch (this.nivel()) {
      case 1: return 'O elemento apareceu. Isso é o HTML: a estrutura.';
      case 2: return 'O botão mudou. Isso é o SCSS: só aparência.';
      default: return 'Pronto! Agora clique no botão e veja a nave se mover.';
    }
  });
  msgFalta = computed(() => {
    switch (this.nivel()) {
      case 1: return this.html().trim() ? 'Ainda não reconheci. Use exatamente <button>texto</button>.' : 'Esperando você digitar...';
      case 2: return this.scss().trim() ? 'Ainda não reconheci. Escreva button { background: orange; }' : 'Esperando você digitar...';
      default: return this.ts().trim() ? 'Ainda não reconheci. Escreva this.x = 220;' : 'Esperando você digitar...';
    }
  });
  legenda = computed(() => {
    switch (this.nivel()) {
      case 1: return 'Só HTML: o botão existe, mas está cru. Clicar não faz nada.';
      case 2: return 'HTML + SCSS: mesmo botão, outra aparência. Clicar ainda não faz nada.';
      default: return 'HTML + SCSS + TS: clique no botão e o TS que você escreveu roda.';
    }
  });

  preencher() {
    const ex = this.exemplos[this.nivel() - 1];
    if (this.nivel() === 1) this.html.set(ex);
    else if (this.nivel() === 2) this.scss.set(ex);
    else this.ts.set(ex);
  }

  clicar() {
    if (this.nivel() !== 3) return;
    for (const a of this.acoes()) a();
  }

  reiniciar() { this.x.set(0); this.corNave.set('#22d3ee'); }
  private limita(v: number) { return Math.max(0, Math.min(v, 320)); }
}
