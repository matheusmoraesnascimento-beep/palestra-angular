import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePanelComponent } from '../code-panel/code-panel.component';
import { MensagemCardComponent } from '../mensagem-card/mensagem-card.component';
import { MENSAGENS } from '../mensagem';

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [CommonModule, CodePanelComponent, MensagemCardComponent],
  template: `
    <section class="tela">
      <h2>Toda peça tem 3 arquivos</h2>
      <p>
        Cada componente junta três responsabilidades:
        <strong>HTML</strong> (a estrutura), <strong>SCSS</strong> (o visual) e
        <strong>TypeScript</strong> (o cérebro). Juntos viram o cartão à direita.
      </p>
      <div class="grade">
        <div class="codigos">
          <app-code-panel titulo="HTML — estrutura" [codigo]="html"></app-code-panel>
          <app-code-panel titulo="SCSS — visual" [codigo]="scss"></app-code-panel>
          <app-code-panel titulo="TypeScript — cérebro" [codigo]="ts"></app-code-panel>
        </div>
        <div class="resultado">
          <p class="rotulo">Resultado:</p>
          <app-mensagem-card [mensagem]="exemplo"></app-mensagem-card>
        </div>
      </div>
      <div class="callout">🔎 Os três blocos acima são os arquivos reais deste cartão.</div>
    </section>
  `,
  styles: [`
    .grade { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.5rem; align-items: start; }
    .codigos { display: grid; gap: 1rem; }
    .rotulo { font-weight: 700; }
    @media (max-width: 800px) { .grade { grid-template-columns: 1fr; } }
  `],
})
export class TrioComponent {
  readonly exemplo = MENSAGENS[0];
  readonly html = `<article class="card">
  <span class="remetente">{{ mensagem.remetente }}</span>
  <p class="assunto">{{ mensagem.assunto }}</p>
  <span class="data-hora">{{ mensagem.dataHora }}</span>
</article>`;
  readonly scss = `.card {
  background: white;
  border-left: 6px solid var(--navy);
  border-radius: 8px;
  padding: 1rem;
}
.remetente { font-weight: 700; }`;
  readonly ts = `mensagem = {
  remetente: 'ComForSup',
  assunto: 'Ordem de operação ALFA',
  dataHora: 'R201941Z/MAR/2026',
  prioridade: 'urgentissimo',
  lida: false,
};`;
}
