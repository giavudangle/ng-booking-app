import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ROUTING_PATH } from "../enums/app-routing.enum";
import { AuthenticationService } from "../services/auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router : Router,
        private authService : AuthenticationService
    ){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const user = this.authService.getUserValue;
        if(user){
            return true;
        }
        this.router.navigate([ROUTING_PATH.LOGIN],{
            queryParams:{
                returnUrl : state.url
            }
        })
        return false;
    }
    
}