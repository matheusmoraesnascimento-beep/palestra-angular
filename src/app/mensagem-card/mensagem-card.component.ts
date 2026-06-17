import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mensagem, rotuloPrioridade } from '../mensagem';

@Component({
  selector: 'app-mensagem-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagem-card.component.html',
  styleUrl: './mensagem-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensagemCardComponent {
  @Input({ required: true }) mensagem!: Mensagem;
  readonly rotulo = rotuloPrioridade;
}
