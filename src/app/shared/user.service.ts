import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  
  readonly BaseURI = 'http://localhost:52135/api';

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

    if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
      if (passwordControl.value != confirmPasswordControl.value)
        confirmPasswordControl.setErrors({ passwordMismatch: true })
      else
        confirmPasswordControl.setErrors(null);
    }
  }

  register() {
    var body = {
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
      ConfirmPassword: this.formModel.value.Passwords.ConfirmPassword,
      MobileNo: this.formModel.value.MobileNo,
      Address: this.formModel.value.Address
    };
    return this.http.post(this.BaseURI+'/users/register', body);
  }
}
