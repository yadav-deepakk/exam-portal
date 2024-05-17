import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AvailableRoutes, UserRolesEnum } from "src/app/app.enum";
import { UserDetail } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
    appRoutes = AvailableRoutes;
    loggedIn: boolean = false;
    user: UserDetail | null = null;

    constructor(public authService: AuthService, public router: Router) {}

    ngOnInit(): void {
        this.loggedIn = this.authService.isUserLoggedIn();
        this.user = this.authService.getCurrentSavedUser();

        this.authService.loginStatusSubject.asObservable().subscribe((data) => {
            this.loggedIn = this.authService.isUserLoggedIn();
            this.user = this.authService.getCurrentSavedUser();
        });
    }

    navigateToDashBoard(): void {
        if (this.loggedIn) {
            this.router.navigate([
                this.authService.checkUserHasRole(UserRolesEnum.ADMIN.toString())
                    ? this.appRoutes.AdminDashboard
                    : this.appRoutes.UserDashboard,
            ]);
        } else this.router.navigate([this.appRoutes.Login]);
    }

    logoutUser(): void {
        this.authService.logoutUser();
        this.authService.loginStatusSubject.next(false);
        window.location.href = "/login";
    }
}
