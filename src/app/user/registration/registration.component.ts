import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.userId > 0)
          this.service.formModel.reset();
        else {
          res.errors.forEach(element => {
            console.log(element);
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
