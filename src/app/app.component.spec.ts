import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, NoopAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });
  it('creates the real application module', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it('preserves the original project identifier', () => {
    expect(fixture.componentInstance.title).toEqual('my-app');
  });
  it('renders the actual table rather than generated scaffold text', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'Tabla de alumnos'
    );
    expect(fixture.nativeElement.querySelectorAll('tr.mat-row').length).toBe(6);
  });
});
