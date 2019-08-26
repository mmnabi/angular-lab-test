import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private formBuilder: FormBuilder) { }


  formModel = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.formBuilder.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords }),
    MobileNo: ['', Validators.required],
    Address: ['', Validators.required]
  })

  comparePasswords(fb: FormGroup) {
    let confirmPasswordControl = fb.get('ConfirmPassword');
    let passwordControl = fb.get('Password');

    if(confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors){
      if(passwordControl.value != confirmPasswordControl.value)
      confirmPasswordControl.setErrors({passwordMismatch: true})
      else
      confirmPasswordControl.setErrors(null);
    }
  }
}
