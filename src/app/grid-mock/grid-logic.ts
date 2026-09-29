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
