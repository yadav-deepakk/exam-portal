import { Component } from "@angular/core";
import { SPINNER } from "ngx-ui-loader";
import { SpinnerType } from "ngx-ui-loader/lib/utils/types";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    spinnerTypeSquareJellyBox: SpinnerType = SPINNER.squareJellyBox;
}
