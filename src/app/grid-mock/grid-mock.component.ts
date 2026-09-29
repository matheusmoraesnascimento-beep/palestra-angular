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
