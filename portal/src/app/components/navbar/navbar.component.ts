import { Component, OnInit } from "@angular/core";
import { UserDetail } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
    loggedIn: boolean = false;
    user: UserDetail | null = null;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.loggedIn = this.authService.isUserLoggedIn();
        this.user = this.authService.getCurrentSavedUser();

        this.authService.loginStatusSubject.asObservable().subscribe((data) => {
            this.loggedIn = this.authService.isUserLoggedIn();
            this.user = this.authService.getCurrentSavedUser();
        });
    }

    logoutUser() {
        this.authService.logoutUser();
        this.authService.loginStatusSubject.next(false);
        window.location.href = "/login";
    }
}
