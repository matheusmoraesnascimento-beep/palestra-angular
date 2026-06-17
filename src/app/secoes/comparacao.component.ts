import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePanelComponent } from '../code-panel/code-panel.component';

@Component({
  selector: 'app-comparacao',
  standalone: true,
  imports: [CommonModule, CodePanelComponent],
  template: `
    <section class="tela">
      <h2>Com Angular × Sem Angular</h2>
      <p>Mesma tela com 4 mensagens. Veja a diferença de trabalho.</p>
      <button class="botao" (click)="toggle()">
        Mostrando: {{ comAngular ? 'COM Angular' : 'SEM Angular' }} — clique para alternar
      </button>
      <app-code-panel
        [titulo]="comAngular ? 'Com Angular — reusa a peça' : 'Sem Angular — repete tudo à mão'"
        [codigo]="comAngular ? codigoCom : codigoSem"
        [linhas]="comAngular ? 1 : 28">
      </app-code-panel>
      <div class="callout">
        🔎 Acrescentar a 5ª mensagem: sem Angular = copiar mais um bloco inteiro;
        com Angular = só mais um item na lista de dados.
      </div>
    </section>
  `,
  styles: [`
    .botao { background: var(--gold); color: var(--navy); border: 0; border-radius: 6px;
             padding: .8rem 1.2rem; font-size: 1.1rem; font-weight: 700; cursor: pointer; margin-bottom: 1rem; }
  `],
})
export class ComparacaoComponent {
  comAngular = false;
  toggle(): void { this.comAngular = !this.comAngular; }

  readonly codigoCom = `<app-mensagem-card *ngFor="let m of mensagens" [mensagem]="m"></app-mensagem-card>`;

  readonly codigoSem = `<article class="card">
  <span class="remetente">ComForSup</span>
  <p class="assunto">Ordem de operação ALFA</p>
  <span class="data">17/06 09:12</span>
</article>
<article class="card">
  <span class="remetente">Capitania</span>
  <p class="assunto">Aviso aos navegantes</p>
  <span class="data">17/06 08:40</span>
</article>
<article class="card">
  <span class="remetente">DAdM</span>
  <p class="assunto">Escala de serviço semanal</p>
  <span class="data">16/06 17:05</span>
</article>
<article class="card">
  <span class="remetente">Almoxarifado</span>
  <p class="assunto">Confirmação de recebimento</p>
  <span class="data">16/06 14:22</span>
</article>`;
}
