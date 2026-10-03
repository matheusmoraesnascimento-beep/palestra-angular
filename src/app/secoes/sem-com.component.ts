import { Component, computed, signal } from '@angular/core';

/** Demo: trocar a cor do botão em N telas. Sem Angular = arquivo por arquivo. Com Angular = uma peça. */
@Component({
  selector: 'app-sem-com',
  standalone: true,
  template: `
    <section class="sec">
      <span class="eb">Momento 3</span>
      <h1 class="h1">Mesma tarefa.<br><span style="color:var(--amber)">Dois caminhos.</span></h1>
      <p class="lead">
        Seu chefe pediu: <strong>"troque a cor do botão do sistema"</strong>. O sistema tem várias telas.
        Escolha quantas e tente nos dois mundos.
      </p>

      <div class="ctrl">
        <span class="muted">Telas do sistema:</span>
        @for (v of opcoes; track v) {
          <button class="chip" [class.on]="n() === v" (click)="definir(v)">{{ v }}</button>
        }
        <button class="btn ghost" (click)="reiniciar()">Recomeçar</button>
      </div>
    </section>

    <section class="sec sec-last">
      <div class="duo">
        <!-- SEM ANGULAR -->
        <article class="card lado sem">
          <header>
            <span class="tag" style="background:#3a1a1a;color:#fca5a5">Sem Angular</span>
            <h2>Copiar e colar em cada tela</h2>
            <p class="muted">Cada arquivo tem seu próprio botão. Edite um por um.</p>
          </header>

          <ul class="arquivos">
            @for (f of arquivosSem(); track f.nome) {
              <li [class.feito]="f.feito">
                <span class="mono">{{ f.nome }}</span>
                <span class="mini" [style.background]="f.feito ? nova : velha">botão</span>
                <span class="st mono">{{ f.feito ? 'editado' : 'pendente' }}</span>
              </li>
            }
          </ul>

          <div class="rodape">
            <button class="btn" [disabled]="feitosSem() >= n()" (click)="editarProximo()">Editar próximo arquivo</button>
            <span class="placar mono" [style.color]="feitosSem() >= n() ? 'var(--green)' : 'var(--red)'">
              {{ feitosSem() }} de {{ n() }} editados
            </span>
          </div>
          @if (feitosSem() > 0 && feitosSem() < n()) {
            <p class="alerta">⚠ Sistema inconsistente: tem tela com cor velha e tela com cor nova.</p>
          }
        </article>

        <!-- COM ANGULAR -->
        <article class="card lado com">
          <header>
            <span class="tag" style="background:#0f2a4d;color:#7dd3fc">Com Angular</span>
            <h2>Uma peça, usada em todo lugar</h2>
            <p class="muted">As telas usam o mesmo botão. Muda a peça, mudam todas.</p>
          </header>

          <div class="peca-arq">
            <span class="mono">botao.component.scss</span>
            <pre class="code">.botao &#123;
  background: {{ comFeito() ? nova : velha }};
&#125;</pre>
          </div>
          <ul class="arquivos">
            @for (f of arquivosCom(); track f.nome) {
              <li class="feito">
                <span class="mono">{{ f.nome }}</span>
                <span class="mini" [style.background]="comFeito() ? nova : velha">botão</span>
                <span class="st mono">usa &lt;app-botao&gt;</span>
              </li>
            }
          </ul>

          <div class="rodape">
            <button class="btn amber" [disabled]="comFeito()" (click)="comFeito.set(true)">Editar a peça (1 arquivo)</button>
            <span class="placar mono" style="color:var(--green)">{{ comFeito() ? '1 arquivo editado · todas as telas' : '0 editados' }}</span>
          </div>
          @if (comFeito()) {
            <p class="ok">✓ Pronto. Todas as {{ n() }} telas já mudaram, e ficaram iguais.</p>
          }
        </article>
      </div>

      <div class="dica">
        <span>💡</span>
        <span>Com 3 telas é chato. Com 50 telas, é um dia de trabalho e vários esquecimentos. Com Angular continua sendo <strong>uma edição</strong>.</span>
      </div>
    </section>
  `,
  styles: [`
    .ctrl { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 32px; }
    .duo { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 24px; }
    .lado { padding: 28px; display: flex; flex-direction: column; gap: 18px; }
    .sem { border-color: #4a2330; }
    .com { border-color: #1e4e8c; }
    h2 { margin: 12px 0 6px; font-size: 26px; letter-spacing: -.02em; }
    header p { margin: 0; }
    .arquivos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .arquivos li { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px;
      border: 1px solid var(--line); background: var(--surface-2); animation: pop .25s ease; }
    .arquivos li.feito { border-color: #1f5a46; }
    .arquivos .mono:first-child { flex: 1; font-size: 14px; }
    .mini { padding: 6px 14px; border-radius: 8px; color: #fff; font-size: 13px; font-weight: 600; transition: background .4s; }
    .st { font-size: 12px; color: var(--muted-2); min-width: 118px; text-align: right; }
    .rodape { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
    .placar { font-size: 14px; }
    .alerta { margin: 0; color: var(--amber); font-size: 15px; }
    .ok { margin: 0; color: var(--green); font-size: 16px; font-weight: 600; animation: pop .3s ease; }
    .peca-arq { border: 1px dashed var(--line-2); border-radius: 12px; padding: 10px 14px 0; }
    .peca-arq .mono { font-size: 13px; color: #60a5fa; }
    .peca-arq .code { padding: 8px 0 14px; }
  `],
})
export class SemComComponent {
  readonly opcoes = [3, 5, 8];
  readonly velha = '#64748b';
  readonly nova = '#f59e0b';

  n = signal(5);
  feitosSem = signal(0);
  comFeito = signal(false);

  arquivosSem = computed(() =>
    Array.from({ length: this.n() }, (_, i) => ({ nome: `tela-${i + 1}.html`, feito: i < this.feitosSem() })));
  arquivosCom = computed(() =>
    Array.from({ length: this.n() }, (_, i) => ({ nome: `tela-${i + 1}.html` })));

  definir(v: number) { this.n.set(v); this.reiniciar(); }
  editarProximo() { this.feitosSem.update(v => Math.min(v + 1, this.n())); }
  reiniciar() { this.feitosSem.set(0); this.comFeito.set(false); }
}
