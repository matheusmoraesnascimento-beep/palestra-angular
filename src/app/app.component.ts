import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './secoes/intro.component';
import { ComponenteLegoComponent } from './secoes/componente-lego.component';
import { TrioComponent } from './secoes/trio.component';
import { ComparacaoComponent } from './secoes/comparacao.component';
import { DadosVivosComponent } from './secoes/dados-vivos.component';

type SecaoId = 'intro' | 'componente' | 'trio' | 'comparacao' | 'dados';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, IntroComponent, ComponenteLegoComponent,
    TrioComponent, ComparacaoComponent, DadosVivosComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly abas: { id: SecaoId; rotulo: string }[] = [
    { id: 'intro', rotulo: 'Início' },
    { id: 'componente', rotulo: 'Componente' },
    { id: 'trio', rotulo: 'Trio HTML/SCSS/TS' },
    { id: 'comparacao', rotulo: 'Com vs Sem' },
    { id: 'dados', rotulo: 'Dados Vivos' },
  ];
  readonly secao = signal<SecaoId>('intro');
  ir(id: SecaoId): void { this.secao.set(id); }
}
