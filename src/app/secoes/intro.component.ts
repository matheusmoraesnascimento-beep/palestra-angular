import { Component, output, signal } from '@angular/core';
import { MENSAGENS, rotuloPrioridade } from '../mensagem';

@Component({
  selector: 'app-intro',
  standalone: true,
  template: `
    <div class="glow" style="top:-200px;right:-120px;width:760px;height:760px;background:var(--blue)"></div>

    <section class="sec hero">
      <div class="texto">
        <span class="eb pill"><span class="dot"></span> Guia interativo</span>
        <h1 class="h1">O que é<br><span class="azul">Angular?</span></h1>
        <p class="lead">
          Uma ferramenta para construir telas de sistema montando
          <strong>peças prontas e padronizadas</strong>, em vez de escrever cada tela do zero.
        </p>
        <p class="lead" style="margin-top:14px">
          Como um navio: não nasce de um bloco único de aço. É <strong>montado</strong>, peça por peça.
        </p>
      </div>

      <div class="card janela" aria-label="Exemplo: lista de mensagens">
        <div class="barra">
          <span class="b" style="background:#f87171"></span><span class="b" style="background:#fbbf24"></span><span class="b" style="background:#34d399"></span>
          <span class="mono tit">&lt;app-mensagens&gt;</span>
        </div>
        <div class="corpo">
          <div class="cab"><strong>Mensagens recebidas</strong><span class="tag">{{ lista.length }} itens</span></div>
          @for (m of lista; track m.assunto; let i = $index) {
            <button class="linha" [class.on]="sel() === i" (click)="sel.set(i)">
              <span class="ini" [style.background]="cores[m.prioridade]">{{ m.remetente.charAt(0) }}</span>
              <span class="t"><span class="a">{{ m.assunto }}</span><span class="r">{{ m.remetente }} · {{ rotulo(m.prioridade) }}</span></span>
              @if (!m.lida) { <span class="novo">novo</span> }
            </button>
          }
        </div>
      </div>
    </section>

    <section class="sec sec-last">
      <span class="eb">Roteiro</span>
      <h2 class="h2">Seis passos para entender</h2>
      <div class="grid" style="margin-top:36px">
        @for (p of passos; track p.id; let i = $index) {
          <button class="card passo" (click)="ir.emit(p.id)">
            <span class="num mono" [style.color]="p.cor">0{{ i + 1 }}</span>
            <strong>{{ p.titulo }}</strong>
            <span class="muted">{{ p.texto }}</span>
          </button>
        }
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; position: relative; overflow: hidden; }
    .hero { display: flex; flex-wrap: wrap; gap: 56px; align-items: center; padding-top: 80px; }
    .texto { flex: 1 1 460px; min-width: 0; }
    .pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px; border: 1px solid var(--line);
      border-radius: 999px; background: var(--surface); }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
    .azul { color: var(--blue); }
    .janela { flex: 1 1 460px; min-width: 0; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,.5); }
    .barra { display: flex; align-items: center; gap: 8px; padding: 14px 18px; border-bottom: 1px solid var(--line); }
    .b { width: 11px; height: 11px; border-radius: 50%; }
    .tit { margin-left: 12px; font-size: 12px; color: var(--muted-2); }
    .corpo { padding: 20px 20px 10px; max-height: 560px; overflow-y: auto; }
    .cab { display: flex; justify-content: space-between; align-items: center; font-size: 18px; }
    .linha { display: flex; width: 100%; text-align: left; align-items: center; gap: 14px; min-height: 58px; padding: 0 12px;
      margin-bottom: 8px; border-radius: 12px; border: 1px solid var(--line); background: transparent; color: var(--ink); }
    .linha:hover { background: var(--surface-2); }
    .linha.on { background: var(--surface-3); border-color: var(--blue); }
    .ini { width: 34px; height: 34px; border-radius: 10px; flex: none; display: flex; align-items: center;
      justify-content: center; font-weight: 700; font-size: 14px; color: #07101f; }
    .t { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .a { font-weight: 600; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .r { font-size: 12px; color: var(--muted-2); }
    .novo { font-family: var(--mono); font-size: 11px; padding: 3px 8px; border-radius: 6px; background: #12315e; color: #7dd3fc; }
    .passo { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 28px; text-align: left;
      color: var(--ink); font-size: 22px; transition: border-color .2s, transform .2s; }
    .passo:hover { border-color: var(--blue); transform: translateY(-3px); }
    .passo .muted { font-size: 16px; line-height: 1.55; }
    .num { font-size: 48px; font-weight: 700; line-height: 1; margin-bottom: 8px; }
  `],
})
export class IntroComponent {
  ir = output<string>();
  sel = signal(0);
  lista = MENSAGENS.slice(0, 6);
  rotulo = rotuloPrioridade;
  cores: Record<string, string> = {
    rotina: '#60a5fa', preferencial: '#22d3ee', imediata: '#fbbf24', emergencia: '#f87171', instantanea: '#a78bfa',
  };
  passos = [
    { id: 'anatomia', cor: '#3b82f6', titulo: 'Anatomia de uma peça', texto: 'HTML, SCSS e TS: o que cada arquivo faz. Uma peça é montada ao vivo, camada por camada.' },
    { id: 'componente', cor: '#22d3ee', titulo: 'Componente = Lego', texto: 'Criamos peças e vemos todas as telas que usam a peça mudarem juntas.' },
    { id: 'semcom', cor: '#fb923c', titulo: 'Sem × Com Angular', texto: 'A mesma troca de botão em várias telas: arquivo por arquivo, ou editando uma peça só.' },
    { id: 'spa', cor: '#a78bfa', titulo: 'Uma página só', texto: 'Navegar sem piscar nem recarregar, e um contador que mantém o valor: site tradicional × SPA.' },
    { id: 'fim', cor: '#34d399', titulo: 'Fechamento', texto: 'O que vimos, em três frases.' },
  ];
}
