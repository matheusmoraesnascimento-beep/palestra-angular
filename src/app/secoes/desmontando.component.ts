import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridMockComponent } from '../grid-mock/grid-mock.component';
import { PECAS, Peca, PecaId } from '../grid-mock/pecas';

@Component({
  selector: 'app-desmontando',
  standalone: true,
  imports: [CommonModule, GridMockComponent],
  template: `
    <section class="tela">
      <h2>Desmontando uma tela</h2>
      <p>
        Esta é a lista de mensagens recebidas, do jeito que você conhece. Para o Angular ela é um
        <strong>conjunto de peças</strong>. <strong>Clique numa parte da tela</strong> para ver que peça é.
      </p>

      <div class="layout">
        <app-grid-mock modo="mapa" [pecaAtiva]="ativa?.id ?? null" (pecaSelecionada)="selecionar($event)"></app-grid-mock>

        <aside class="painel" aria-live="polite">
          <ng-container *ngIf="ativa; else vazio">
            <span class="rotulo">Peça selecionada</span>
            <h3>{{ ativa.nome }}</h3>
            <p>{{ ativa.papel }}</p>
          </ng-container>
          <ng-template #vazio>
            <span class="rotulo">Peça selecionada</span>
            <p class="dica">Nenhuma ainda. Clique na tabela, no cabeçalho, numa data ou no rodapé.</p>
          </ng-template>
        </aside>
      </div>

      <div class="chips">
        <button type="button" *ngFor="let p of pecas" [class.on]="ativa?.id === p.id" (click)="selecionar(p.id)">{{ p.nome }}</button>
      </div>

      <div class="callout">🔎 Cinco peças, uma tela. Cada peça é feita uma vez e usada em várias telas do sistema.</div>
    </section>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; margin-top: 1.5rem; }
    @media (max-width: 980px) { .layout { grid-template-columns: 1fr; } }
    .painel {
      background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem;
      box-shadow: var(--card-shadow); position: sticky; top: 90px; min-height: 140px;
    }
    .rotulo { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; }
    .painel h3 { margin: .5rem 0 0; font-size: 1.25rem; color: var(--ink-strong); }
    .painel p { font-size: 1rem; margin: .5rem 0 0; }
    .dica { font-style: italic; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.25rem; }
    .chips button {
      border: 1px solid var(--blue-border); background: var(--blue-soft); color: #1e40af;
      border-radius: 999px; padding: 6px 14px; font: inherit; font-size: .9rem; font-weight: 600; cursor: pointer;
    }
    .chips button.on { background: var(--blue); color: #fff; border-color: var(--blue); }
  `],
})
export class DesmontandoComponent {
  readonly pecas = PECAS;
  ativa: Peca | null = null;

  selecionar(id: PecaId): void {
    this.ativa = PECAS.find(p => p.id === id) ?? null;
  }
}
