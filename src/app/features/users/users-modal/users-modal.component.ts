import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { IUser } from 'src/app/shared/user/user.model';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  @Input() user?: IUser;
  @Output() submitUser = new EventEmitter<IUser>();
  
  userForm: FormGroup = this.formBuilder.group({});
  formSubmitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    protected ref: NbDialogRef<UsersModalComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        lastname: this.user.lastname,
        phone: this.user.phone || '',
        email: this.user.email,
        accessProfile: this.user.accessProfile,
        languages: this.user.languages,
        preferredContact: this.user.preferredContact,
      })

      this.userForm.get('email')?.disable();
    }
  }
  
  initForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      accessProfile: ['', [Validators.required]],
      languages: [[], [Validators.required]],
      preferredContact: ['email', [Validators.required]]
    });
  }
  
  submitForm(): void {
    if (this.userForm.valid) {
      if (this.user && this.userForm.get('email')?.disabled) {
        const formValue = this.userForm.getRawValue();
        this.ref.close(formValue);        
      }
      this.ref.close(this.userForm.value)
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }
  
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.formSubmitted)
  }

  formatPhoneNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.length <= 2) {
        value = `${value}`;
      } else if (value.length <= 7) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      } else {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
      }
    }

    this.userForm.get('phone')?.setValue(value, { emitEvent: false });
    input.value = value;
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);

    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (control.errors['email']) {
      return 'E-mail inválido'
    }

    return 'Campo inválido'
  }
  
  close(): void {
    this.ref.close();
  }
}