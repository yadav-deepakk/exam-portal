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
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";

import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserDashboardComponent } from "./pages/user/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { SidebarComponent } from "./pages/admin/sidebar/sidebar.component";
import { ProfileComponent } from "./pages/admin/profile/profile.component";
import { WelcomeComponent } from "./pages/admin/welcome/welcome.component";
import { ViewCategoriesComponent } from "./pages/admin/view-categories/view-categories.component";
import { AddCategoryComponent } from "./pages/admin/add-category/add-category.component";
import { QuizComponent } from "./pages/admin/quiz/quiz.component";
import { AddQuizComponent } from "./pages/admin/add-quiz/add-quiz.component";
import { UpdateQuizComponent } from "./pages/admin/update-quiz/update-quiz.component";
import { UpdateCategoryComponent } from "./pages/admin/update-category/update-category.component";
import { QuizQuestionsComponent } from "./pages/admin/quiz-questions/quiz-questions.component";
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { EditQuestionsComponent } from './pages/admin/edit-questions/edit-questions.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        AdminDashboardComponent,
        UserDashboardComponent,
        SidebarComponent,
        ProfileComponent,
        WelcomeComponent,
        ViewCategoriesComponent,
        AddCategoryComponent,
        QuizComponent,
        AddQuizComponent,
        UpdateQuizComponent,
        UpdateCategoryComponent,
        QuizQuestionsComponent,
        AddQuestionsComponent,
        EditQuestionsComponent,
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
        MatListModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTooltipModule,

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
