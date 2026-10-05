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
      <span class="eb">Momento 2</span>
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

          @if (nivel() === 3) {
            <pre class="code dado">// dado guardado na peça
mensagem = '••••••••••••••••••';</pre>
          }

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
          @if (ativo().sugestao) { <p class="tente muted">{{ ativo().sugestao }}</p> }
        </div>

        <!-- PREVIEW -->
        <div class="card box">
          <div class="mono tt">Resultado na tela</div>
          <div class="palco">
            @if (nivel() === 1 && !htmlOk()) {
              <span class="vazio">Nada aqui ainda. Escreva o HTML.</span>
            } @else {
              <div class="coluna">
                <button class="alvo" [ngStyle]="estilo()" [class.cru]="!vestido()" (click)="clicar()">{{ texto() }}</button>
              </div>
            }
          </div>
          <p class="legenda">{{ legenda() }}</p>
        </div>
      </div>

      @if (aviso()) {
        <div class="fundo" (click)="aviso.set('')" role="presentation">
          <div class="modal" role="alertdialog" aria-modal="true" (click)="$event.stopPropagation()">
            <div class="selo">✓</div>
            <p class="msg">{{ aviso() }}</p>
            <button class="btn" (click)="aviso.set('')">OK</button>
          </div>
        </div>
      }

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
    .dado { background: var(--surface-2); border-radius: 10px; padding: 12px 16px; color: #7dd3fc; }
    .peq { min-height: 40px; font-size: 13px; padding: 0 14px; }
    .ed { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line-2); background: #050a14;
      color: #c7d3f0; font-family: var(--mono); font-size: 15px; line-height: 1.6; resize: vertical; }
    .ed:focus { outline: 2px solid var(--blue); outline-offset: 1px; }
    .status { padding: 12px 14px; border-radius: 10px; background: var(--surface-2); font-size: 15px; color: var(--muted-2); }
    .status.bom { background: #0e2a22; color: var(--green); font-weight: 600; }
    .tente { margin: 0; font-size: 14px; }
    .palco { display: flex; align-items: center; justify-content: center; min-height: 260px; padding: 24px; border-radius: 14px;
      background: #fff; transition: background .4s; }
    .coluna { display: flex; flex-direction: column; gap: 28px; width: 100%; align-items: center; }
    .vazio { color: #888; font-size: 15px; }
    .alvo { cursor: pointer; transition: all .3s; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 16px;
      min-height: 44px; padding: 0 22px; border: 0; border-radius: 12px; background: var(--blue); color: #fff; font-weight: 600; }
    .alvo.cru { font: 13px Arial, sans-serif; min-height: 0; padding: 2px 8px; border: 1px solid #767676; border-radius: 3px;
      background: #efefef; color: #000; font-weight: 400; }
    .fundo { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center;
      padding: 24px; background: rgba(3, 6, 14, .72); backdrop-filter: blur(6px); animation: pop .2s ease; }
    .modal { width: min(640px, 100%); padding: 44px 40px; border-radius: 28px; text-align: center; background: var(--surface);
      border: 1px solid var(--blue); box-shadow: 0 0 0 6px rgba(59,130,246,.15), 0 40px 100px rgba(0,0,0,.7);
      display: flex; flex-direction: column; align-items: center; gap: 24px; animation: pop .3s cubic-bezier(.3,1.4,.5,1); }
    .selo { width: 72px; height: 72px; border-radius: 50%; background: var(--green); color: #052016; display: flex;
      align-items: center; justify-content: center; font-size: 40px; font-weight: 700; }
    .msg { margin: 0; font-size: clamp(26px, 4vw, 38px); font-weight: 700; line-height: 1.25; letter-spacing: -.02em; overflow-wrap: anywhere; }
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
      sugestao: '',
    },
    {
      arquivo: 'aviso.component.scss', nome: 'SCSS', cor: '#f472b6', papel: 'a roupa: como parece',
      explica: 'O SCSS cuida só da aparência: cores, formas, tamanhos. Não muda o que a peça faz. Vista o botão:',
      tarefa: 'estilo', exemplo: 'button {\n  background: orange;\n  border-radius: 20px;\n}',
      sugestao: 'Tente outras cores (purple, tomato, green), ou font-size: 24px; ou padding: 0 50px;',
    },
    {
      arquivo: 'aviso.component.ts', nome: 'TS', cor: '#60a5fa', papel: 'o cérebro: o que faz',
      explica: 'O TypeScript guarda os dados e as ações. A peça já guarda uma mensagem secreta. Diga o que acontece quando clicam no botão: mostrar essa mensagem na tela.',
      tarefa: 'acao', exemplo: 'alert(this.mensagem);',
      sugestao: 'O alert() faz um aviso aparecer. this.mensagem é o dado guardado na peça.',
    },
  ];

  readonly exemplos = this.passos.map(p => p.exemplo);

  nivel = signal(1);
  html = signal('');
  scss = signal('');
  ts = signal('');
  aviso = signal('');

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
  vestido = computed(() => this.nivel() >= 2 && this.scssOk());
  estilo = computed(() => (this.nivel() >= 2 ? this.estiloObj() : {}));

  // ---- TS: alert(this.mensagem); (ou alert('frase própria');) ----
  private readonly segredo = 'Programei meu primeiro botão usando Angular!';
  private alertaMatch = computed(() =>
    /^\s*(?:window\.)?alert\(\s*(?:this\.mensagem|(['"`])([\s\S]+?)\1)\s*\)\s*;?\s*$/.exec(this.ts()));
  tsOk = computed(() => this.alertaMatch() !== null);

  ok(n: number) { return n === 1 ? this.htmlOk() : n === 2 ? this.scssOk() : this.tsOk(); }

  msgOk = computed(() => {
    switch (this.nivel()) {
      case 1: return 'O elemento apareceu. Isso é o HTML: a estrutura.';
      case 2: return 'O botão mudou. Isso é o SCSS: só aparência.';
      default: return 'Pronto! Agora clique no botão da direita.';
    }
  });
  msgFalta = computed(() => {
    switch (this.nivel()) {
      case 1: return this.html().trim() ? 'Ainda não reconheci. Use exatamente <button>texto</button>.' : 'Esperando você digitar...';
      case 2: return this.scss().trim() ? 'Ainda não reconheci. Escreva button { background: orange; }' : 'Esperando você digitar...';
      default: return this.ts().trim() ? 'Ainda não reconheci. Escreva alert(this.mensagem);' : 'Esperando você digitar...';
    }
  });
  legenda = computed(() => {
    switch (this.nivel()) {
      case 1: return 'Só HTML: o botão existe, mas está cru. Clicar não faz nada.';
      case 2: return 'HTML + SCSS: mesmo botão, outra aparência. Clicar ainda não faz nada.';
      default: return 'HTML + SCSS + TS: clique no botão e o código que você escreveu roda.';
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
    const m = this.alertaMatch();
    if (m) this.aviso.set(m[2] ? m[2].trim() : this.segredo);
  }
}
