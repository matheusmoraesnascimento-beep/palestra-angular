import { Component } from '@angular/core';
import { GridMockComponent } from '../grid-mock/grid-mock.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [GridMockComponent],
  template: `
    <section class="hero">
      <div class="hero-texto">
        <span class="eyebrow">Conceito · 01</span>
        <h1>O que é Angular?</h1>
        <p>
          Angular é uma ferramenta para construir telas de sistema montando
          <strong>peças prontas e padronizadas</strong> — em vez de escrever
          cada tela do zero, repetindo tudo à mão.
        </p>
        <p>
          Pense num navio: ele não é esculpido de um único bloco de aço. É
          <strong>montado</strong> com peças padronizadas que se repetem e se
          encaixam. Angular faz o mesmo com as telas do sistema.
        </p>
        <div class="callout">
          <span class="callout-icon">🔎</span>
          <span>
            <strong>Este próprio site é feito assim.</strong> As abas lá em cima e a tabela ao lado
            são peças Angular.
          </span>
        </div>
      </div>

      <div class="hero-arte">
        <span class="arte-rotulo">Uma tela que você usa todo dia</span>
        <app-grid-mock modo="estatico"></app-grid-mock>
        <p class="arte-legenda">A lista de mensagens recebidas: montada com peças que se repetem e se encaixam.</p>
      </div>
    </section>

    <section class="passos">
      <div class="passos-titulo">
        <h2>Como o Angular monta uma tela</h2>
        <div class="risco"></div>
      </div>
      <div class="passos-grid">
        <div class="passo">
          <div class="num azul">1</div>
          <h3>Cria a peça uma vez</h3>
          <p>Você descreve um botão, um card ou uma tabela uma única vez.</p>
        </div>
        <div class="passo">
          <div class="num teal">2</div>
          <h3>Encaixa onde quiser</h3>
          <p>A mesma peça é reutilizada em várias telas, sem copiar e colar.</p>
        </div>
        <div class="passo">
          <div class="num ambar">3</div>
          <h3>Muda num lugar só</h3>
          <p>Ajustou a peça? Toda tela que a usa muda junto, na hora.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .hero {
      max-width: 1120px;
      margin: 0 auto;
      padding: 54px 28px 20px;
      display: flex;
      gap: 56px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .hero-texto { flex: 1 1 460px; min-width: 320px; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: #e8f0ff; color: #2563eb;
      font-weight: 700; font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      padding: 6px 12px; border-radius: 999px;
    }
    .hero-texto h1 {
      font-size: 46px; line-height: 1.08; font-weight: 800; letter-spacing: -.025em;
      margin: 18px 0 0; color: #0b1f3a;
    }
    .hero-texto p { font-size: 18px; line-height: 1.7; color: #475569; margin: 22px 0 0; max-width: 560px; }
    .hero-texto p strong { color: #0f2747; font-weight: 700; }
    .callout {
      display: flex; align-items: flex-start; gap: 14px; margin-top: 28px;
      background: #eef4ff; border: 1px solid #d7e3fb; border-radius: 16px;
      padding: 18px 20px; max-width: 560px; color: #214066;
      font-size: 15px; line-height: 1.6;
    }
    .callout-icon {
      flex: none; width: 38px; height: 38px; border-radius: 11px;
      background: #2563eb; display: flex; align-items: center; justify-content: center;
      font-size: 18px; box-shadow: 0 6px 14px rgba(37, 99, 235, .32);
    }
    .callout strong { font-weight: 700; color: #102a52; }

    .hero-arte { flex: 1 1 400px; min-width: 320px; }
    .arte-rotulo { display: block; margin-bottom: 12px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; }
    .arte-legenda { margin: 16px 0 0; font-size: 13px; font-style: italic; color: #94a3b8; text-align: center; }

    .passos { max-width: 1120px; margin: 0 auto; padding: 30px 28px 64px; }
    .passos-titulo { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .passos-titulo h2 { font-size: 15px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #64748b; margin: 0; }
    .risco { flex: 1; height: 1px; background: #e6ecf5; }
    .passos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media (max-width: 760px) { .passos-grid { grid-template-columns: 1fr; } }
    .passo { background: #fff; border: 1px solid #e6ecf5; border-radius: 18px; padding: 24px; box-shadow: 0 10px 28px rgba(15, 39, 71, .05); }
    .num { width: 36px; height: 36px; border-radius: 11px; color: #fff; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center; }
    .num.azul  { background: #3b82f6; box-shadow: 0 6px 14px rgba(59, 130, 246, .35); }
    .num.teal  { background: #14b8a6; box-shadow: 0 6px 14px rgba(20, 184, 166, .35); }
    .num.ambar { background: #f59e0b; box-shadow: 0 6px 14px rgba(245, 158, 11, .35); }
    .passo h3 { font-size: 17px; font-weight: 700; margin: 16px 0 6px; color: #0f2747; }
    .passo p { font-size: 14.5px; line-height: 1.6; color: #64748b; margin: 0; }
  `],
})
export class IntroComponent {}
