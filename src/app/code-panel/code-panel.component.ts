import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-panel.component.html',
  styleUrl: './code-panel.component.scss',
})
export class CodePanelComponent {
  @Input() titulo = '';
  @Input() codigo = '';
  @Input() linhas?: number;
}
