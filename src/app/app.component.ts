import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { IntroComponent } from './secoes/intro.component';
import { ComponenteLegoComponent } from './secoes/componente-lego.component';
import { TrioComponent } from './secoes/trio.component';
import { ComparacaoComponent } from './secoes/comparacao.component';
import { DadosVivosComponent } from './secoes/dados-vivos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule, MatTabsModule, MatIconModule,
    IntroComponent, ComponenteLegoComponent,
    TrioComponent, ComparacaoComponent, DadosVivosComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
