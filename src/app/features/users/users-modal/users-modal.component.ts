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
  
  close(): void {
    this.ref.close();
  }
}