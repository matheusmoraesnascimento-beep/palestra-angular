import { Component, signal } from '@angular/core';
import { IntroComponent } from './secoes/intro.component';
import { AnatomiaComponent } from './secoes/anatomia.component';
import { SemComComponent } from './secoes/sem-com.component';
import { ComponenteLegoComponent } from './secoes/componente-lego.component';
import { DadosVivosComponent } from './secoes/dados-vivos.component';
import { SpaComponent } from './secoes/spa.component';
import { EncerramentoComponent } from './secoes/encerramento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IntroComponent, AnatomiaComponent, ComponenteLegoComponent, SemComComponent,
    DadosVivosComponent, SpaComponent, EncerramentoComponent,
  ],
  template: `
    <header class="topo">
      <div class="marca">
        <div class="logo">A</div>
        <span class="titulo">Angular na prática</span>
      </div>
      <nav class="nav" aria-label="Seções">
        @for (a of abas; track a.id) {
          <button class="tab" [class.on]="aba() === a.id" (click)="ir(a.id)">{{ a.nome }}</button>
        }
      </nav>
      <div class="autor">por <strong>1T(RM2-T) Moraes</strong></div>
    </header>

    <main>
      @switch (aba()) {
        @case ('inicio') { <app-intro (ir)="ir($event)"></app-intro> }
        @case ('anatomia') { <app-anatomia></app-anatomia> }
        @case ('componente') { <app-componente-lego></app-componente-lego> }
        @case ('semcom') { <app-sem-com></app-sem-com> }
        @case ('dados') { <app-dados-vivos></app-dados-vivos> }
        @case ('spa') { <app-spa></app-spa> }
        @case ('fim') { <app-encerramento (ir)="ir($event)"></app-encerramento> }
      }
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly abas = [
    { id: 'inicio', nome: 'Início' },
    { id: 'anatomia', nome: 'Anatomia' },
    { id: 'componente', nome: 'Componente' },
    { id: 'semcom', nome: 'Sem × Com Angular' },
    { id: 'dados', nome: 'Dados vivos' },
    { id: 'spa', nome: 'Uma página só' },
    { id: 'fim', nome: 'Fim' },
  ];
  readonly aba = signal('inicio');

  ir(id: string) {
    this.aba.set(id);
    window.scrollTo({ top: 0 });
  }
}
