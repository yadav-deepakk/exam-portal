import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
    public hide = true;

    public user = {
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    };

    constructor(private snackBar: MatSnackBar, private userService: UserService) {}

    ngOnInit(): void {}

    onSignUpSubmit() {
        if (
            this.user.userName == null ||
            this.user.password == null ||
            this.user.firstName == null ||
            this.user.lastName == null ||
            this.user.email == null ||
            this.user.phone == null ||
            this.user.userName == "" ||
            this.user.password == "" ||
            this.user.firstName == "" ||
            this.user.lastName == "" ||
            this.user.email == "" ||
            this.user.phone == ""
        ) {
            console.log("fields can not be empty or null.");
            this.snackBar.open("Fields can not be empty or null", "Cancel", { duration: 2000 });
            return;
        }
        console.log("submitting sign up details...");
        console.log(this.user);

        this.userService.createUser(this.user).subscribe(
            (data) => {
                console.log(data);
                // this.snackBar.open("User creation has been done successfully.", "OK", { duration: 2000 });
                Swal.fire({
                    title: "Success",
                    text: "User creation has been done successfully.",
                    icon: "success",
                });
            },
            (error) => {
                console.log(error);
                // this.snackBar.open("Some error occured.", "Cancel", { duration: 2000 });
                Swal.fire({
                    icon: "error",
                    title: "Error in user creation",
                    text: "Something went wrong!",
                    footer: "Username may have already taken Or service may be down",
                });
            }
        );
    }
}
