import { Component, computed, signal } from '@angular/core';
import { PecaCardComponent } from '../peca-card/peca-card.component';

interface Item { id: number; nome: string; cor: string; }

/** Playground: monte cards e veja a MESMA lista aparecer em várias telas. */
@Component({
  selector: 'app-componente-lego',
  standalone: true,
  imports: [PecaCardComponent],
  template: `
    <div class="glow" style="top:-180px;left:-160px;width:700px;height:700px;background:var(--cyan)"></div>

    <section class="sec">
      <span class="eb">Momento 2</span>
      <h1 class="h1">Componente = <span style="color:var(--cyan)">peça de Lego</span></h1>
      <p class="lead">
        A peça é criada <strong>uma vez</strong> e encaixada onde for preciso. Abaixo, uma peça é montada ao vivo:
        as três telas usam a <strong>mesma peça</strong> e mudam juntas.
      </p>
    </section>

    <section class="sec">
      <div class="card ferramenta">
        <label class="campo">
          <span class="mono rot">nome</span>
          <input class="input" [value]="nome()" (input)="nome.set($any($event.target).value)" placeholder="Ex.: Capitania" maxlength="22">
        </label>
        <div class="campo">
          <span class="mono rot">cor</span>
          <div class="cores">
            @for (c of paleta; track c) {
              <button class="cor" [class.on]="cor() === c" [style.background]="c" [attr.aria-label]="'Cor ' + c" (click)="cor.set(c)"></button>
            }
          </div>
        </div>
        <button class="btn" (click)="adicionar()" [disabled]="!nome().trim()">+ Criar peça</button>
        <button class="btn ghost" (click)="limpar()">Limpar</button>
      </div>

      <div class="grid telas">
        @for (t of telas; track t) {
          <div class="card tela">
            <div class="mono tt">Tela · {{ t }}</div>
            <div class="lista">
              @for (i of itens(); track i.id) {
                <app-peca [nome]="i.nome" [cor]="i.cor" [sub]="'peça #' + i.id">
                  <button class="x" (click)="remover(i.id)" [attr.aria-label]="'Remover ' + i.nome">×</button>
                </app-peca>
              } @empty {
                <p class="vazio">Nenhuma peça ainda.</p>
              }
            </div>
          </div>
        }
      </div>

      <div class="dica">
        <span>💡</span>
        <span>A peça foi escrita <strong>uma só vez</strong> e aparece {{ total() * 3 }} vezes nas telas. Mudando o desenho da peça, as três telas acompanham.</span>
      </div>
    </section>

    <section class="sec sec-last">
      <div class="card codigo">
        <div class="arq mono">como se usa a peça</div>
        <pre class="code">&lt;app-peca nome="{{ nome() || '...' }}" cor="{{ cor() }}" /&gt;</pre>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; position: relative; overflow: hidden; }
    .ferramenta { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 20px; padding: 24px; margin-bottom: 24px; }
    .campo { display: flex; flex-direction: column; gap: 8px; flex: 1 1 240px; }
    .rot { font-size: 12px; color: var(--muted-2); text-transform: uppercase; letter-spacing: .1em; }
    .cores { display: flex; gap: 10px; min-height: 52px; align-items: center; }
    .cor { width: 40px; height: 40px; border-radius: 12px; border: 2px solid transparent; }
    .cor.on { border-color: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,.2); }
    .telas { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }
    .tela { padding: 20px; min-height: 260px; }
    .tt { font-size: 12px; color: var(--muted-2); margin-bottom: 14px; }
    .lista { display: flex; flex-direction: column; gap: 10px; }
    .vazio { color: var(--muted-2); font-size: 15px; margin: 8px 0; }
    .x { width: 44px; height: 44px; border-radius: 10px; border: 0; background: transparent; color: var(--muted-2); font-size: 22px; }
    .x:hover { background: var(--surface-3); color: #fff; }
    .codigo .arq { padding: 14px 22px; border-bottom: 1px solid var(--line); font-size: 13px; color: #60a5fa; }
  `],
})
export class ComponenteLegoComponent {
  readonly paleta = ['#60a5fa', '#22d3ee', '#fbbf24', '#f87171', '#a78bfa', '#34d399'];
  readonly telas = ['Caixa de entrada', 'Painel inicial', 'Resultado da busca'];

  nome = signal('');
  cor = signal('#60a5fa');
  itens = signal<Item[]>([
    { id: 1, nome: 'Capitania', cor: '#fbbf24' },
    { id: 2, nome: 'ComForSup', cor: '#60a5fa' },
  ]);
  total = computed(() => this.itens().length);
  private seq = 3;

  adicionar() {
    const nome = this.nome().trim();
    if (!nome) return;
    this.itens.update(l => [...l, { id: this.seq++, nome, cor: this.cor() }]);
    this.nome.set('');
  }
  remover(id: number) { this.itens.update(l => l.filter(i => i.id !== id)); }
  limpar() { this.itens.set([]); }
}
