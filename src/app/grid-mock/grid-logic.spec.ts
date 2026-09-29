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
