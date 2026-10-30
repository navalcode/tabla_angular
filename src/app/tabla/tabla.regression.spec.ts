import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TablaComponent } from './tabla.component';

describe('Table column contracts', () => {
  let component: TablaComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', ['open'])
        }
      ]
    });
    TestBed.overrideTemplate(TablaComponent, '');
    component = TestBed.createComponent(TablaComponent).componentInstance;
  });
  it('restores canonical order when another earlier column stays hidden', () => {
    component.checkboxChange(false, 'edad');
    component.checkboxChange(false, 'curso');
    component.checkboxChange(true, 'curso');
    expect(component.displayedColumns).toEqual(
      component.displayedOriginalColumns.filter((id) => id !== 'edad')
    );
  });
  it('checking an already visible column is idempotent', () => {
    component.checkboxChange(true, 'id');
    expect(component.displayedColumns).toEqual(
      component.displayedOriginalColumns
    );
  });
  it('unchecking an already hidden column leaves the others untouched', () => {
    component.checkboxChange(false, 'edad');
    const expected = [...component.displayedColumns];
    component.checkboxChange(false, 'edad');
    expect(component.displayedColumns).toEqual(expected);
  });
  it('unknown column IDs cannot remove a valid column', () => {
    component.checkboxChange(false, 'missing');
    expect(component.displayedColumns).toEqual(
      component.displayedOriginalColumns
    );
  });
  it('retains a data column when all data checkboxes are unchecked', () => {
    for (const id of ['id', 'nombre', 'apellidos', 'edad', 'curso'])
      component.checkboxChange(false, id);
    expect(
      component.displayedColumns.some((id) =>
        ['id', 'nombre', 'apellidos', 'edad', 'curso'].includes(id)
      )
    ).toBeTrue();
  });
});
