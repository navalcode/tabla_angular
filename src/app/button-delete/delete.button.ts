import { Component, EventEmitter, Input, Output } from '@angular/core';
import { I18nService } from '../i18n.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteButton {
  @Input() label = '';
  @Output() action = new EventEmitter<HTMLElement>();
  constructor(public i18n: I18nService) {}
  trigger(event: Event): void {
    this.action.emit(event.currentTarget as HTMLElement);
  }
}
