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
  { remetente: 'Hospital Naval', assunto: 'Convocação para inspeção de saúde', dataHora: 'D181330Z/MAR/2026', prioridade: 'preferencial', lida: true },
  { remetente: 'Base Naval', assunto: 'Manutenção programada do cais', dataHora: 'R181005Z/MAR/2026', prioridade: 'rotina', lida: true },
  { remetente: 'ComForSup', assunto: 'Cancelamento do exercício BRAVO', dataHora: 'I180715Z/MAR/2026', prioridade: 'imediata', lida: false },
  { remetente: 'Capitania', assunto: 'Alteração de balizamento', dataHora: 'E171650Z/MAR/2026', prioridade: 'emergencia', lida: true },
  { remetente: 'Escola Naval', assunto: 'Calendário de formaturas', dataHora: 'P171120Z/MAR/2026', prioridade: 'rotina', lida: true },
  { remetente: 'DAdM', assunto: 'Pagamento de adicional de embarque', dataHora: 'P170945Z/MAR/2026', prioridade: 'preferencial', lida: true },
  { remetente: 'Centro de Comunicações', assunto: 'Teste de circuito de alarme', dataHora: 'Z161500Z/MAR/2026', prioridade: 'instantanea', lida: false },
  { remetente: 'Almoxarifado', assunto: 'Inventário trimestral', dataHora: 'R160830Z/MAR/2026', prioridade: 'rotina', lida: true },
];
