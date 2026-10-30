import { Component } from '@angular/core';
import { I18nService } from './i18n.service';

@Component({
  selector: 'app-language-switch',
  template: `
    <div class="languages" role="group" [attr.aria-label]="i18n.t('language')">
      <button
        type="button"
        lang="es"
        [attr.aria-pressed]="i18n.language === 'es'"
        (click)="i18n.setLanguage('es')"
      >
        ES
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        lang="en"
        [attr.aria-pressed]="i18n.language === 'en'"
        (click)="i18n.setLanguage('en')"
      >
        EN
      </button>
    </div>
  `
})
export class LanguageSwitchComponent {
  constructor(public i18n: I18nService) {}
}
