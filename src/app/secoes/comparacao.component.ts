import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CodePanelComponent } from '../code-panel/code-panel.component';

@Component({
  selector: 'app-comparacao',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CodePanelComponent],
  template: `
    <section class="tela">
      <h2>Com Angular × Sem Angular</h2>
      <p>Você tem as mensagens na tela e chegou <strong>mais uma</strong>. Quanto código pra exibi-la?</p>
      <button mat-raised-button color="accent" class="botao" (click)="toggle()">
        Mostrando: {{ comAngular ? 'COM Angular' : 'SEM Angular' }} — clique para alternar
      </button>
      <app-code-panel
        [titulo]="comAngular ? 'Com Angular — desenha o card 1 vez, depois só chama' : 'Sem Angular — um bloco de marcação por mensagem'"
        [codigo]="comAngular ? codigoCom : codigoSem"
        [linhas]="comAngular ? 10 : 28">
      </app-code-panel>
      <div class="callout">
        🔎 Sem Angular, você copia e cola o bloco do card pra cada mensagem. Com Angular,
        o card é desenhado <strong>uma vez</strong> e a página só o chama — a mesma peça
        se repete sozinha pra cada mensagem da lista.
      </div>
    </section>
  `,
  styles: [`
    .botao { font-size: 1.05rem; margin-bottom: 1rem; }
  `],
})
export class ComparacaoComponent {
  comAngular = false;
  toggle(): void { this.comAngular = !this.comAngular; }

  readonly codigoCom = `<!-- 1) Você desenha o card UMA vez (mensagem-card.component.html): -->
<article class="card">
  <span class="remetente">{{ mensagem.remetente }}</span>
  <p class="assunto">{{ mensagem.assunto }}</p>
  <span class="data-hora">{{ mensagem.dataHora }}</span>
</article>

<!-- 2) Na página principal, só CHAMO o card — sem reescrever o HTML: -->
<app-mensagem-card *ngFor="let m of mensagens" [mensagem]="m"></app-mensagem-card>`;

  readonly codigoSem = `<article class="card">
  <span class="remetente">ComForSup</span>
  <p class="assunto">Ordem de operação ALFA</p>
  <span class="data-hora">I201941Z/MAR/2026</span>
</article>
<article class="card">
  <span class="remetente">Capitania</span>
  <p class="assunto">Aviso aos navegantes</p>
  <span class="data-hora">E200840Z/MAR/2026</span>
</article>
<article class="card">
  <span class="remetente">DAdM</span>
  <p class="assunto">Escala de serviço semanal</p>
  <span class="data-hora">P191705Z/MAR/2026</span>
</article>
<article class="card">
  <span class="remetente">Almoxarifado</span>
  <p class="assunto">Confirmação de recebimento</p>
  <span class="data-hora">R191422Z/MAR/2026</span>
</article>`;
}
