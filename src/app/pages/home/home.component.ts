import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from '../../shared/services/hotel.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { IHotel } from '../../shared/models/hotel.model';
import { first } from 'rxjs';
import { API_ENDPOINT } from '../../shared/config/api.config';

const listHotelsMock=[
  {
    address: "2135 Truong Van Cu Street, Quận 1, TP. Hồ Chí Minh",
    category: null,
    city: null,
    description: "Hotel Hoa Saigon",
    facilities: [],
    hotelName: "Hotel Hoa Saigon",
    id: 20,
    imageUrl: "http://localhost:3000/public/assets/images/BIM_3871-Edit-990x590-2012.jpeg",
    isActive: false,
    rooms: [],
  },
  {
    address: "23135 Truong Van Cu Street, Quận 1, TP. Hồ Chí Minh",
    category: null,
    city: null,
    description: "Hotel Hoa Saigon",
    facilities: [],
    hotelName: "Hotel Hoa Saigon",
    id: 20,
    imageUrl: "http://localhost:3000/public/assets/images/BIM_3871-Edit-990x590-2012.jpeg",
    isActive: false,
    rooms: [],
  },
  {
    address: "2A35 Truong Van Cu Street, Quận 1, TP. Hồ Chí Minh",
    category: null,
    city: null,
    description: "Hotel Hoa Saigon",
    facilities: [],
    hotelName: "Hotel Hoa Saigon",
    id: 20,
    imageUrl: "http://localhost:3000/public/assets/images/BIM_3871-Edit-990x590-2012.jpeg",
    isActive: false,
    rooms: [],
  },


] 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public mockHotel = listHotelsMock
  ngOnInit(): void {
      
  }
  constructor(){}

  toggleHotel(hotel : IHotel){
    console.log(hotel)
  }

}
