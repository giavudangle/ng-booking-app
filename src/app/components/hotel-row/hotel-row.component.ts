import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHotel } from '../../shared/models/hotel.model';

@Component({
  selector: 'app-hotel-row',
  templateUrl: './hotel-row.component.html',
  styleUrls: ['./hotel-row.component.css']
})
export class HotelRowComponent implements OnInit {
  @Input() hotel! : IHotel
  @Output() onToggleHotel : EventEmitter<IHotel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  print(){
    console.log(this.hotel)
  }

  onToggleItem(hotel : IHotel){
    this.onToggleHotel.emit(hotel)
  }
}
