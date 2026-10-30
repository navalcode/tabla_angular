import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';
import { I18nService } from '../i18n.service';
import { StudentEditorComponent } from '../editor/student-editor.component';
import { ConfirmRemoveComponent } from '../editor/confirm-remove.component';
import { TablaComponent } from './tabla.component';

describe('Student table workflows', () => {
  let fixture: ComponentFixture<AppComponent>;
  let table: TablaComponent;
  let dialog: MatDialog;
  let overlay: OverlayContainer;
  let i18n: I18nService;
  const settle = () => {
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  };
  const close = () => {
    dialog.closeAll();
    settle();
  };
  const editor = () =>
    dialog.openDialogs[0].componentInstance as StudentEditorComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, NoopAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    table = fixture.debugElement.query(
      By.directive(TablaComponent)
    ).componentInstance;
    dialog = TestBed.inject(MatDialog);
    overlay = TestBed.inject(OverlayContainer);
    i18n = TestBed.inject(I18nService);
  });
  afterEach(() => {
    dialog.closeAll();
    overlay.ngOnDestroy();
  });

  it('renders meaningful headers and per-record action names', () => {
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('th')
    ) as HTMLElement[];
    expect(headers.map((header) => header.textContent?.trim())).toEqual([
      'ID',
      'Nombre',
      'Apellidos',
      'Edad',
      'Curso',
      'Editar',
      'Eliminar'
    ]);
    expect(
      fixture.nativeElement
        .querySelector('app-edit button')
        .getAttribute('aria-label')
    ).toBe('Editar Ada Demo');
  });
  it('keeps checkbox state and rendered columns in sync', () => {
    const input = fixture.nativeElement.querySelector(
      '[data-column="curso"] input'
    ) as HTMLInputElement;
    expect(input.checked).toBeTrue();
    input.click();
    fixture.detectChanges();
    expect(table.isVisible('curso')).toBeFalse();
    expect(fixture.nativeElement.querySelector('.mat-column-curso')).toBeNull();
    input.click();
    fixture.detectChanges();
    expect(table.displayedColumns).toEqual(table.displayedOriginalColumns);
  });
  it('does not insert an unknown identity and copies valid update data', () => {
    const row = { ...table.dataSource[0] };
    expect(table.updateStudent({ ...row, id: 'missing' })).toBeFalse();
    expect(table.dataSource.length).toBe(6);
    const updated = { ...row, firstName: 'Revised' };
    expect(table.updateStudent(updated)).toBeTrue();
    updated.firstName = 'Later mutation';
    expect(table.dataSource[0].firstName).toBe('Revised');
    expect(table.dataSource[1].firstName).toBe('Leo');
  });
  it('removal is idempotent and an unknown identity changes no rows', () => {
    expect(table.removeStudent('1')).toBeTrue();
    const remaining = table.dataSource;
    expect(table.removeStudent('1')).toBeFalse();
    expect(table.removeStudent('missing')).toBeFalse();
    expect(table.dataSource).toBe(remaining);
    expect(table.dataSource.length).toBe(5);
  });
  it('restores independent fixtures and keeps column choices', fakeAsync(() => {
    table.checkboxChange(false, 'edad');
    table.dataSource[0].firstName = 'Changed';
    table.restoreExamples();
    settle();
    expect(table.dataSource[0].firstName).toBe('Ada');
    expect(table.isVisible('edad')).toBeFalse();
  }));
  it('editing uses a separate draft and cancel does not write', fakeAsync(() => {
    table.editStudent(table.dataSource[0]);
    settle();
    editor().form.controls.firstName.setValue('Draft');
    expect(table.dataSource[0].firstName).toBe('Ada');
    editor().cancel();
    settle();
    expect(table.dataSource[0].firstName).toBe('Ada');
    expect(dialog.openDialogs.length).toBe(0);
  }));
  it('valid editor save preserves ID and updates the actual rendered row', fakeAsync(() => {
    table.editStudent(table.dataSource[0]);
    settle();
    editor().form.patchValue({
      firstName: '  Revised  ',
      age: 24,
      course: 'DAM-B'
    });
    editor().save();
    settle();
    expect(table.dataSource[0]).toEqual({
      id: '1',
      firstName: 'Revised',
      lastName: 'Demo',
      age: 24,
      course: 'DAM-B'
    });
    expect(
      fixture.nativeElement.querySelector('tr.mat-row').textContent
    ).toContain('Revised');
    expect(dialog.openDialogs.length).toBe(0);
  }));
  it('invalid editor save focuses errors and leaves the record unchanged', fakeAsync(() => {
    table.editStudent(table.dataSource[0]);
    settle();
    const component = editor();
    component.form.patchValue({ course: ' ', age: 22.5 });
    component.save();
    settle();
    expect(component.form.invalid).toBeTrue();
    expect(dialog.openDialogs.length).toBe(1);
    expect(table.dataSource[0].course).toBe('DAM-A');
    expect(
      overlay.getContainerElement().querySelectorAll('.error-summary li').length
    ).toBe(2);
    expect(
      document.activeElement?.classList.contains('error-summary')
    ).toBeTrue();
    close();
  }));
  it('language switches keep draft, errors and column selection', fakeAsync(() => {
    table.checkboxChange(false, 'edad');
    table.editStudent(table.dataSource[0]);
    settle();
    const component = editor();
    component.form.patchValue({ firstName: 'Draft', course: '' });
    component.save();
    settle();
    i18n.setLanguage('en');
    settle();
    expect(component.form.controls.firstName.value).toBe('Draft');
    expect(table.isVisible('edad')).toBeFalse();
    expect(overlay.getContainerElement().textContent).toContain(
      'Check the highlighted fields.'
    );
    component.cancel();
    settle();
  }));
  it('confirmation cancel leaves the record in the table', fakeAsync(() => {
    table.confirmRemove(table.dataSource[0]);
    settle();
    const component = dialog.openDialogs[0]
      .componentInstance as ConfirmRemoveComponent;
    expect(overlay.getContainerElement().textContent).toContain('Ada Demo');
    component.dialog.close(false);
    settle();
    expect(table.dataSource.length).toBe(6);
  }));
  it('confirmation removes just its intended record and announces the result', fakeAsync(() => {
    table.confirmRemove(table.dataSource[1]);
    settle();
    (
      dialog.openDialogs[0].componentInstance as ConfirmRemoveComponent
    ).dialog.close(true);
    settle();
    expect(table.dataSource.map((row) => row.id)).toEqual([
      '1',
      '3',
      '4',
      '5',
      '6'
    ]);
    expect(
      fixture.nativeElement.querySelector('[role=status]').textContent
    ).toContain('Leo Ejemplo');
  }));
  it('empty state can restore all examples', fakeAsync(() => {
    for (const row of [...table.dataSource]) table.removeStudent(row.id);
    settle();
    expect(fixture.nativeElement.querySelector('#empty-title')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    table.restoreExamples();
    settle();
    expect(fixture.nativeElement.querySelectorAll('tr.mat-row').length).toBe(6);
    expect(fixture.nativeElement.querySelector('#empty-title')).toBeNull();
  }));
});
