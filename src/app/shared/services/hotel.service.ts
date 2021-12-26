import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry } from "rxjs";
import { API_ENDPOINT, API_ROUTING } from "../config/api.config";
import { IHotel } from "../models/hotel.model";

@Injectable()
export class HotelService {
    constructor(private readonly http : HttpClient){

    }

    getAllHotels() : Observable<IHotel[]>{
        return this.http.get<IHotel[]>(`${API_ENDPOINT}${API_ROUTING.HOTEL}`)
    }
}