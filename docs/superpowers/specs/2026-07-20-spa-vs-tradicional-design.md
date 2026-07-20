# Aba "Uma página só (SPA)" — SPA vs site tradicional

## Objetivo
Substituir a demo de reatividade da última aba (`Dados Vivos`) por uma demonstração
interativa que mostra e explica a diferença entre um site **tradicional (MPA)** e um
**SPA (Single Page Application)** — a mudança que o Angular traz.

## Escopo
- Reescrever `src/app/secoes/dados-vivos.component.ts` (mantém `selector: app-dados-vivos`).
- Renomear o label da aba em `src/app/app.component.html`: `Dados Vivos` → `Uma página só (SPA)`.
- Nenhuma mudança no shell (`app.component.ts`), config ou dependências.
- Sem libs novas. Remover imports não usados (`MensagemCardComponent`, `MENSAGENS`).

## Layout
- Título + parágrafo curto explicando SPA vs tradicional.
- Dois "mock-browsers" lado a lado (CSS grid; empilha em telas estreitas).
- Callout de fecho com o que o Angular traz.

Cada mock-browser tem:
- Barra de endereço fake (`meusite.com/<rota>`).
- 3 links de navegação: Início / Sobre / Contato.
- Painel de conteúdo que troca conforme a rota.
- Contador de carregamentos.

## Comportamento (o contraste que ensina)
**Esquerda — Tradicional (sem SPA):**
- Clicar num link entra em estado `carregando` por ~600ms: spinner + flash branco
  cobrindo a janela inteira do mock (simula reload do servidor).
- Ao terminar: conteúdo da rota aparece e o contador `Recarregou N vezes` incrementa.
- Cada clique = novo "carregamento" completo.

**Direita — Angular (SPA):**
- Clicar num link troca o conteúdo na hora, sem flash, sem spinner.
- Contador fica fixo em `Carregou 1 vez`.
- Barra/menu do mock nunca piscam.

## Fecho (callout)
Explica: o Angular carrega **1 HTML shell** uma vez; o **Router** troca as views no
cliente via JavaScript, sem nova ida ao servidor a cada clique. Resultado: navegação
instantânea, sensação de app.

## Detalhes técnicos
- Standalone component. Imports: `CommonModule`, `MatButtonModule`, `MatIconModule`.
- Estado com propriedades simples (padrão do codebase — sem signals):
  - `rotaTrad: 'inicio' | 'sobre' | 'contato'`
  - `rotaSpa: 'inicio' | 'sobre' | 'contato'`
  - `carregandoTrad: boolean` (flash/spinner do lado tradicional)
  - `reloads: number` (contador do lado tradicional)
- Conteúdo das rotas: mapa `{ inicio, sobre, contato }` → título + texto curto.
- Flash: classe CSS com animação curta (`@keyframes`) sobre a janela do mock.
- Delay simulado: `setTimeout(..., 600)` no clique do lado tradicional.
- `provideAnimations()` já está configurado (usado pelo Material).

## Fora de escopo
- Sem roteamento Angular real (`RouterModule`) — a navegação é simulada com estado local
  para manter a tela autocontida e didática.
- Sem persistência, sem chamadas de rede reais.
