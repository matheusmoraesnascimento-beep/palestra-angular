import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemCardComponent } from '../mensagem-card/mensagem-card.component';
import { Mensagem, MENSAGENS } from '../mensagem';

@Component({
  selector: 'app-dados-vivos',
  standalone: true,
  imports: [CommonModule, MensagemCardComponent],
  template: `
    <section class="tela">
      <h2>Dados vivos: a tela reage sozinha</h2>
      <p>
        Em Angular você mexe no <strong>dado</strong>, não no desenho da tela.
        A tela se atualiza sozinha. Clique nos botões e veja o contador mudar.
      </p>
      <div class="barra">
        <span class="contador">Não lidas: <strong>{{ naoLidas }}</strong></span>
        <button class="botao" (click)="marcarTodasLidas()">Marcar todas como lidas</button>
        <button class="botao" (click)="adicionar()">Chegou mensagem nova</button>
      </div>
      <div class="lista">
        <app-mensagem-card *ngFor="let m of mensagens" [mensagem]="m"></app-mensagem-card>
      </div>
      <div class="callout">🔎 Nenhum HTML foi reescrito ao clicar. Só o dado mudou.</div>
    </section>
  `,
  styles: [`
    .barra { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; }
    .contador { font-size: 1.2rem; }
    .botao { background: var(--gold); color: var(--navy); border: 0; border-radius: 6px;
             padding: .7rem 1.1rem; font-weight: 700; cursor: pointer; }
    .lista { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  `],
})
export class DadosVivosComponent {
  mensagens: Mensagem[] = MENSAGENS.map(m => ({ ...m }));
  private contador = 0;

  get naoLidas(): number {
    return this.mensagens.filter(m => !m.lida).length;
  }

  marcarTodasLidas(): void {
    this.mensagens = this.mensagens.map(m => ({ ...m, lida: true }));
  }

  adicionar(): void {
    this.contador++;
    this.mensagens = [
      { remetente: 'Novo contato', assunto: 'Mensagem ' + this.contador, dataHora: 'I202000Z/MAR/2026', prioridade: 'instantanea', lida: false },
      ...this.mensagens,
    ];
  }
}
