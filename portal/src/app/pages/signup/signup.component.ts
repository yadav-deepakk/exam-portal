import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public hide = true;
  public waitForRespose = false;

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

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

    // show loader and disable button to prevent resend.
    this.waitForRespose = !this.waitForRespose;
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('User creation has been done successfully.', 'OK');
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Some error occured.', 'Cancel');
      }
    );
    // hide loader and enable button.
    this.waitForRespose = !this.waitForRespose;
  }
}
