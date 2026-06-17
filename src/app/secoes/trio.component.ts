import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="tela">
      <h2>Toda peça tem 3 arquivos</h2>
      <p>
        Cada componente junta três responsabilidades:
        <strong>HTML</strong> (a estrutura), <strong>SCSS</strong> (o visual) e
        <strong>TypeScript</strong> (o cérebro/os dados). Edite os quadros e veja
        o cartão à direita mudar na hora.
      </p>

      <div class="grade">
        <div class="editores">
          <div class="editor">
            <div class="editor-topo html">HTML — estrutura <span>editável</span></div>
            <textarea spellcheck="false" [(ngModel)]="html"></textarea>
          </div>
          <div class="editor">
            <div class="editor-topo scss">SCSS — visual <span>editável</span></div>
            <textarea spellcheck="false" [(ngModel)]="scss"></textarea>
          </div>
          <div class="editor">
            <div class="editor-topo ts">TypeScript — dados <span>editável</span></div>
            <textarea spellcheck="false" [(ngModel)]="ts"></textarea>
          </div>
        </div>

        <div class="resultado">
          <p class="rotulo">Resultado ao vivo</p>
          <div class="preview-scope" [innerHTML]="preview"></div>
        </div>
      </div>

      <div class="callout">
        🔎 Os três quadros são os arquivos reais do cartão. Mude um texto no HTML,
        uma cor no SCSS ou um dado no TypeScript — o resultado reage na hora.
      </div>
    </section>
  `,
  styles: [`
    .grade { display: grid; grid-template-columns: 1.3fr 1fr; gap: 1.5rem; align-items: start; }
    @media (max-width: 860px) { .grade { grid-template-columns: 1fr; } }

    .editores { display: grid; gap: 1rem; }
    .editor { border-radius: 12px; overflow: hidden; border: 1px solid #0d1b2a; box-shadow: 0 8px 20px rgba(15,39,71,.08); }
    .editor-topo {
      display: flex; justify-content: space-between; align-items: center;
      padding: .55rem 1rem; font-weight: 700; font-size: .9rem; color: #fff;
    }
    .editor-topo span { font-weight: 500; font-size: .72rem; opacity: .85; background: rgba(255,255,255,.18); padding: 2px 9px; border-radius: 999px; }
    .editor-topo.html { background: #3b82f6; }
    .editor-topo.scss { background: #14b8a6; }
    .editor-topo.ts   { background: #f59e0b; }
    textarea {
      display: block; width: 100%; border: 0; resize: vertical; min-height: 120px;
      background: #0d1b2a; color: #e0e6ed; padding: 1rem;
      font-family: 'Roboto Mono', ui-monospace, monospace; font-size: .92rem; line-height: 1.5;
    }
    textarea:focus { outline: 2px solid #2563eb; outline-offset: -2px; }

    .resultado { position: sticky; top: 90px; }
    .rotulo {
      font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
      color: #94a3b8; margin: 0 0 .6rem;
    }
    .preview-scope {
      background: #fbfcff; border: 1px solid #e6ecf5; border-radius: 14px; padding: 1.25rem;
      box-shadow: 0 10px 28px rgba(15,39,71,.06); min-height: 90px;
    }
  `],
})
export class TrioComponent {
  html = `<article class="card">
  <span class="remetente">{{ mensagem.remetente }}</span>
  <p class="assunto">{{ mensagem.assunto }}</p>
  <span class="data-hora">{{ mensagem.dataHora }}</span>
</article>`;

  scss = `.card {
  background: #fff;
  border-left: 6px solid #2563eb;
  border-radius: 12px;
  padding: 16px;
}
.remetente { font-weight: 700; color: #0f2747; }
.assunto { font-size: 18px; margin: 6px 0; }
.data-hora { color: #64748b; font-family: monospace; }`;

  ts = `mensagem = {
  remetente: 'ComForSup',
  assunto: 'Ordem de operação ALFA',
  dataHora: 'I201941Z/MAR/2026',
  prioridade: 'imediata',
  lida: false,
};`;

  constructor(private readonly sanitizer: DomSanitizer) {}

  get preview(): SafeHtml {
    const dados = this.lerDados(this.ts);
    const corpo = this.html.replace(
      /\{\{\s*mensagem\.(\w+)\s*\}\}/g,
      (_, chave: string) => dados[chave] ?? '',
    );
    const estilo = this.escoparCss(this.scss);
    return this.sanitizer.bypassSecurityTrustHtml(`<style>${estilo}</style>${corpo}`);
  }

  private lerDados(ts: string): Record<string, string> {
    const dados: Record<string, string> = {};
    const re = /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(true|false|\d+))/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(ts)) !== null) {
      if (m[1] === 'mensagem') continue;
      dados[m[1]] = m[2] ?? m[3] ?? m[4] ?? '';
    }
    return dados;
  }

  private escoparCss(css: string): string {
    return css.replace(/([^{}]+)\{([^}]*)\}/g, (_, seletores: string, corpo: string) => {
      const escopados = seletores
        .split(',')
        .map(s => `.preview-scope ${s.trim()}`)
        .join(', ');
      return `${escopados} {${corpo}}`;
    });
  }
}
