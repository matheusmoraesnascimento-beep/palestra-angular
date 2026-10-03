import { Component, input } from '@angular/core';

/** A "peça" reutilizável: um card de mensagem. Usada em várias telas das demos. */
@Component({
  selector: 'app-peca',
  standalone: true,
  template: `
    <div class="peca">
      <span class="ini" [style.background]="cor()">{{ nome().charAt(0).toUpperCase() || '?' }}</span>
      <span class="txt">
        <span class="n">{{ nome() || 'Sem nome' }}</span>
        <span class="s">{{ sub() }}</span>
      </span>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .peca { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px;
      border: 1px solid var(--line-2); background: var(--surface-2); animation: pop .25s ease; }
    .ini { width: 40px; height: 40px; border-radius: 11px; flex: none; display: flex; align-items: center;
      justify-content: center; font-weight: 700; color: #07101f; }
    .txt { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
    .n { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .s { font-size: 13px; color: var(--muted-2); }
  `],
})
export class PecaCardComponent {
  nome = input.required<string>();
  sub = input('');
  cor = input('#60a5fa');
}
