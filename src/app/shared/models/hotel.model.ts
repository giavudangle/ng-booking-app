export interface IHotel {
    id : number;
    hotelName : string;
    imageUrl : string;
    address: string;
    description:string;
    isActive:boolean;
    category?: any;
    rooms?: any;
    facilities?: any;
}