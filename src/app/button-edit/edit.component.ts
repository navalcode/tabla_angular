import { Component, EventEmitter, Input, Output } from '@angular/core';
import { I18nService } from '../i18n.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditButton {
  @Input() label = '';
  @Output() action = new EventEmitter<HTMLElement>();
  constructor(public i18n: I18nService) {}
  trigger(event: Event): void {
    this.action.emit(event.currentTarget as HTMLElement);
  }
}
