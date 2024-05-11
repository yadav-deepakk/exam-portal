import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtResponse } from "src/app/models/jwt-response";
import { LogInRequest } from "src/app/models/login-req";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    public hidePassword: boolean = true;
    public loginFormData: LogInRequest = {
        username: "",
        password: "",
    };

    constructor(private snackBar: MatSnackBar, private authService: AuthService) {}

    ngOnInit(): void {}

    onLoginFormSubmit(): void {
        // validate form...
        let isLoginFormValid: boolean = true; // this.validateLoginForm();
        if (!isLoginFormValid) return;

        // submit form...
        console.log("login form submitted...");
        console.log(this.loginFormData);
        this.authService.logInUser(this.loginFormData).subscribe(
            (data: JwtResponse) => {
                console.log(data);
                // this.snackBar.open("User logged in successfully.", "OK", { duration: 2000 });
                Swal.fire({
                    title: "Success",
                    text: "User logged in successfully.",
                    icon: "success",
                });
            },
            (error: any) => {
                console.log(error);
                // this.snackBar.open("Some error occured.", "Cancel", { duration: 2000 });
                Swal.fire({
                    icon: "error",
                    title: "Error in user login",
                    text: "Something went wrong!",
                });
            }
        );
    }

    validateLoginForm(): boolean {
        // null checks
        if (
            this.loginFormData.username == null ||
            this.loginFormData.password == null ||
            this.loginFormData.username == "" ||
            this.loginFormData.password == ""
        ) {
            this.snackBar.open("All Fields are mandatory.", "OK", { duration: 5000 });
            return false;
        }

        // username: 3<len<255
        const usernameRegex: RegExp = /^[a-zA-Z0-9_]{3,255}$/;
        if (!usernameRegex.test(this.loginFormData.username.valueOf())) {
            this.snackBar.open("Username should be 3 to 255 characters long.", "OK", {
                duration: 5000,
            });
            return false;
        }

        // password: 6<len<255
        const passLen: number = this.loginFormData.password.length;
        if (passLen < 6 || passLen > 255) {
            this.snackBar.open("Password must be 6 to 255 characters long.", "OK", {
                duration: 3000,
            });
            return false;
        }

        return true;
    }
}
