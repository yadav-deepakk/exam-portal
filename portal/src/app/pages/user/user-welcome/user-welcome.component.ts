import { Component, OnInit } from "@angular/core";
import { UserDetail } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-user-welcome",
    templateUrl: "./user-welcome.component.html",
    styleUrls: ["./user-welcome.component.css"],
})
export class UserWelcomeComponent implements OnInit {
    user: UserDetail | null = null;
    constructor(private userSer: AuthService) {}
    ngOnInit(): void {
        this.user = this.userSer.getCurrentSavedUser();
    }
}
