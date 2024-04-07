import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public hide = true;

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSignUpSubmit() {
    if (
      this.user.userName === null ||
      this.user.password == null ||
      this.user.firstName == null ||
      this.user.lastName == null ||
      this.user.email == null ||
      this.user.phone == null ||
      this.user.userName === '' ||
      this.user.password == '' ||
      this.user.firstName == '' ||
      this.user.lastName == '' ||
      this.user.email == '' ||
      this.user.phone == ''
    ) {
      this.snackBar.open('Fields can not be empty or null', 'Cancel');
      console.log('fields can not be empty or null.');
      return;
    }
    console.log('submitting sign up details...');
    console.log(this.user);
  }
}
