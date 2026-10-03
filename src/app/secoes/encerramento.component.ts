import { Component } from '@angular/core';

@Component({
  selector: 'app-encerramento',
  standalone: true,
  template: `
    <div class="glow" style="top:50%;left:50%;width:900px;height:900px;margin:-450px 0 0 -450px;background:var(--blue)"></div>
    <section class="fim">
      <div class="logo">A</div>
      <h1 class="obg">Obrigado!</h1>
    </section>
  `,
  styles: [`
    :host { display: block; position: relative; overflow: hidden; }
    .fim { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;
      padding: 96px 32px; gap: 32px; min-height: calc(100vh - 80px); justify-content: center; }
    .logo { width: 72px; height: 72px; border-radius: 20px; background: var(--blue); display: flex;
      align-items: center; justify-content: center; font-weight: 700; font-size: 36px; color: #fff;
      box-shadow: 0 10px 40px rgba(59,130,246,.5); }
    .obg { margin: 0; font-size: clamp(64px, 12vw, 160px); line-height: 1; letter-spacing: -.05em; }
  `],
})
export class EncerramentoComponent {}
