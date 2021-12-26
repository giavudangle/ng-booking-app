import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from '../../shared/services/hotel.service';
import { DataSource } from '@angular/cdk/collections';
import { IHotel } from '../../shared/models/hotel.model';
import { first } from 'rxjs';
import { API_ENDPOINT } from '../../shared/config/api.config';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  imageUrl?: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', imageUrl: 'https://source.unsplash.com/random' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  public dataSource! : MatTableDataSource<IHotel>

  displayedColumns: string[] = ['id', 'imageUrl', 'hotelName','description', 'address'];

  constructor(
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly _hotelService: HotelService
  ) { 

  }


  ngOnInit(): void {
    this._hotelService.getAllHotels().pipe(first()).subscribe(
      item => {
        //item.forEach((hotel : IHotel) => hotel.imageUrl = `${API_ENDPOINT}/${hotel.imageUrl}`) as any
        item.forEach((hotel : IHotel) => {
          hotel.imageUrl = `${API_ENDPOINT}/${hotel.imageUrl}`,
          hotel.description = hotel.description.slice(0,30)
        }) 
        console.log(item)

        this.dataSource = new MatTableDataSource(item)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => console.log(err)
    );
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort | any) {
    console.log(sortState)
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState!.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState!.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  search($event: any) {
    // Calls elasticsearch API for searching product 
    // in production context. 
    // But in this sample demo
    //  I will use simple filtering :))


  }
}
