export type Prioridade = 'rotina' | 'urgente' | 'urgentissimo';

export interface Mensagem {
  remetente: string;
  assunto: string;
  data: string;
  prioridade: Prioridade;
  lida: boolean;
}

export function rotuloPrioridade(p: Prioridade): string {
  const mapa: Record<Prioridade, string> = {
    rotina: 'Rotina',
    urgente: 'Urgente',
    urgentissimo: 'Urgentíssimo',
  };
  return mapa[p];
}

export const MENSAGENS: Mensagem[] = [
  { remetente: 'ComForSup', assunto: 'Ordem de operação ALFA', data: '17/06 09:12', prioridade: 'urgentissimo', lida: false },
  { remetente: 'Capitania', assunto: 'Aviso aos navegantes', data: '17/06 08:40', prioridade: 'urgente', lida: false },
  { remetente: 'DAdM', assunto: 'Escala de serviço semanal', data: '16/06 17:05', prioridade: 'rotina', lida: true },
  { remetente: 'Almoxarifado', assunto: 'Confirmação de recebimento', data: '16/06 14:22', prioridade: 'rotina', lida: true },
];
