export type Prioridade = 'rotina' | 'urgente' | 'imediata';

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
    urgente: 'Urgente',
    imediata: 'Imediata',
  };
  return mapa[p];
}

export const MENSAGENS: Mensagem[] = [
  { remetente: 'ComForSup', assunto: 'Ordem de operação ALFA', dataHora: 'I201941Z/MAR/2026', prioridade: 'imediata', lida: false },
  { remetente: 'Capitania', assunto: 'Aviso aos navegantes', dataHora: 'I200840Z/MAR/2026', prioridade: 'urgente', lida: false },
  { remetente: 'DAdM', assunto: 'Escala de serviço semanal', dataHora: 'I191705Z/MAR/2026', prioridade: 'rotina', lida: true },
  { remetente: 'Almoxarifado', assunto: 'Confirmação de recebimento', dataHora: 'I191422Z/MAR/2026', prioridade: 'rotina', lida: true },
];
