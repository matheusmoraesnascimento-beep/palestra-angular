import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IntroComponent } from './secoes/intro.component';
import { ComponenteLegoComponent } from './secoes/componente-lego.component';
import { TrioComponent } from './secoes/trio.component';
import { ComparacaoComponent } from './secoes/comparacao.component';
import { DadosVivosComponent } from './secoes/dados-vivos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule,
    IntroComponent, ComponenteLegoComponent,
    TrioComponent, ComparacaoComponent, DadosVivosComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
