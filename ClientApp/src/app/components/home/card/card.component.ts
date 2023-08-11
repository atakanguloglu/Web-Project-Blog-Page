import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() renderStyle?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() image?: string;
  @Input() buttonText?: string;
  @Input() isQuizXPlus?: string;
  @Input() isguides?: string;
}
