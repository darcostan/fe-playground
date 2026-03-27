import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.scss'
})
export class ReactiveForms {
  submitted = signal(false);
  formValue = signal<any>(null);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      role: ['developer', Validators.required],
      bio: ['', Validators.maxLength(200)],
      skills: this.fb.array([
        this.fb.control('Angular', Validators.required),
        this.fb.control('TypeScript', Validators.required),
      ]),
      newsletter: [false],
    });
  }

  get skills(): FormArray { return this.form.get('skills') as FormArray; }
  get nameCtrl() { return this.form.get('name'); }
  get emailCtrl() { return this.form.get('email'); }
  get ageCtrl() { return this.form.get('age'); }

  addSkill() { this.skills.push(this.fb.control('', Validators.required)); }
  removeSkill(i: number) { this.skills.removeAt(i); }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.set(true);
      this.formValue.set(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  reset() {
    this.form.reset({ role: 'developer', newsletter: false });
    this.submitted.set(false);
    this.formValue.set(null);
  }
}
