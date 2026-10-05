import { Component, HostListener, signal } from '@angular/core';
import { IntroComponent } from './secoes/intro.component';
import { AnatomiaComponent } from './secoes/anatomia.component';
import { SemComComponent } from './secoes/sem-com.component';
import { ComponenteLegoComponent } from './secoes/componente-lego.component';
import { SpaComponent } from './secoes/spa.component';
import { EncerramentoComponent } from './secoes/encerramento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IntroComponent, AnatomiaComponent, ComponenteLegoComponent, SemComComponent,
    SpaComponent, EncerramentoComponent,
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
        @case ('componente') { <app-componente-lego></app-componente-lego> }
        @case ('anatomia') { <app-anatomia></app-anatomia> }
        @case ('semcom') { <app-sem-com></app-sem-com> }
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
    { id: 'componente', nome: 'Componente' },
    { id: 'anatomia', nome: 'Anatomia' },
    { id: 'semcom', nome: 'Antes × Depois' },
    { id: 'spa', nome: 'Uma página só' },
    { id: 'fim', nome: 'Fim' },
  ];
  readonly aba = signal('inicio');

  @HostListener('document:keydown', ['$event'])
  teclado(e: KeyboardEvent) {
    const alvo = e.target as HTMLElement;
    if (e.altKey || e.ctrlKey || e.metaKey || alvo.closest('input, textarea, select, [contenteditable]')) return;
    const passo = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!passo) return;
    const i = this.abas.findIndex(a => a.id === this.aba()) + passo;
    if (i >= 0 && i < this.abas.length) this.ir(this.abas[i].id);
  }

  ir(id: string) {
    this.aba.set(id);
    window.scrollTo({ top: 0 });
  }
}
