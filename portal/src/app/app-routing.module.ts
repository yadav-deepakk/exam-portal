import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
    { path: "", pathMatch: "full", component: HomeComponent },
    { path: "home", pathMatch: "full", component: HomeComponent },
    { path: "signup", pathMatch: "full", component: SignupComponent },
    { path: "login", pathMatch: "full", component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
