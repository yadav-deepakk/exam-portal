import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwt = this.authService.getSavedJwt();
        if (jwt) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${jwt}` },
            });
        }
        // console.log("outgoing http request: ", request);
        return next.handle(request);
    }
}

export const JwtAuthInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtAuthInterceptor,
        multi: true,
    },
];
