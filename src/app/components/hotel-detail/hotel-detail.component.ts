import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ENDPOINT } from '../../shared/config/api.config';
import { IHotel } from '../../shared/models/hotel.model';
import { HotelService } from '../../shared/services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotelDetail! : IHotel;

  constructor(
    private readonly router : Router,
    private readonly activatedRoute : ActivatedRoute,
    private readonly hotelService : HotelService
    ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.hotelService.getHotelById(parseInt(id!)) 
    .subscribe(item => {
      item.imageUrl = `${API_ENDPOINT}/${item.imageUrl}`,
      this.hotelDetail = item
    })
  }

}
