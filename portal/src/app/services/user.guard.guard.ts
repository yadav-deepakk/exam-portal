import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AvailableRoutes, UserRolesEnum } from "../app.enum";

@Injectable()
export class AdminUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.checkUserHasRole(UserRolesEnum.ADMIN.toString())) return true;
        if (this.authService.checkUserHasRole(UserRolesEnum.NORMAL.toString()))
            this.router.navigate([AvailableRoutes.UserDashboard]);
        if (!this.authService.isUserLoggedIn()) this.router.navigate([AvailableRoutes.Login]);
        return false;
    }
}

@Injectable()
export class NormalUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.checkUserHasRole(UserRolesEnum.NORMAL.toString())) return true;
        if (this.authService.checkUserHasRole(UserRolesEnum.ADMIN.toString()))
            this.router.navigate([AvailableRoutes.AdminDashboard]);
        if (!this.authService.isUserLoggedIn()) this.router.navigate([AvailableRoutes.Login]);
        return false;
    }
}

@Injectable()
export class NonLoggedInUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isUserLoggedIn()) return true;
        if (this.authService.checkUserHasRole(UserRolesEnum.ADMIN.toString()))
            this.router.navigate([AvailableRoutes.AdminDashboard]);
        if (this.authService.checkUserHasRole(UserRolesEnum.NORMAL.toString()))
            this.router.navigate([AvailableRoutes.UserDashboard]);
        return false;
    }
}
