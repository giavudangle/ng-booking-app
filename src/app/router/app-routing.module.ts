import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { HotelDetailComponent } from "../components/hotel-detail/hotel-detail.component";
import { HomeComponent } from "../pages/home/home.component";
import { HotelComponent } from "../pages/hotel/hotel.component";
import { LoginComponent } from "../pages/login/login.component";
import { RegisterComponent } from "../pages/register/register.component";
import { ROUTING_PATH } from "../shared/enums/app-routing.enum";
import { AuthGuard } from "../shared/guards/auth.guard";


const routes : Routes = [
    {
        path:ROUTING_PATH.HOME,
        component:HomeComponent,
        canActivate:[AuthGuard]
    },
    {
        path:ROUTING_PATH.LOGIN,
        component:LoginComponent
    },
    {
        path:ROUTING_PATH.REGISTER,
        component:RegisterComponent
    },
    {
        path:ROUTING_PATH.HOTEL,
        component:HotelComponent,
        canActivate:[AuthGuard]

    },
    {
        path:`${ROUTING_PATH.HOTEL}/:id`,
        component:HotelDetailComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'**',
        redirectTo:''
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {
    
}