import { Component } from '@angular/core';

@Component({
  selector: 'app-encerramento',
  standalone: true,
  template: `
    <section class="fecho">
      <span class="eyebrow">Encerramento</span>
      <h1>Obrigado!</h1>
      <p class="agradece">
        Obrigado pela atenção e pelo tempo de vocês. A ideia aqui não foi formar
        programadores em uma palestra — foi mostrar que, por trás das telas que
        usamos todo dia, existe uma lógica simples: <strong>peças que se repetem
        e dados que mandam no que aparece</strong>.
      </p>

      <blockquote class="frase">
        <p>
          Tecnologia da Informação não é bicho de sete cabeças — é uma linguagem.
          E linguagem qualquer um aprende a falar: começa gaguejando, erra,
          repete e um dia se pega conversando.
        </p>
        <footer>Não precisa ser gênio. Precisa começar.</footer>
      </blockquote>

      <div class="cartao-convite">
        <div class="icone">🎓</div>
        <div class="texto">
          <h2>Quer aprender mais sobre programação?</h2>
          <p>
            Procure os <strong>oficiais do 30</strong>. A porta está aberta para
            quem tiver curiosidade — de qualquer graduação, de qualquer setor.
            Programar é uma habilidade <strong>democrática</strong>: não depende
            de dom, depende de interesse e prática.
          </p>
        </div>
      </div>

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
      padding: 54px 28px 72px;
      text-align: center;
    }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: #e8f0ff; color: #2563eb;
      font-weight: 700; font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      padding: 6px 12px; border-radius: 999px;
    }
    h1 {
      font-size: 46px; line-height: 1.08; font-weight: 800; letter-spacing: -.025em;
      margin: 18px 0 0; color: #0b1f3a;
    }
    .agradece {
      font-size: 18px; line-height: 1.7; color: #475569;
      margin: 22px auto 0; max-width: 640px;
    }
    .agradece strong { color: #0f2747; font-weight: 700; }

    .frase {
      margin: 40px 0 0;
      background: linear-gradient(135deg, #eef4ff, #f6f9ff);
      border: 1px solid #d7e3fb;
      border-left: 6px solid #2563eb;
      border-radius: 18px;
      padding: 30px 32px;
      text-align: left;
      box-shadow: 0 14px 34px rgba(15, 39, 71, .06);
    }
    .frase p {
      margin: 0; font-size: 20px; line-height: 1.6; font-weight: 600;
      color: #102a52; font-style: italic;
    }
    .frase footer {
      margin-top: 14px; font-size: 14px; font-weight: 700;
      letter-spacing: .04em; color: #2563eb; font-style: normal;
    }

    .cartao-convite {
      display: flex; align-items: flex-start; gap: 20px; text-align: left;
      margin-top: 28px; padding: 26px;
      background: #fff; border: 1px solid #e6ecf5; border-radius: 20px;
      box-shadow: 0 14px 34px rgba(15, 39, 71, .07);
    }
    .cartao-convite .icone {
      flex: none; width: 52px; height: 52px; border-radius: 15px;
      background: #2563eb; color: #fff;
      display: flex; align-items: center; justify-content: center; font-size: 24px;
      box-shadow: 0 8px 18px rgba(37, 99, 235, .34);
    }
    .cartao-convite h2 { font-size: 19px; font-weight: 700; margin: 2px 0 8px; color: #0f2747; }
    .cartao-convite p { margin: 0; font-size: 15.5px; line-height: 1.65; color: #64748b; }
    .cartao-convite p strong { color: #0f2747; font-weight: 700; }
    @media (max-width: 620px) {
      .cartao-convite { flex-direction: column; gap: 14px; }
      h1 { font-size: 36px; }
      .frase p { font-size: 17px; }
    }

    .assinatura-fecho {
      margin: 40px 0 0; font-size: 13px; color: #94a3b8;
    }
    .assinatura-fecho strong { color: #475569; font-weight: 700; }
  `],
})
export class EncerramentoComponent {}
