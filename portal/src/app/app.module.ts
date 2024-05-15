import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthService } from "./services/auth.service";
import { JwtAuthInterceptorProvider } from "./services/auth.interceptor";
import { AdminUserGuard, NormalUserGuard, NonLoggedInUserGuard } from "./services/user.guard.guard";

import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";

import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserDashboardComponent } from "./pages/user/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        AdminDashboardComponent,
        UserDashboardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatToolbarModule,
        MatMenuModule,

        HttpClientModule,
    ],
    providers: [
        AuthService,
        JwtAuthInterceptorProvider,
        HttpClientModule,
        MatSnackBar,
        AdminUserGuard,
        NormalUserGuard,
        NonLoggedInUserGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
