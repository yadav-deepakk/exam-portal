import { Component, OnInit } from "@angular/core";
import { UserDetail } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    user: UserDetail | null = null;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        try {
            this.authService.getCurrentUser().subscribe(
                (data: UserDetail) => {
                    console.log(data);
                    this.user = data;
                },
                (error) => {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "unable to load profile data",
                        timer: 1500,
                    });
                }
            );
        } catch (error) {
            console.log(error);
            this.user = this.authService.getCurrentSavedUser();
        }
    }
}
