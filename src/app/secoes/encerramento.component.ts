import { Component } from '@angular/core';

@Component({
  selector: 'app-encerramento',
  standalone: true,
  template: `
    <section class="fecho">
      <span class="eyebrow">Encerramento</span>
      <h1>Obrigado!</h1>

      <p class="assinatura-fecho">
        Feito em Angular por <strong>1T(RM2-T)&nbsp;Moraes</strong>
      </p>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .fecho {
      max-width: 820px;
      margin: 0 auto;
      padding: 90px 28px 110px;
      text-align: center;
    }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: #e8f0ff; color: #2563eb;
      font-weight: 700; font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      padding: 6px 12px; border-radius: 999px;
    }
    h1 {
      font-size: 56px; line-height: 1.08; font-weight: 800; letter-spacing: -.025em;
      margin: 22px 0 0; color: #0b1f3a;
    }
    @media (max-width: 620px) {
      h1 { font-size: 40px; }
    }

    .assinatura-fecho {
      margin: 44px 0 0; font-size: 13px; color: #94a3b8;
    }
    .assinatura-fecho strong { color: #475569; font-weight: 700; }
  `],
})
export class EncerramentoComponent {}
