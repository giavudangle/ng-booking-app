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
import { Router } from '@angular/router';
import { ROUTING_PATH } from '../../shared/enums/app-routing.enum';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  public dataSource!: MatTableDataSource<IHotel>
  public displayedColumns: string[] = ['id', 'imageUrl', 'hotelName', 'description', 'address', 'detail'];
  public initialSelection = []
  public allowMultiSelect = true;
  public selection = new SelectionModel<IHotel>(this.allowMultiSelect, this.initialSelection)


  constructor(
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly _hotelService: HotelService,
    private readonly _router : Router
  ) { }

  ngOnInit(): void {
    this._hotelService.getAllHotels().pipe(first()).subscribe(
      item => {
        //item.forEach((hotel : IHotel) => hotel.imageUrl = `${API_ENDPOINT}/${hotel.imageUrl}`) as any
        item.forEach((hotel: IHotel) => {
          hotel.imageUrl = `${API_ENDPOINT}/${hotel.imageUrl}`,
            hotel.description = hotel.description.slice(0, 30)
        })

        //console.log(item)
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
    // I will use simple filtering :))
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  checkboxLabel(row?: IHotel): any {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onViewDetail(element : any){
    this._router.navigate([`${ROUTING_PATH.HOTEL}/${element.id}`],element.id)
  }

}
