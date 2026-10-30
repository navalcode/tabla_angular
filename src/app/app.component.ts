import { Component } from '@angular/core';
import { I18nService } from './i18n.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(public i18n: I18nService) {}
}
