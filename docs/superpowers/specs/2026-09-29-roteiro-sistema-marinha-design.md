# Roteiro novo — a tela "Recebidas" como fio condutor

## Objetivo
Palestra didática de Angular básico para pessoas leigas (Marinha). Cada conceito é
mostrado em cima de uma tela real do sistema (módulo Marinha, mensagens
administrativas), simulada com dados fictícios. Sucesso: o leigo entende o conceito e
pensa "isso é a tela que eu já uso".

## Restrições
- Dados 100% fictícios. Sem código, endpoint ou nome interno real do sistema.
- Sem libs novas. Angular 17, standalone, Material já presentes.
- Sem `any`; interfaces tipadas.
- Estado com propriedades simples (padrão do repo, sem signals).
- Texto leigo: uma ideia por tela, frases curtas.
- Visual atual preservado (azul, teal, âmbar). Responsivo (mobile).
- Deploy conforme `CLAUDE.md` do repo: `./deploy.sh` após a mudança.

## Roteiro (7 abas)
| # | Aba | Conteúdo | Origem |
|---|---|---|---|
| 1 | Início | O que é Angular? Analogia do navio mantida. Grid mock estática como gancho: "esta tela você usa todo dia". | reescreve |
| 2 | Desmontando a tela | Mapa de componentes: grid mock com regiões clicáveis (layout, cabeçalho + ordenar/filtro, tabela, célula data-hora, paginador). Clique destaca a peça e explica nome e papel em linguagem simples. | nova |
| 3 | Componente | Reuso: o mesmo `app-mensagem-card` em 3 telas simuladas (Recebidas, Rascunho, Enviadas). Botão "mudar a peça" altera a borda e todas mudam juntas. | reescreve |
| 4 | Trio HTML/SCSS/TS | Editor ao vivo mantido; exemplo passa a ser uma linha da grid. | ajusta |
| 5 | Dados mudam a tela | Grid interativa (ordenar, filtrar coluna, paginar). Painel "o que o TS guarda" mostra `sortField`, `sortDirection`, `filtro`, `pagina` mudando ao vivo. | nova |
| 6 | Uma página só (SPA) | Mantida. | mantém |
| 7 | Encerramento | Mantido ("Obrigado" + assinatura). | mantém |

A aba "Com vs Sem" é absorvida pelas abas 3 e 5 e removida.

## Peça central: `app-grid-mock`
- Tabela de mensagens fictícias: Remetente, Assunto, Prioridade, Data-hora (usa `Mensagem`).
- Cabeçalho com ícones de ordenar e filtrar; célula data-hora; rodapé com paginador.
- `@Input() modo: 'estatico' | 'mapa' | 'interativo'`.
  - `estatico`: só exibe.
  - `mapa`: regiões clicáveis; emite `@Output() pecaSelecionada` com o id da peça.
  - `interativo`: ordenar, filtrar, paginar; emite o estado para o painel da aba 5.
- OnPush. Estado simples no TS.

## Arquivos
| Ação | Arquivo |
|---|---|
| novo | `src/app/grid-mock/grid-mock.component.{ts,html,scss}` |
| novo | `src/app/secoes/desmontando.component.ts` |
| novo | `src/app/secoes/dados-mudam.component.ts` |
| reescreve | `src/app/secoes/intro.component.ts`, `src/app/secoes/componente-lego.component.ts` |
| ajusta | `src/app/secoes/trio.component.ts` |
| remove | `src/app/secoes/comparacao.component.ts` |
| edita | `src/app/app.component.{ts,html}` (abas), `src/app/mensagem.ts` (+ linhas fictícias) |
| mantém | `dados-vivos`, `encerramento`, `code-panel` |

## Verificação
1. `./node_modules/.bin/ng build` sem erros (nunca `npx ng build`).
2. `ng serve`: conferir cada aba em desktop e mobile.
3. Ordenar, filtrar e paginar funcionando na aba 5; cliques do mapa na aba 2.
4. `./deploy.sh` e conferir a URL pública.

## Fora de escopo
- Roteamento Angular real, rede, persistência.
- Telas do sistema além de "Recebidas" (lista); Rascunho/Enviadas só como reuso do card.
