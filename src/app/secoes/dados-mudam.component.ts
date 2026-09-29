import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridMockComponent } from '../grid-mock/grid-mock.component';
import { ESTADO_INICIAL, EstadoGrid } from '../grid-mock/grid-logic';

@Component({
  selector: 'app-dados-mudam',
  standalone: true,
  imports: [CommonModule, GridMockComponent],
  template: `
    <section class="tela">
      <h2>Os dados mudam, a tela acompanha</h2>
      <p>
        Ordene uma coluna, filtre um remetente, troque de página. Repare no quadro ao lado:
        o Angular <strong>guarda a situação da tela em variáveis</strong> (o "cérebro", em TypeScript)
        e o HTML só <strong>mostra</strong> o que está guardado.
      </p>

      <div class="layout">
        <app-grid-mock modo="interativo" (estadoMudou)="estado = $event"></app-grid-mock>

        <aside class="painel">
          <span class="rotulo">O que o TypeScript guarda</span>
          <dl>
            <dt>sortField</dt><dd>{{ estado.sortField ?? 'nenhum' }}</dd>
            <dt>sortDirection</dt><dd>{{ estado.sortDirection }}</dd>
            <dt>filtros</dt><dd>{{ estado.filtros | json }}</dd>
            <dt>pagina</dt><dd>{{ estado.pagina }}</dd>
          </dl>
        </aside>
      </div>

      <div class="callout">🔎 Ninguém redesenha a tela à mão: mudou a variável, mudou a tabela.</div>
    </section>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; margin-top: 1.5rem; }
    @media (max-width: 980px) { .layout { grid-template-columns: 1fr; } }
    .painel {
      background: #0d1b2a; color: #e0e6ed; border-radius: 16px; padding: 1.25rem;
      position: sticky; top: 90px; box-shadow: 0 8px 20px rgba(15, 39, 71, .12);
    }
    .rotulo { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #93b4ff; }
    dl { margin: .75rem 0 0; font-family: 'Roboto Mono', ui-monospace, monospace; font-size: .9rem; }
    dt { color: #f59e0b; margin-top: .6rem; }
    dd { margin: .15rem 0 0; white-space: pre-wrap; word-break: break-word; }
  `],
})
export class DadosMudamComponent {
  estado: EstadoGrid = { ...ESTADO_INICIAL, filtros: {} };
}
