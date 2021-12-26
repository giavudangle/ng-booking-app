import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthenticationService {
    constructor(private readonly http : HttpClient){

    }


    async login(email : string, password : string){
        console.log(email,password)
    }
}