import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemCardComponent } from '../mensagem-card/mensagem-card.component';
import { MENSAGENS } from '../mensagem';

@Component({
  selector: 'app-componente-lego',
  standalone: true,
  imports: [CommonModule, MensagemCardComponent],
  template: `
    <section class="tela">
      <h2>Componente = peça de Lego</h2>
      <p>
        Abaixo há <strong>{{ mensagens.length }} cartões</strong> de mensagem.
        Mas existe <strong>um só molde</strong> — uma única peça
        <code>MensagemCardComponent</code>. Angular usa o mesmo molde várias
        vezes, cada vez com dados diferentes.
      </p>
      <div class="lista">
        <app-mensagem-card *ngFor="let m of mensagens" [mensagem]="m"></app-mensagem-card>
      </div>
      <div class="callout">🔎 1 peça → {{ mensagens.length }} usos. Sem copiar e colar.</div>
    </section>
  `,
  styles: [`.lista { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }`],
})
export class ComponenteLegoComponent {
  readonly mensagens = MENSAGENS;
}
