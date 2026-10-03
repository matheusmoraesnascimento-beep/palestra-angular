import { Component, output } from '@angular/core';

@Component({
  selector: 'app-encerramento',
  standalone: true,
  template: `
    <div class="glow" style="top:50%;left:50%;width:900px;height:900px;margin:-450px 0 0 -450px;background:var(--blue)"></div>
    <section class="fim">
      <div class="logo">A</div>
      <span class="eb">Encerramento</span>
      <h1 class="obg">Obrigado!</h1>
      <ul class="resumo">
        <li><span class="n mono" style="color:var(--amber)">1</span> Angular monta telas com <strong>peças que se repetem</strong>.</li>
        <li><span class="n mono" style="color:var(--cyan)">2</span> Mudou a peça, <strong>todas as telas mudam</strong>.</li>
        <li><span class="n mono" style="color:var(--violet)">3</span> Mudou o dado, <strong>a tela se atualiza sozinha</strong>.</li>
      </ul>
      <div class="acoes">
        <button class="btn" (click)="ir.emit('inicio')">Voltar ao início</button>
        <button class="btn ghost" (click)="ir.emit('semcom')">Rever a diferença</button>
      </div>
      <p class="autor mono">Feito por <strong>1T(RM2-T) Moraes</strong></p>
    </section>
  `,
  styles: [`
    :host { display: block; position: relative; overflow: hidden; }
    .fim { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;
      padding: 96px 32px; gap: 18px; min-height: calc(100vh - 80px); justify-content: center; }
    .logo { width: 72px; height: 72px; border-radius: 20px; background: var(--blue); display: flex;
      align-items: center; justify-content: center; font-weight: 700; font-size: 36px; color: #fff;
      box-shadow: 0 10px 40px rgba(59,130,246,.5); }
    .obg { margin: 0; font-size: clamp(64px, 12vw, 144px); line-height: 1; letter-spacing: -.05em; }
    .resumo { list-style: none; padding: 0; margin: 12px 0 0; display: flex; flex-direction: column; gap: 14px; text-align: left; max-width: 640px; }
    .resumo li { font-size: 22px; line-height: 1.5; color: var(--muted); display: flex; gap: 16px; align-items: baseline; }
    .resumo strong { color: var(--ink); }
    .n { font-size: 28px; font-weight: 700; }
    .acoes { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 20px; }
    .autor { margin-top: 28px; font-size: 14px; color: var(--muted-2); }
    .autor strong { color: var(--ink); }
  `],
})
export class EncerramentoComponent {
  ir = output<string>();
}
