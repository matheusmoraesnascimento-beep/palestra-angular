import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MensagemCardComponent } from '../mensagem-card/mensagem-card.component';
import { MENSAGENS, Mensagem } from '../mensagem';

interface TelaMock {
  nome: string;
  mensagens: Mensagem[];
}

@Component({
  selector: 'app-componente-lego',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MensagemCardComponent],
  template: `
    <section class="tela">
      <h2>Componente = peça de Lego</h2>
      <p>
        Estas são <strong>3 telas do sistema</strong>. Todas mostram mensagens em cartões, mas existe
        <strong>um só molde</strong>: a peça <code>MensagemCardComponent</code>. Aperte o botão e veja
        as três telas mudarem juntas.
      </p>

      <button mat-raised-button color="accent" class="botao" (click)="alternar()">
        {{ destacado ? 'Voltar à borda original' : 'Mudar a peça: borda azul' }}
      </button>

      <div class="telas" [style.--card-borda]="destacado ? '#2563eb' : null">
        <div class="mini" *ngFor="let t of telas">
          <h3>{{ t.nome }}</h3>
          <app-mensagem-card *ngFor="let m of t.mensagens" [mensagem]="m"></app-mensagem-card>
        </div>
      </div>

      <div class="callout">🔎 1 peça → {{ total }} usos em {{ telas.length }} telas. Mudou num lugar, mudou em todas.</div>
    </section>
  `,
  styles: [`
    .botao { margin: .5rem 0 1.5rem; }
    .telas { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .mini { display: grid; gap: .75rem; align-content: start; background: #f8faff; border: 1px dashed var(--blue-border); border-radius: 16px; padding: 1rem; }
    .mini h3 { margin: 0; font-size: .85rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted-2); }
  `],
})
export class ComponenteLegoComponent {
  readonly telas: TelaMock[] = [
    { nome: 'Recebidas', mensagens: MENSAGENS.slice(0, 2) },
    { nome: 'Rascunho', mensagens: MENSAGENS.slice(2, 4) },
    { nome: 'Enviadas', mensagens: MENSAGENS.slice(4, 6) },
  ];
  readonly total = this.telas.reduce((soma, t) => soma + t.mensagens.length, 0);
  destacado = false;

  alternar(): void {
    this.destacado = !this.destacado;
  }
}
