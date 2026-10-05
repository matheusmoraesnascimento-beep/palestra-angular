import { Component, output } from '@angular/core';

@Component({
  selector: 'app-encerramento',
  standalone: true,
  template: `
    <div class="glow" style="top:-100px;left:50%;width:900px;height:900px;margin-left:-450px;background:var(--blue)"></div>

    <section class="sec">
      <span class="eb">Resumo</span>
      <h1 class="h1">O que vimos, <span style="color:var(--blue)">em três frases</span></h1>
      <div class="grid tres">
        @for (f of frases; track f.n) {
          <div class="card frase">
            <span class="num mono" [style.color]="f.cor">{{ f.n }}</span>
            <strong>{{ f.titulo }}</strong>
            <span class="muted">{{ f.texto }}</span>
          </div>
        }
      </div>
    </section>

    <section class="sec">
      <span class="eb">Para a nossa realidade</span>
      <h2 class="h2">Por que isso importa para nós</h2>
      <div class="grid quatro">
        @for (g of ganhos; track g.titulo) {
          <div class="card ganho">
            <span class="icone" aria-hidden="true">{{ g.icone }}</span>
            <strong>{{ g.titulo }}</strong>
            <span class="muted">{{ g.texto }}</span>
          </div>
        }
      </div>
    </section>

    <section class="sec sec-last fim">
      <div class="logo">A</div>
      <h2 class="obg">Obrigado!</h2>
      <button class="btn ghost" (click)="ir.emit('inicio')">Voltar ao início</button>
    </section>
  `,
  styles: [`
    :host { display: block; position: relative; overflow: hidden; }
    .tres { margin-top: 36px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    .quatro { margin-top: 32px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .frase, .ganho { padding: 28px; display: flex; flex-direction: column; gap: 12px; font-size: 20px; line-height: 1.5; }
    .frase .num { font-size: 44px; font-weight: 700; }
    .ganho .icone { font-size: 34px; }
    .fim { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 28px; padding-top: 96px; }
    .logo { width: 72px; height: 72px; border-radius: 20px; background: var(--blue); display: flex;
      align-items: center; justify-content: center; font-weight: 700; font-size: 36px; color: #fff;
      box-shadow: 0 10px 40px rgba(59,130,246,.5); }
    .obg { margin: 0; font-size: clamp(56px, 10vw, 128px); line-height: 1; letter-spacing: -.05em; }
  `],
})
export class EncerramentoComponent {
  ir = output<string>();

  readonly frases = [
    { n: '01', cor: '#22d3ee', titulo: 'Peças prontas', texto: 'A tela é montada com peças padronizadas, criadas uma vez e usadas onde precisar.' },
    { n: '02', cor: '#fb923c', titulo: 'Muda uma, mudam todas', texto: 'Trocar uma peça atualiza todas as telas de uma só vez, sem esquecer nenhuma.' },
    { n: '03', cor: '#a78bfa', titulo: 'Sem piscar', texto: 'O sistema troca só o que mudou, sem recarregar a página: parece um aplicativo.' },
  ];

  readonly ganhos = [
    { icone: '🎖️', titulo: 'Padronização', texto: 'Todas as telas com a mesma cara e o mesmo comportamento.' },
    { icone: '🛠️', titulo: 'Manutenção rápida', texto: 'Uma alteração na peça vale para todo o sistema, em minutos.' },
    { icone: '✅', titulo: 'Menos erro', texto: 'Menos copiar e colar, menos tela esquecida com versão antiga.' },
    { icone: '⚡', titulo: 'Uso mais ágil', texto: 'Navegação fluida, sem esperar a página inteira recarregar.' },
  ];
}
