import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { UserDashboardComponent } from "./pages/user/user-dashboard/user-dashboard.component";
import { AdminUserGuard, NormalUserGuard, NonLoggedInUserGuard } from "./services/user.guard.guard";
import { AvailableRoutes } from "./app.enum";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { ProfileComponent } from "./pages/admin/profile/profile.component";
import { WelcomeComponent } from "./pages/admin/welcome/welcome.component";

const routes: Routes = [
    {
        path: AvailableRoutes.Root,
        pathMatch: "full",
        component: HomeComponent,
    },
    {
        path: AvailableRoutes.Home,
        pathMatch: "full",
        component: HomeComponent,
    },
    {
        path: AvailableRoutes.AdminDashboard,
        component: AdminDashboardComponent,
        canActivate: [AdminUserGuard],
        children: [
            { path: "", component: WelcomeComponent },
            { path: "profile", component: ProfileComponent },
        ],
    },
    {
        path: AvailableRoutes.UserDashboard,
        pathMatch: "full",
        component: UserDashboardComponent,
        canActivate: [NormalUserGuard],
    },
    {
        path: AvailableRoutes.Signup,
        pathMatch: "full",
        component: SignupComponent,
        canActivate: [NonLoggedInUserGuard],
    },
    {
        path: AvailableRoutes.Login,
        pathMatch: "full",
        component: LoginComponent,
        canActivate: [NonLoggedInUserGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
