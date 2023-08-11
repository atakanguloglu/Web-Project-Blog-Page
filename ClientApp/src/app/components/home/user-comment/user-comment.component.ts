import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent {
  @Input() image?: string;
  @Input() comment?: string;
  @Input() username?: string;
  @Input() userInfo?: string;
}
