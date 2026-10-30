import { FormControl } from '@angular/forms';
import { exampleStudents, practiceAge, practiceText } from './student';

describe('Practice record validation', () => {
  it('accepts Unicode names at the limit and rejects overlong, blank and control values', () => {
    const control = new FormControl('Á'.repeat(80), practiceText(80));
    expect(control.valid).toBeTrue();
    for (const value of ['x'.repeat(81), '   ', 'Ada\nDemo']) {
      control.setValue(value);
      expect(control.invalid).toBeTrue();
    }
  });
  it('bounds course values independently of names', () => {
    const control = new FormControl('x'.repeat(40), practiceText(40));
    expect(control.valid).toBeTrue();
    control.setValue('x'.repeat(41));
    expect(control.invalid).toBeTrue();
  });
  it('requires an actual whole-number age between 0 and 120', () => {
    const control = new FormControl(0, practiceAge);
    expect(control.valid).toBeTrue();
    control.setValue(120);
    expect(control.valid).toBeTrue();
    for (const value of [-1, 121, 22.5, null, '', '22']) {
      control.setValue(value);
      expect(control.invalid).toBeTrue();
    }
  });
  it('returns fresh fictional fixtures with stable unique identities', () => {
    const first = exampleStudents();
    first[0].firstName = 'Changed';
    const next = exampleStudents();
    expect(next[0].firstName).toBe('Ada');
    expect(new Set(next.map((row) => row.id)).size).toBe(6);
    expect(first).not.toBe(next);
    expect(first[0]).not.toBe(next[0]);
  });
});
