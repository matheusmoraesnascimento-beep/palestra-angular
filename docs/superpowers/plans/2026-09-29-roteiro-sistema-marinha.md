# Roteiro "Recebidas" como fio condutor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever a palestra em 7 abas usando uma grid de mensagens simulada (tela "Recebidas" do módulo Marinha) como exemplo em todos os conceitos.

**Architecture:** Lógica pura da grid (ordenar/filtrar/paginar) em `grid-logic.ts`, testada isoladamente. Um componente `app-grid-mock` com 3 modos (`estatico`, `mapa`, `interativo`) é reutilizado pelas abas 1, 2 e 5. Abas novas/reescritas são componentes standalone em `src/app/secoes/`.

**Tech Stack:** Angular 17 (standalone, OnPush onde couber), Angular Material 17 (já instalado), Karma/Jasmine, SCSS.

**Spec:** `docs/superpowers/specs/2026-09-29-roteiro-sistema-marinha-design.md`

## Global Constraints

- Angular 17, standalone components, Material já presente; sem libs novas.
- Dados 100% fictícios; sem código, endpoint ou nome interno real do sistema.
- Sem `any`; interfaces tipadas.
- Estado com propriedades simples (sem signals).
- Texto leigo: uma ideia por tela, frases curtas.
- Visual atual preservado (azul `#2563eb`, teal, âmbar; variáveis CSS de `src/styles.scss`). Responsivo (mobile).
- Build: `./node_modules/.bin/ng build` — **nunca `npx ng build`**. Via agente, lançar desacoplado: `setsid nohup ./node_modules/.bin/ng build > build.log 2>&1 &` e aguardar o log.
- Deploy: `./deploy.sh` (regra do `CLAUDE.md` do repo), somente na Task 6.
- Commits terminam com `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Review Focus

- Filtro digitado sem acento ("emergencia") deve achar "Emergência" — Task 1.
- Filtro sem resultado: tabela mostra "Nenhuma mensagem encontrada" e paginador "Página 1 de 1" — Tasks 1 e 2.
- Estar na página 3 e filtrar até sobrar 1 página: volta para a página válida, sem tabela vazia — Task 1.
- Ordenar por data-hora usa dia+hora, não texto (`E20…` não pode vencer `P19…` por letra) — Task 1.
- Filtro só com espaços é ignorado — Task 1.

## File Structure

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| edita | `src/app/mensagem.ts` | +8 linhas fictícias (12 no total) |
| novo | `src/app/grid-mock/grid-logic.ts` | Tipos e função pura `aplicar` (ordenar, filtrar, paginar) |
| novo | `src/app/grid-mock/grid-logic.spec.ts` | Testes da lógica |
| novo | `src/app/grid-mock/pecas.ts` | Catálogo das peças do mapa (id, nome, papel) |
| novo | `src/app/grid-mock/grid-mock.component.{ts,html,scss}` | Grid visual nos 3 modos |
| novo | `src/app/secoes/desmontando.component.ts` | Aba 2 |
| novo | `src/app/secoes/dados-mudam.component.ts` | Aba 5 |
| reescreve | `src/app/secoes/componente-lego.component.ts` | Aba 3 |
| edita | `src/app/mensagem-card/mensagem-card.component.scss` | Borda controlada por `--card-borda` |
| edita | `src/app/secoes/intro.component.ts` | Aba 1 usa a grid estática |
| edita | `src/app/secoes/trio.component.ts` | Exemplo vira linha de grid |
| remove | `src/app/secoes/comparacao.component.ts` | Absorvida pelas abas 3 e 5 |
| edita | `src/app/app.component.{ts,html}` | Novo conjunto de abas |

Trabalhar dentro do clone do repo da palestra (`REPO`). Todos os caminhos abaixo são relativos a ele.

---

### Task 1: Dados e lógica da grid

**Files:**
- Modify: `src/app/mensagem.ts`
- Create: `src/app/grid-mock/grid-logic.ts`
- Test: `src/app/grid-mock/grid-logic.spec.ts`

**Interfaces:**
- Produces (`grid-logic.ts`):
  - `type CampoOrdem = 'remetente' | 'assunto' | 'prioridade' | 'dataHora'`
  - `type Direcao = 'asc' | 'desc'`
  - `type Filtros = Partial<Record<CampoOrdem, string>>`
  - `interface EstadoGrid { sortField: CampoOrdem | null; sortDirection: Direcao; filtros: Filtros; pagina: number }`
  - `interface ResultadoGrid { linhas: Mensagem[]; total: number; paginas: number; pagina: number }`
  - `const TAMANHO_PAGINA = 5`
  - `const ESTADO_INICIAL: EstadoGrid`
  - `function aplicar(mensagens: Mensagem[], estado: EstadoGrid): ResultadoGrid`

- [ ] **Step 1: Instalar dependências**

Run (desacoplado): `cd REPO && setsid nohup npm ci > npm.log 2>&1 &` e aguardar `tail npm.log` mostrar `added ... packages`.
Expected: pasta `node_modules/` criada, `./node_modules/.bin/ng` existe.

- [ ] **Step 2: Acrescentar mensagens fictícias**

Em `src/app/mensagem.ts`, substituir o array `MENSAGENS` por:

```ts
export const MENSAGENS: Mensagem[] = [
  { remetente: 'ComForSup', assunto: 'Ordem de operação ALFA', dataHora: 'I201941Z/MAR/2026', prioridade: 'imediata', lida: false },
  { remetente: 'Capitania', assunto: 'Aviso aos navegantes', dataHora: 'E200840Z/MAR/2026', prioridade: 'emergencia', lida: false },
  { remetente: 'DAdM', assunto: 'Escala de serviço semanal', dataHora: 'P191705Z/MAR/2026', prioridade: 'preferencial', lida: true },
  { remetente: 'Almoxarifado', assunto: 'Confirmação de recebimento', dataHora: 'R191422Z/MAR/2026', prioridade: 'rotina', lida: true },
  { remetente: 'Hospital Naval', assunto: 'Convocação para inspeção de saúde', dataHora: 'D181330Z/MAR/2026', prioridade: 'preferencial', lida: true },
  { remetente: 'Base Naval', assunto: 'Manutenção programada do cais', dataHora: 'R181005Z/MAR/2026', prioridade: 'rotina', lida: true },
  { remetente: 'ComForSup', assunto: 'Cancelamento do exercício BRAVO', dataHora: 'I180715Z/MAR/2026', prioridade: 'imediata', lida: false },
  { remetente: 'Capitania', assunto: 'Alteração de balizamento', dataHora: 'E171650Z/MAR/2026', prioridade: 'emergencia', lida: true },
  { remetente: 'Escola Naval', assunto: 'Calendário de formaturas', dataHora: 'P171120Z/MAR/2026', prioridade: 'rotina', lida: true },
  { remetente: 'DAdM', assunto: 'Pagamento de adicional de embarque', dataHora: 'P170945Z/MAR/2026', prioridade: 'preferencial', lida: true },
  { remetente: 'Centro de Comunicações', assunto: 'Teste de circuito de alarme', dataHora: 'Z161500Z/MAR/2026', prioridade: 'instantanea', lida: false },
  { remetente: 'Almoxarifado', assunto: 'Inventário trimestral', dataHora: 'R160830Z/MAR/2026', prioridade: 'rotina', lida: true },
];
```

- [ ] **Step 3: Escrever os testes (falham)**

Criar `src/app/grid-mock/grid-logic.spec.ts`:

```ts
import { Mensagem } from '../mensagem';
import { ESTADO_INICIAL, EstadoGrid, TAMANHO_PAGINA, aplicar } from './grid-logic';

function msg(p: Partial<Mensagem>): Mensagem {
  return { remetente: 'X', assunto: 'a', dataHora: 'P010000Z/MAR/2026', prioridade: 'rotina', lida: true, ...p };
}

function estado(p: Partial<EstadoGrid>): EstadoGrid {
  return { ...ESTADO_INICIAL, filtros: {}, ...p };
}

describe('aplicar', () => {
  const lote: Mensagem[] = Array.from({ length: 12 }, (_, i) => msg({ assunto: `assunto ${i}` }));

  it('pagina em blocos de TAMANHO_PAGINA', () => {
    const r = aplicar(lote, estado({}));
    expect(r.linhas.length).toBe(TAMANHO_PAGINA);
    expect(r.total).toBe(12);
    expect(r.paginas).toBe(3);
    expect(r.pagina).toBe(1);
  });

  it('ordena por prioridade pelo grau, não pelo texto', () => {
    const r = aplicar(
      [msg({ prioridade: 'rotina' }), msg({ prioridade: 'instantanea' }), msg({ prioridade: 'imediata' })],
      estado({ sortField: 'prioridade', sortDirection: 'desc' }),
    );
    expect(r.linhas.map(l => l.prioridade)).toEqual(['instantanea', 'imediata', 'rotina']);
  });

  it('ordena data-hora por dia e hora, ignorando a letra inicial', () => {
    const r = aplicar(
      [msg({ dataHora: 'P191705Z/MAR/2026' }), msg({ dataHora: 'E200840Z/MAR/2026' }), msg({ dataHora: 'Z161500Z/MAR/2026' })],
      estado({ sortField: 'dataHora', sortDirection: 'asc' }),
    );
    expect(r.linhas.map(l => l.dataHora)).toEqual(['Z161500Z/MAR/2026', 'P191705Z/MAR/2026', 'E200840Z/MAR/2026']);
  });

  it('filtra sem diferenciar maiúsculas', () => {
    const r = aplicar([msg({ remetente: 'ComForSup' }), msg({ remetente: 'DAdM' })], estado({ filtros: { remetente: 'comfor' } }));
    expect(r.linhas.map(l => l.remetente)).toEqual(['ComForSup']);
  });

  it('filtra sem diferenciar acento (emergencia acha Emergência)', () => {
    const r = aplicar(
      [msg({ prioridade: 'emergencia' }), msg({ prioridade: 'rotina' })],
      estado({ filtros: { prioridade: 'emergencia' } }),
    );
    expect(r.linhas.map(l => l.prioridade)).toEqual(['emergencia']);
  });

  it('ignora filtro só com espaços', () => {
    const r = aplicar(lote, estado({ filtros: { assunto: '   ' } }));
    expect(r.total).toBe(12);
  });

  it('sem resultado: 0 linhas, 1 página, página 1', () => {
    const r = aplicar(lote, estado({ filtros: { assunto: 'nao-existe' } }));
    expect(r.linhas).toEqual([]);
    expect(r.total).toBe(0);
    expect(r.paginas).toBe(1);
    expect(r.pagina).toBe(1);
  });

  it('página fora do intervalo volta para a última válida', () => {
    const r = aplicar(lote, estado({ pagina: 3, filtros: { assunto: 'assunto 1' } }));
    expect(r.paginas).toBe(1);
    expect(r.pagina).toBe(1);
    expect(r.linhas.length).toBe(3);
  });
});
```

- [ ] **Step 4: Rodar e ver falhar**

Run: `./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless`
Expected: FAIL com erro de compilação `Cannot find module './grid-logic'`.
Se `ChromeHeadless` não existir na máquina, definir `CHROME_BIN` para o Chrome/Chromium instalado; se não houver navegador, pular os passos de teste e validar via Task 2 (build + verificação visual), registrando isso no relatório.

- [ ] **Step 5: Implementar**

Criar `src/app/grid-mock/grid-logic.ts`:

```ts
import { Mensagem, Prioridade, rotuloPrioridade } from '../mensagem';

export type CampoOrdem = 'remetente' | 'assunto' | 'prioridade' | 'dataHora';
export type Direcao = 'asc' | 'desc';
export type Filtros = Partial<Record<CampoOrdem, string>>;

export interface EstadoGrid {
  sortField: CampoOrdem | null;
  sortDirection: Direcao;
  filtros: Filtros;
  pagina: number;
}

export interface ResultadoGrid {
  linhas: Mensagem[];
  total: number;
  paginas: number;
  pagina: number;
}

export const TAMANHO_PAGINA = 5;

export const ESTADO_INICIAL: EstadoGrid = { sortField: null, sortDirection: 'asc', filtros: {}, pagina: 1 };

const GRAU: Record<Prioridade, number> = { rotina: 0, preferencial: 1, imediata: 2, emergencia: 3, instantanea: 4 };

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function textoDoCampo(m: Mensagem, campo: CampoOrdem): string {
  return campo === 'prioridade' ? rotuloPrioridade(m.prioridade) : m[campo];
}

function chaveDeOrdem(m: Mensagem, campo: CampoOrdem): string | number {
  switch (campo) {
    case 'prioridade': return GRAU[m.prioridade];
    case 'dataHora': return Number(m.dataHora.match(/\d{6}/)?.[0] ?? 0);
    default: return normalizar(m[campo]);
  }
}

export function aplicar(mensagens: Mensagem[], estado: EstadoGrid): ResultadoGrid {
  const campos = Object.keys(estado.filtros) as CampoOrdem[];
  let linhas = mensagens.filter(m =>
    campos.every(c => {
      const termo = normalizar((estado.filtros[c] ?? '').trim());
      return !termo || normalizar(textoDoCampo(m, c)).includes(termo);
    }),
  );

  if (estado.sortField) {
    const campo = estado.sortField;
    const sinal = estado.sortDirection === 'asc' ? 1 : -1;
    linhas = [...linhas].sort((a, b) => {
      const ka = chaveDeOrdem(a, campo);
      const kb = chaveDeOrdem(b, campo);
      return ka < kb ? -sinal : ka > kb ? sinal : 0;
    });
  }

  const total = linhas.length;
  const paginas = Math.max(1, Math.ceil(total / TAMANHO_PAGINA));
  const pagina = Math.min(Math.max(1, estado.pagina), paginas);
  const inicio = (pagina - 1) * TAMANHO_PAGINA;
  return { linhas: linhas.slice(inicio, inicio + TAMANHO_PAGINA), total, paginas, pagina };
}
```

- [ ] **Step 6: Rodar e ver passar**

Run: `./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless`
Expected: `8 SUCCESS`.

- [ ] **Step 7: Commit**

```bash
git add src/app/mensagem.ts src/app/grid-mock/grid-logic.ts src/app/grid-mock/grid-logic.spec.ts
git commit -m "feat: logica pura da grid (ordenar, filtrar, paginar) e mais mensagens ficticias

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Componente `app-grid-mock`

**Files:**
- Create: `src/app/grid-mock/pecas.ts`
- Create: `src/app/grid-mock/grid-mock.component.ts`
- Create: `src/app/grid-mock/grid-mock.component.html`
- Create: `src/app/grid-mock/grid-mock.component.scss`

**Interfaces:**
- Consumes: `aplicar`, `ESTADO_INICIAL`, `EstadoGrid`, `ResultadoGrid`, `CampoOrdem` de `grid-logic.ts`; `MENSAGENS`, `rotuloPrioridade` de `mensagem.ts`.
- Produces:
  - `pecas.ts`: `type PecaId = 'layout' | 'cabecalho' | 'tabela' | 'celula' | 'paginador'`; `interface Peca { id: PecaId; nome: string; papel: string }`; `const PECAS: Peca[]`.
  - `GridMockComponent` (`selector: 'app-grid-mock'`): `@Input() modo: ModoGrid` (`'estatico' | 'mapa' | 'interativo'`, padrão `'estatico'`), `@Input() pecaAtiva: PecaId | null`, `@Output() pecaSelecionada: EventEmitter<PecaId>`, `@Output() estadoMudou: EventEmitter<EstadoGrid>`.

- [ ] **Step 1: Catálogo de peças**

Criar `src/app/grid-mock/pecas.ts`:

```ts
export type PecaId = 'layout' | 'cabecalho' | 'tabela' | 'celula' | 'paginador';

export interface Peca {
  id: PecaId;
  nome: string;
  papel: string;
}

export const PECAS: Peca[] = [
  { id: 'layout', nome: 'Moldura da página', papel: 'A caixa que envolve tudo e dá o mesmo formato a todas as telas do sistema.' },
  { id: 'cabecalho', nome: 'Cabeçalho da coluna', papel: 'O título de cada coluna, com os botões de ordenar e de filtrar.' },
  { id: 'tabela', nome: 'Tabela', papel: 'Desenha as linhas a partir da lista de mensagens. Chegou mensagem nova, aparece uma linha nova.' },
  { id: 'celula', nome: 'Célula de data e hora', papel: 'Uma peça pequena, só para mostrar data e hora no formato da Marinha. Usada em várias telas.' },
  { id: 'paginador', nome: 'Paginador', papel: 'O rodapé que troca de página. É uma peça só, igual em todas as listas.' },
];
```

- [ ] **Step 2: Classe do componente**

Criar `src/app/grid-mock/grid-mock.component.ts`:

```ts
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENSAGENS, rotuloPrioridade } from '../mensagem';
import { CampoOrdem, ESTADO_INICIAL, EstadoGrid, ResultadoGrid, aplicar } from './grid-logic';
import { PecaId } from './pecas';

export type ModoGrid = 'estatico' | 'mapa' | 'interativo';

interface Coluna {
  campo: CampoOrdem;
  titulo: string;
}

@Component({
  selector: 'app-grid-mock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-mock.component.html',
  styleUrl: './grid-mock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridMockComponent {
  @Input() modo: ModoGrid = 'estatico';
  @Input() pecaAtiva: PecaId | null = null;
  @Output() pecaSelecionada = new EventEmitter<PecaId>();
  @Output() estadoMudou = new EventEmitter<EstadoGrid>();

  readonly colunas: Coluna[] = [
    { campo: 'remetente', titulo: 'Remetente' },
    { campo: 'assunto', titulo: 'Assunto' },
    { campo: 'prioridade', titulo: 'Prioridade' },
    { campo: 'dataHora', titulo: 'Data-hora' },
  ];
  readonly rotulo = rotuloPrioridade;

  estado: EstadoGrid = { ...ESTADO_INICIAL, filtros: {} };
  resultado: ResultadoGrid = aplicar(MENSAGENS, this.estado);
  filtroAberto: CampoOrdem | null = null;

  escolher(peca: PecaId, evento: Event): void {
    evento.stopPropagation();
    if (this.modo === 'mapa') this.pecaSelecionada.emit(peca);
  }

  iconeOrdem(campo: CampoOrdem): string {
    if (this.estado.sortField !== campo) return '⇅';
    return this.estado.sortDirection === 'asc' ? '▲' : '▼';
  }

  temFiltro(campo: CampoOrdem): boolean {
    return !!(this.estado.filtros[campo] ?? '').trim();
  }

  alternarOrdem(campo: CampoOrdem): void {
    if (this.modo !== 'interativo') return;
    const mesmo = this.estado.sortField === campo;
    this.atualizar({
      sortField: campo,
      sortDirection: mesmo && this.estado.sortDirection === 'asc' ? 'desc' : 'asc',
      pagina: 1,
    });
  }

  alternarFiltro(campo: CampoOrdem): void {
    if (this.modo !== 'interativo') return;
    this.filtroAberto = this.filtroAberto === campo ? null : campo;
  }

  mudarFiltro(campo: CampoOrdem, valor: string): void {
    this.atualizar({ filtros: { ...this.estado.filtros, [campo]: valor }, pagina: 1 });
  }

  limparFiltro(campo: CampoOrdem): void {
    this.mudarFiltro(campo, '');
    this.filtroAberto = null;
  }

  mudarPagina(delta: number): void {
    if (this.modo !== 'interativo') return;
    this.atualizar({ pagina: this.resultado.pagina + delta });
  }

  private atualizar(parcial: Partial<EstadoGrid>): void {
    const novo: EstadoGrid = { ...this.estado, ...parcial };
    const resultado = aplicar(MENSAGENS, novo);
    this.estado = { ...novo, pagina: resultado.pagina };
    this.resultado = resultado;
    this.estadoMudou.emit(this.estado);
  }
}
```

- [ ] **Step 3: Template**

Criar `src/app/grid-mock/grid-mock.component.html`:

```html
<div class="moldura" [class.mapa]="modo === 'mapa'" [class.ativa]="pecaAtiva === 'layout'" (click)="escolher('layout', $event)">
  <div class="rolagem">
    <table [class.ativa]="pecaAtiva === 'tabela'" (click)="escolher('tabela', $event)">
      <thead [class.ativa]="pecaAtiva === 'cabecalho'" (click)="escolher('cabecalho', $event)">
        <tr>
          <th *ngFor="let c of colunas">
            <div class="th-conteudo">
              <span>{{ c.titulo }}</span>
              <span class="controles">
                <button type="button" class="ico" [class.on]="estado.sortField === c.campo" (click)="alternarOrdem(c.campo)" [attr.aria-label]="'Ordenar por ' + c.titulo">{{ iconeOrdem(c.campo) }}</button>
                <button type="button" class="ico" [class.on]="temFiltro(c.campo)" (click)="alternarFiltro(c.campo)" [attr.aria-label]="'Filtrar ' + c.titulo">🔍</button>
              </span>
            </div>
            <div class="filtro" *ngIf="filtroAberto === c.campo" (click)="$event.stopPropagation()">
              <input #f type="text" placeholder="Digite para filtrar" [value]="estado.filtros[c.campo] ?? ''" (input)="mudarFiltro(c.campo, f.value)" />
              <button type="button" class="limpar" (click)="limparFiltro(c.campo)">Limpar</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let m of resultado.linhas" [class.lida]="m.lida">
          <td class="remetente">{{ m.remetente }}</td>
          <td>{{ m.assunto }}</td>
          <td><span class="badge" [ngClass]="'badge-' + m.prioridade">{{ rotulo(m.prioridade) }}</span></td>
          <td class="celula-data" [class.ativa]="pecaAtiva === 'celula'" (click)="escolher('celula', $event)">{{ m.dataHora }}</td>
        </tr>
        <tr *ngIf="!resultado.linhas.length">
          <td colspan="4" class="vazio">Nenhuma mensagem encontrada</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="rodape" [class.ativa]="pecaAtiva === 'paginador'" (click)="escolher('paginador', $event)">
    <span>{{ resultado.total }} {{ resultado.total === 1 ? 'mensagem' : 'mensagens' }}</span>
    <span class="paginas">
      <button type="button" class="ico" [disabled]="resultado.pagina <= 1" (click)="mudarPagina(-1)" aria-label="Página anterior">‹</button>
      <span>Página {{ resultado.pagina }} de {{ resultado.paginas }}</span>
      <button type="button" class="ico" [disabled]="resultado.pagina >= resultado.paginas" (click)="mudarPagina(1)" aria-label="Próxima página">›</button>
    </span>
  </div>
</div>
```

- [ ] **Step 4: Estilos**

Criar `src/app/grid-mock/grid-mock.component.scss`:

```scss
:host { display: block; }

.moldura {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}
.rolagem { overflow-x: auto; }

table { width: 100%; border-collapse: collapse; min-width: 640px; font-size: .95rem; }
th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: top; }
thead { background: #f8faff; }
th { font-weight: 700; color: var(--muted); font-size: .85rem; letter-spacing: .04em; text-transform: uppercase; }
.th-conteudo { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.controles { display: inline-flex; gap: 2px; }

.ico {
  border: 0; background: transparent; cursor: pointer; color: var(--muted-2);
  min-width: 24px; height: 24px; border-radius: 6px; font-size: .8rem; padding: 0 4px;
}
.ico:hover:not(:disabled) { background: var(--blue-soft); color: var(--blue); }
.ico.on { color: var(--blue); background: var(--blue-soft); }
.ico:disabled { opacity: .35; cursor: default; }

.filtro { display: flex; gap: 6px; margin-top: 8px; text-transform: none; letter-spacing: 0; }
.filtro input {
  flex: 1; min-width: 0; border: 0; border-bottom: 2px solid var(--blue); background: transparent;
  font: inherit; font-size: .9rem; padding: 4px 2px; outline: none;
}
.limpar { border: 1px solid var(--blue-border); background: var(--blue-soft); color: var(--blue); border-radius: 8px; padding: 2px 10px; cursor: pointer; font-size: .8rem; }

.remetente { font-weight: 700; color: var(--ink); }
.celula-data { font-family: 'Roboto Mono', ui-monospace, monospace; letter-spacing: .5px; color: var(--muted); white-space: nowrap; }
tr.lida td { opacity: .65; }
.vazio { text-align: center; color: var(--muted-2); padding: 28px 14px; }

.badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: .8rem; font-weight: 600; }
.badge-rotina       { background: #eaf2ff; color: #1e40af; }
.badge-preferencial { background: #e7faf5; color: #0f766e; }
.badge-imediata     { background: #fef6e7; color: #b45309; }
.badge-emergencia   { background: #ffece2; color: #c2410c; }
.badge-instantanea  { background: #fde8e8; color: #b00020; }

.rodape {
  display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
  padding: 10px 14px; background: #f8faff; color: var(--muted-2); font-size: .9rem;
}
.paginas { display: inline-flex; align-items: center; gap: 8px; }

.mapa .rodape, .mapa thead, .mapa table, .mapa .celula-data { cursor: pointer; }
.mapa { cursor: pointer; }
.ativa { outline: 3px solid var(--blue); outline-offset: -3px; background-color: rgba(37, 99, 235, .07); }
thead.ativa, .rodape.ativa { background-color: rgba(37, 99, 235, .12); }
```

- [ ] **Step 5: Build**

Run (desacoplado): `setsid nohup ./node_modules/.bin/ng build > build.log 2>&1 &` e aguardar `tail build.log`.
Expected: `Application bundle generation complete` sem erros. (O componente ainda não está em nenhuma aba; isso valida só a compilação.)

- [ ] **Step 6: Commit**

```bash
git add src/app/grid-mock
git commit -m "feat: componente grid-mock com modos estatico, mapa e interativo

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Aba 2 — Desmontando a tela

**Files:**
- Create: `src/app/secoes/desmontando.component.ts`
- Modify: `src/app/app.component.ts`, `src/app/app.component.html`

**Interfaces:**
- Consumes: `GridMockComponent` (`modo`, `pecaAtiva`, `pecaSelecionada`), `PECAS`, `Peca`, `PecaId`.
- Produces: `DesmontandoComponent` (`selector: 'app-desmontando'`).

- [ ] **Step 1: Criar o componente**

Criar `src/app/secoes/desmontando.component.ts`:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridMockComponent } from '../grid-mock/grid-mock.component';
import { PECAS, Peca, PecaId } from '../grid-mock/pecas';

@Component({
  selector: 'app-desmontando',
  standalone: true,
  imports: [CommonModule, GridMockComponent],
  template: `
    <section class="tela">
      <h2>Desmontando uma tela</h2>
      <p>
        Esta é a lista de mensagens recebidas, do jeito que você conhece. Para o Angular ela é um
        <strong>conjunto de peças</strong>. <strong>Clique numa parte da tela</strong> para ver que peça é.
      </p>

      <div class="layout">
        <app-grid-mock modo="mapa" [pecaAtiva]="ativa?.id ?? null" (pecaSelecionada)="selecionar($event)"></app-grid-mock>

        <aside class="painel" aria-live="polite">
          <ng-container *ngIf="ativa; else vazio">
            <span class="rotulo">Peça selecionada</span>
            <h3>{{ ativa.nome }}</h3>
            <p>{{ ativa.papel }}</p>
          </ng-container>
          <ng-template #vazio>
            <span class="rotulo">Peça selecionada</span>
            <p class="dica">Nenhuma ainda. Clique na tabela, no cabeçalho, numa data ou no rodapé.</p>
          </ng-template>
        </aside>
      </div>

      <div class="chips">
        <button type="button" *ngFor="let p of pecas" [class.on]="ativa?.id === p.id" (click)="selecionar(p.id)">{{ p.nome }}</button>
      </div>

      <div class="callout">🔎 Cinco peças, uma tela. Cada peça é feita uma vez e usada em várias telas do sistema.</div>
    </section>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; margin-top: 1.5rem; }
    @media (max-width: 980px) { .layout { grid-template-columns: 1fr; } }
    .painel {
      background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem;
      box-shadow: var(--card-shadow); position: sticky; top: 90px; min-height: 140px;
    }
    .rotulo { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; }
    .painel h3 { margin: .5rem 0 0; font-size: 1.25rem; color: var(--ink-strong); }
    .painel p { font-size: 1rem; margin: .5rem 0 0; }
    .dica { font-style: italic; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.25rem; }
    .chips button {
      border: 1px solid var(--blue-border); background: var(--blue-soft); color: #1e40af;
      border-radius: 999px; padding: 6px 14px; font: inherit; font-size: .9rem; font-weight: 600; cursor: pointer;
    }
    .chips button.on { background: var(--blue); color: #fff; border-color: var(--blue); }
  `],
})
export class DesmontandoComponent {
  readonly pecas = PECAS;
  ativa: Peca | null = null;

  selecionar(id: PecaId): void {
    this.ativa = PECAS.find(p => p.id === id) ?? null;
  }
}
```

- [ ] **Step 2: Ligar na aba**

Em `src/app/app.component.ts`: adicionar `import { DesmontandoComponent } from './secoes/desmontando.component';` e incluir `DesmontandoComponent` no array `imports`.

Em `src/app/app.component.html`, logo após a aba `Início`, inserir:

```html
  <mat-tab label="Desmontando a tela"><app-desmontando></app-desmontando></mat-tab>
```

- [ ] **Step 3: Build e verificação visual**

Run: build desacoplado (ver Global Constraints). Depois `./node_modules/.bin/ng serve` e abrir `http://localhost:4200`.
Expected: aba "Desmontando a tela" — clicar no cabeçalho, numa data, no rodapé, na tabela e na moldura (borda da caixa) destaca a região e troca o painel; os botões de chips fazem o mesmo; em largura < 980px o painel vai para baixo da grid. Clicar em ordenar/filtrar/paginar **não** altera a tabela neste modo (só seleciona "Cabeçalho"/"Paginador").

- [ ] **Step 4: Commit**

```bash
git add src/app/secoes/desmontando.component.ts src/app/app.component.ts src/app/app.component.html
git commit -m "feat: aba Desmontando a tela com mapa de pecas clicavel

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Aba 5 — Dados mudam a tela

**Files:**
- Create: `src/app/secoes/dados-mudam.component.ts`
- Modify: `src/app/app.component.ts`, `src/app/app.component.html`

**Interfaces:**
- Consumes: `GridMockComponent` (`modo`, `estadoMudou`), `ESTADO_INICIAL`, `EstadoGrid`.
- Produces: `DadosMudamComponent` (`selector: 'app-dados-mudam'`).

- [ ] **Step 1: Criar o componente**

Criar `src/app/secoes/dados-mudam.component.ts`:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridMockComponent } from '../grid-mock/grid-mock.component';
import { ESTADO_INICIAL, EstadoGrid } from '../grid-mock/grid-logic';

@Component({
  selector: 'app-dados-mudam',
  standalone: true,
  imports: [CommonModule, GridMockComponent],
  template: `
    <section class="tela">
      <h2>Os dados mudam, a tela acompanha</h2>
      <p>
        Ordene uma coluna, filtre um remetente, troque de página. Repare no quadro ao lado:
        o Angular <strong>guarda a situação da tela em variáveis</strong> (o "cérebro", em TypeScript)
        e o HTML só <strong>mostra</strong> o que está guardado.
      </p>

      <div class="layout">
        <app-grid-mock modo="interativo" (estadoMudou)="estado = $event"></app-grid-mock>

        <aside class="painel">
          <span class="rotulo">O que o TypeScript guarda</span>
          <dl>
            <dt>sortField</dt><dd>{{ estado.sortField ?? 'nenhum' }}</dd>
            <dt>sortDirection</dt><dd>{{ estado.sortDirection }}</dd>
            <dt>filtros</dt><dd>{{ estado.filtros | json }}</dd>
            <dt>pagina</dt><dd>{{ estado.pagina }}</dd>
          </dl>
        </aside>
      </div>

      <div class="callout">🔎 Ninguém redesenha a tela à mão: mudou a variável, mudou a tabela.</div>
    </section>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; margin-top: 1.5rem; }
    @media (max-width: 980px) { .layout { grid-template-columns: 1fr; } }
    .painel {
      background: #0d1b2a; color: #e0e6ed; border-radius: 16px; padding: 1.25rem;
      position: sticky; top: 90px; box-shadow: 0 8px 20px rgba(15, 39, 71, .12);
    }
    .rotulo { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #93b4ff; }
    dl { margin: .75rem 0 0; font-family: 'Roboto Mono', ui-monospace, monospace; font-size: .9rem; }
    dt { color: #f59e0b; margin-top: .6rem; }
    dd { margin: .15rem 0 0; white-space: pre-wrap; word-break: break-word; }
  `],
})
export class DadosMudamComponent {
  estado: EstadoGrid = { ...ESTADO_INICIAL, filtros: {} };
}
```

- [ ] **Step 2: Ligar na aba**

Em `src/app/app.component.ts`: importar `DadosMudamComponent` de `./secoes/dados-mudam.component` e incluir em `imports`.

Em `src/app/app.component.html`, imediatamente antes da aba `Uma página só (SPA)`, inserir:

```html
  <mat-tab label="Dados mudam a tela"><app-dados-mudam></app-dados-mudam></mat-tab>
```

- [ ] **Step 3: Build e verificação visual**

Run: build desacoplado; abrir `ng serve`.
Expected: na aba "Dados mudam a tela":
- clicar no ⇅ de Prioridade ordena (▲), de novo inverte (▼); o quadro escuro mostra `sortField: prioridade` e a direção.
- 🔍 abre campo sublinhado; digitar "emergencia" mostra só as mensagens de Emergência; quadro mostra `filtros`; "Limpar" restaura.
- Digitar "zzz" mostra "Nenhuma mensagem encontrada" e "Página 1 de 1".
- Ir à página 3 e filtrar "capitania" volta para "Página 1 de 1".
- Em 375px de largura a tabela rola na horizontal, sem quebrar a página.

- [ ] **Step 4: Commit**

```bash
git add src/app/secoes/dados-mudam.component.ts src/app/app.component.ts src/app/app.component.html
git commit -m "feat: aba Dados mudam a tela com grid interativa e painel de estado

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Abas 1, 3, 4 e limpeza (Início, Componente, Trio, remover Com vs Sem)

**Files:**
- Modify: `src/app/secoes/intro.component.ts`
- Rewrite: `src/app/secoes/componente-lego.component.ts`
- Modify: `src/app/mensagem-card/mensagem-card.component.scss`
- Modify: `src/app/secoes/trio.component.ts`
- Delete: `src/app/secoes/comparacao.component.ts`
- Modify: `src/app/app.component.ts`, `src/app/app.component.html`

**Interfaces:**
- Consumes: `GridMockComponent` (modo `estatico`), `MensagemCardComponent`, `MENSAGENS`, `Mensagem`.

- [ ] **Step 1: Card com borda controlável**

Em `src/app/mensagem-card/mensagem-card.component.scss`, dentro da regra `.card { … }`, acrescentar a linha:

```scss
  border-left: 6px solid var(--card-borda, var(--border));
```

- [ ] **Step 2: Aba 3 — reescrever `componente-lego.component.ts`**

Substituir o arquivo por:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MensagemCardComponent } from '../mensagem-card/mensagem-card.component';
import { MENSAGENS, Mensagem } from '../mensagem';

interface TelaMock {
  nome: string;
  mensagens: Mensagem[];
}

@Component({
  selector: 'app-componente-lego',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MensagemCardComponent],
  template: `
    <section class="tela">
      <h2>Componente = peça de Lego</h2>
      <p>
        Estas são <strong>3 telas do sistema</strong>. Todas mostram mensagens em cartões, mas existe
        <strong>um só molde</strong>: a peça <code>MensagemCardComponent</code>. Aperte o botão e veja
        as três telas mudarem juntas.
      </p>

      <button mat-raised-button color="accent" class="botao" (click)="alternar()">
        {{ destacado ? 'Voltar à borda original' : 'Mudar a peça: borda azul' }}
      </button>

      <div class="telas" [style.--card-borda]="destacado ? '#2563eb' : null">
        <div class="mini" *ngFor="let t of telas">
          <h3>{{ t.nome }}</h3>
          <app-mensagem-card *ngFor="let m of t.mensagens" [mensagem]="m"></app-mensagem-card>
        </div>
      </div>

      <div class="callout">🔎 1 peça → {{ total }} usos em {{ telas.length }} telas. Mudou num lugar, mudou em todas.</div>
    </section>
  `,
  styles: [`
    .botao { margin: .5rem 0 1.5rem; }
    .telas { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .mini { display: grid; gap: .75rem; align-content: start; background: #f8faff; border: 1px dashed var(--blue-border); border-radius: 16px; padding: 1rem; }
    .mini h3 { margin: 0; font-size: .85rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted-2); }
  `],
})
export class ComponenteLegoComponent {
  readonly telas: TelaMock[] = [
    { nome: 'Recebidas', mensagens: MENSAGENS.slice(0, 2) },
    { nome: 'Rascunho', mensagens: MENSAGENS.slice(2, 4) },
    { nome: 'Enviadas', mensagens: MENSAGENS.slice(4, 6) },
  ];
  readonly total = this.telas.reduce((soma, t) => soma + t.mensagens.length, 0);
  destacado = false;

  alternar(): void {
    this.destacado = !this.destacado;
  }
}
```

- [ ] **Step 3: Aba 1 — grid estática no lugar da arte**

Em `src/app/secoes/intro.component.ts`:
1. Adicionar `import { GridMockComponent } from '../grid-mock/grid-mock.component';` e `imports: [GridMockComponent],` no decorator `@Component`.
2. Substituir todo o bloco `<div class="hero-arte"> … </div>` (do `<div class="hero-arte">` até o `</div>` que fecha antes de `</section>` do `.hero`) por:

```html
      <div class="hero-arte">
        <span class="arte-rotulo">Uma tela que você usa todo dia</span>
        <app-grid-mock modo="estatico"></app-grid-mock>
        <p class="arte-legenda">A lista de mensagens recebidas: montada com peças que se repetem e se encaixam.</p>
      </div>
```

3. Trocar o texto do `.callout` por:

```html
          <span>
            <strong>Este próprio site é feito assim.</strong> As abas lá em cima e a tabela ao lado
            são peças Angular.
          </span>
```

4. No CSS, apagar as regras `.arte-card`, `.pecas`, `.peca` (e variantes `.azul/.teal/.ambar/.roxo`), `.monta`, `.monta .linha`, `.monta-pill`, `.tela-montada`, `.janela`, `.bolinha` (e `.r/.y/.g`), `.conteudo`, `.bloco.azul-cheio`, `.linha-botoes`, `.btn-teal`, `.btn-out`, `.card-ambar`, `.texto-fake`. Manter `.hero-arte`, `.arte-rotulo` e `.arte-legenda`, e ajustar:

```css
    .arte-rotulo { display: block; margin-bottom: 12px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; }
    .arte-legenda { margin: 16px 0 0; font-size: 13px; font-style: italic; color: #94a3b8; text-align: center; }
```

- [ ] **Step 4: Aba 4 — exemplo do Trio vira linha de grid**

Em `src/app/secoes/trio.component.ts`:
- No texto do template: trocar "o cartão à direita mudar na hora" por "a linha da tabela à direita mudar na hora" e "Os três quadros são os arquivos reais do cartão" por "Os três quadros são os arquivos de uma linha da tabela de mensagens".
- Trocar os valores iniciais de `html` e `scss` (deixar `ts` como está):

```ts
  html = `<div class="linha">
  <span class="remetente">{{ mensagem.remetente }}</span>
  <span class="assunto">{{ mensagem.assunto }}</span>
  <span class="data-hora">{{ mensagem.dataHora }}</span>
</div>`;

  scss = `.linha {
  display: flex;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
  border-left: 6px solid #2563eb;
  background: #fff;
  padding: 12px 16px;
}
.remetente { font-weight: 700; color: #0f2747; }
.assunto { flex: 1; }
.data-hora { color: #64748b; font-family: monospace; }`;
```

- [ ] **Step 5: Remover "Com vs Sem" e fechar as abas**

```bash
git rm src/app/secoes/comparacao.component.ts
```

Em `src/app/app.component.ts`: remover `import { ComparacaoComponent } …` e `ComparacaoComponent` do array `imports`.

Substituir o `<mat-tab-group>` de `src/app/app.component.html` por:

```html
<mat-tab-group class="abas" animationDuration="250ms" [mat-stretch-tabs]="false">
  <mat-tab label="Início"><app-intro></app-intro></mat-tab>
  <mat-tab label="Desmontando a tela"><app-desmontando></app-desmontando></mat-tab>
  <mat-tab label="Componente"><app-componente-lego></app-componente-lego></mat-tab>
  <mat-tab label="Trio HTML/SCSS/TS"><app-trio></app-trio></mat-tab>
  <mat-tab label="Dados mudam a tela"><app-dados-mudam></app-dados-mudam></mat-tab>
  <mat-tab label="Uma página só (SPA)"><app-dados-vivos></app-dados-vivos></mat-tab>
  <mat-tab label="Encerramento"><app-encerramento></app-encerramento></mat-tab>
</mat-tab-group>
```

- [ ] **Step 6: Build e verificação visual**

Run: build desacoplado; `ng serve`.
Expected: 7 abas na ordem acima, sem erro de build nem de console.
- Início: grid ao lado do texto, sem cliques que alterem algo.
- Componente: 3 telas com 2 cartões cada; botão troca a borda das 6 cartas ao mesmo tempo e volta.
- Trio: editar HTML/SCSS/TS altera a "linha" à direita; texto da preview aparece.
- SPA e Encerramento: iguais a antes.

- [ ] **Step 7: Commit**

```bash
git add -A src
git commit -m "feat: reescreve Inicio, Componente e Trio com a grid; remove Com vs Sem

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Verificação final e deploy

**Files:** nenhum novo.

- [ ] **Step 1: Testes e build limpo**

Run: `./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless` (ver nota da Task 1 se não houver Chrome) e build desacoplado.
Expected: 8 testes passando; build sem erros nem warnings novos.

- [ ] **Step 2: Varredura de dados sensíveis**

Run: `grep -rniE "sigdem|sigad|supp|admin[-_]?rest|token|senha|password" src/app --include=*.ts --include=*.html`
Expected: nenhuma ocorrência nova nos arquivos desta mudança. `sigdem.mb`/`sigad.mb` em `dados-vivos.component.ts` já existiam e são mocks (não alterar).

- [ ] **Step 3: Passada visual completa**

`ng serve`, percorrer as 7 abas em ~1280px e ~375px. Anotar qualquer quebra de layout e corrigir antes de seguir.

- [ ] **Step 4: Confirmar push e deploy com o usuário**

O `CLAUDE.md` do repo manda publicar após mudanças, mas isso torna o site público. Antes de rodar, mostrar ao usuário `git log --oneline main..HEAD` e perguntar: "Faço push do `main` e `./deploy.sh` agora?"

- [ ] **Step 5: Push e deploy (após confirmação)**

```bash
git push origin main
./deploy.sh
```

Expected: `deploy.sh` termina com push da `gh-pages`; após 1–2 min, `https://matheusmoraesnascimento-beep.github.io/palestra-angular/` mostra as 7 abas novas.

- [ ] **Step 6: Conferir o site publicado**

Run: `curl -sL https://matheusmoraesnascimento-beep.github.io/palestra-angular/ | grep -o 'main-[A-Z0-9]*\.js'`
Expected: hash diferente do anterior (`main-4WBFRJCV.js`). Abrir o site e conferir a aba "Desmontando a tela".
