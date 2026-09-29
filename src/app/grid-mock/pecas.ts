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
