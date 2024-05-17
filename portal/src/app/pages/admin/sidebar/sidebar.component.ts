import { Component } from "@angular/core";
import { AvailableRoutes } from "src/app/app.enum";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
    appRoutes = AvailableRoutes;
}
