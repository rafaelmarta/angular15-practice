import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { IUser } from 'src/app/shared/user/user.model';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  @Output() submitUser = new EventEmitter<IUser>();
  
  userForm: FormGroup = this.formBuilder.group({});
  
  constructor(
    private formBuilder: FormBuilder,
    protected ref: NbDialogRef<UsersModalComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      accessProfile: ['', [Validators.required]],
      languages: [[], [Validators.required]],
      preferredContact: ['email', [Validators.required]]
    });
  }
  
  submitForm(): void {
    if (this.userForm.valid) {
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