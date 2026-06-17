export type Prioridade = 'rotina' | 'preferencial' | 'imediata' | 'emergencia' | 'instantanea';

export interface Mensagem {
  remetente: string;
  assunto: string;
  dataHora: string;
  prioridade: Prioridade;
  lida: boolean;
}

export function rotuloPrioridade(p: Prioridade): string {
  const mapa: Record<Prioridade, string> = {
    rotina: 'Rotina',
    preferencial: 'Preferencial',
    imediata: 'Imediata',
    emergencia: 'Emergência',
    instantanea: 'Instantânea',
  };
  return mapa[p];
}

export const MENSAGENS: Mensagem[] = [
  { remetente: 'ComForSup', assunto: 'Ordem de operação ALFA', dataHora: 'I201941Z/MAR/2026', prioridade: 'imediata', lida: false },
  { remetente: 'Capitania', assunto: 'Aviso aos navegantes', dataHora: 'E200840Z/MAR/2026', prioridade: 'emergencia', lida: false },
  { remetente: 'DAdM', assunto: 'Escala de serviço semanal', dataHora: 'P191705Z/MAR/2026', prioridade: 'preferencial', lida: true },
  { remetente: 'Almoxarifado', assunto: 'Confirmação de recebimento', dataHora: 'R191422Z/MAR/2026', prioridade: 'rotina', lida: true },
];
