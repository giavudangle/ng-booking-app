import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable,map } from "rxjs";
import { API_ENDPOINT, API_ROUTING } from "../config/api.config";
import { httpOptions } from "../config/http.config";
import { APP_CONFIG } from "../enums/app.enum";
import { IUser } from "../models/user.model";

@Injectable({providedIn:'root'})
export class AuthenticationService {
    private userSubject : BehaviorSubject<IUser | any>;
    public userOservable! : Observable<IUser>;

    constructor(private readonly http : HttpClient){
        const userInLocalStorage = JSON.parse(localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_USER) as any)
        this.userSubject = new BehaviorSubject<IUser>(userInLocalStorage)
        this.userOservable = this.userSubject.asObservable();
    }

    public get getUserValue() : IUser{
        return this.userSubject!.value;
    }

    register(name: string, email:string,password: string){
        return this.http.post(`${API_ENDPOINT}${API_ROUTING.AUTHENTICATION}/register`,{
            name,
            email,
            password
        })
    }

    login(email : string, password : string){
        return this.http.post<IUser>(`${API_ENDPOINT}${API_ROUTING.AUTHENTICATION}/login`,{email,password})
        .pipe(map(user => {
            localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_USER,JSON.stringify(user))
            this.userSubject!.next(user)
            return user;
        }))
    }

    logout(){
        return this.http.post<IUser>(`${API_ENDPOINT}${API_ROUTING.AUTHENTICATION}/login`,{}) 
        .pipe(map(_ => {
            localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_USER)
            this.userSubject!.next(null)
        }))
    }
}