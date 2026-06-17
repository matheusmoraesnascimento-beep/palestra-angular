import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  template: `
    <section class="tela">
      <h2>O que é Angular?</h2>
      <p>
        Angular é uma ferramenta para construir telas de sistema montando
        <strong>peças prontas e padronizadas</strong> — em vez de escrever
        cada tela do zero, repetindo tudo à mão.
      </p>
      <p>
        Pense num navio: ele não é esculpido de um único bloco de aço. É
        <strong>montado</strong> com peças padronizadas que se repetem e se
        encaixam. Angular faz o mesmo com as telas do sistema.
      </p>
      <div class="callout">
        🔎 Este próprio site é feito assim. Cada parte que você vê é uma peça
        Angular — inclusive as abas lá em cima.
      </div>
    </section>
  `,
})
export class IntroComponent {}
