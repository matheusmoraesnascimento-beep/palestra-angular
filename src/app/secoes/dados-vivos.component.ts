import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Rota = 'inicio' | 'sobre' | 'contato';

interface Pagina {
  titulo: string;
  texto: string;
}

const PAGINAS: Record<Rota, Pagina> = {
  inicio: { titulo: 'Início', texto: 'Bem-vindo ao nosso site. Este é o conteúdo da página inicial.' },
  sobre: { titulo: 'Sobre', texto: 'Somos uma equipe pequena que adora ensinar Angular na prática.' },
  contato: { titulo: 'Contato', texto: 'Fale com a gente: contato@meusite.com' },
};

@Component({
  selector: 'app-dados-vivos',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <section class="tela">
      <h2>Uma página só: o que o Angular muda</h2>
      <p>
        No site <strong>tradicional</strong>, cada clique num link busca uma página
        nova no servidor — a tela toda recarrega. No <strong>SPA</strong> (Single Page
        Application), o Angular carrega a página <strong>uma vez</strong> e depois só
        troca o pedaço que muda. Clique nos links dos dois navegadores e compare.
      </p>

      <div class="mocks">
        <!-- Lado tradicional -->
        <div class="mock">
          <div class="rotulo tradicional">Site tradicional (sem SPA)</div>
          <div class="janela">
            <div class="barra-nav">
              <span class="pontos"><i></i><i></i><i></i></span>
              <span class="url">sigdem.mb/{{ rotaTrad }}</span>
            </div>
            <nav class="links">
              <button *ngFor="let r of rotas"
                      [class.ativo]="r === rotaTrad"
                      (click)="irTradicional(r)">{{ paginas[r].titulo }}</button>
            </nav>
            <div class="conteudo">
              <h3>{{ paginas[rotaTrad].titulo }}</h3>
              <p>{{ paginas[rotaTrad].texto }}</p>
            </div>
            <div class="flash" *ngIf="carregandoTrad">
              <mat-icon class="girando">autorenew</mat-icon>
            </div>
          </div>
          <div class="metrica ruim">
            <mat-icon>refresh</mat-icon> Recarregou {{ reloads }} vez(es)
          </div>
        </div>

        <!-- Lado SPA -->
        <div class="mock">
          <div class="rotulo spa">Angular (SPA)</div>
          <div class="janela">
            <div class="barra-nav">
              <span class="pontos"><i></i><i></i><i></i></span>
              <span class="url">sigad.mb/{{ rotaSpa }}</span>
            </div>
            <nav class="links">
              <button *ngFor="let r of rotas"
                      [class.ativo]="r === rotaSpa"
                      (click)="irSpa(r)">{{ paginas[r].titulo }}</button>
            </nav>
            <div class="conteudo">
              <h3>{{ paginas[rotaSpa].titulo }}</h3>
              <p>{{ paginas[rotaSpa].texto }}</p>
            </div>
          </div>
          <div class="metrica bom">
            <mat-icon>bolt</mat-icon> Carregou 1 vez
          </div>
        </div>
      </div>

      <div class="callout">
        🚀 O Angular baixa <strong>1 HTML</strong> uma vez. O <strong>Router</strong>
        troca as telas no próprio navegador, em JavaScript, sem voltar ao servidor a
        cada clique. Por isso a navegação é instantânea — parece um app.
      </div>
    </section>
  `,
  styles: [`
    .mocks { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin: 1.5rem 0; }
    .mock { display: flex; flex-direction: column; gap: .6rem; }
    .rotulo { font-weight: 600; text-align: center; padding: .35rem; border-radius: 8px; }
    .rotulo.tradicional { background: #fee2e2; color: #b91c1c; }
    .rotulo.spa { background: #dcfce7; color: #15803d; }
    .janela { position: relative; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 14px rgba(0,0,0,.06); }
    .barra-nav { display: flex; align-items: center; gap: .6rem; padding: .5rem .8rem; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; }
    .pontos { display: flex; gap: .3rem; }
    .pontos i { width: 10px; height: 10px; border-radius: 50%; background: #cbd5e1; }
    .url { font-family: monospace; font-size: .85rem; color: #475569; background: #fff; padding: .15rem .6rem; border-radius: 6px; border: 1px solid #e2e8f0; flex: 1; }
    .links { display: flex; gap: .4rem; padding: .6rem .8rem; border-bottom: 1px solid #f1f5f9; }
    .links button { border: none; background: #f8fafc; color: #334155; padding: .35rem .8rem; border-radius: 6px; cursor: pointer; font-size: .9rem; }
    .links button.ativo { background: #2563eb; color: #fff; }
    .conteudo { padding: 1.2rem; min-height: 120px; }
    .conteudo h3 { margin: 0 0 .5rem; }
    .flash { position: absolute; inset: 0; background: #fff; display: flex; align-items: center; justify-content: center; animation: piscar .6s ease; }
    .girando { animation: girar .8s linear infinite; color: #b91c1c; }
    @keyframes piscar { 0% { opacity: 1; } 100% { opacity: 1; } }
    @keyframes girar { to { transform: rotate(360deg); } }
    .metrica { display: flex; align-items: center; justify-content: center; gap: .4rem; font-weight: 600; }
    .metrica mat-icon { font-size: 1.1rem; height: 1.1rem; width: 1.1rem; }
    .metrica.ruim { color: #b91c1c; }
    .metrica.bom { color: #15803d; }
  `],
})
export class DadosVivosComponent {
  readonly rotas: Rota[] = ['inicio', 'sobre', 'contato'];
  readonly paginas = PAGINAS;

  rotaTrad: Rota = 'inicio';
  rotaSpa: Rota = 'inicio';
  carregandoTrad = false;
  reloads = 0;

  irTradicional(rota: Rota): void {
    if (this.carregandoTrad) { return; }
    this.carregandoTrad = true;
    setTimeout(() => {
      this.rotaTrad = rota;
      this.reloads++;
      this.carregandoTrad = false;
    }, 600);
  }

  irSpa(rota: Rota): void {
    this.rotaSpa = rota;
  }
}
