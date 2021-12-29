import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRowComponent } from './hotel-row.component';

describe('HotelRowComponent', () => {
  let component: HotelRowComponent;
  let fixture: ComponentFixture<HotelRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
