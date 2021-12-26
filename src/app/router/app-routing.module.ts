import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { HomeComponent } from "../pages/home/home.component";
import { LoginComponent } from "../pages/login/login.component";
import { RegisterComponent } from "../pages/register/register.component";
import { ROUTING_PATH } from "./app-routing.enum";


const routes : Routes = [
    {
        path:ROUTING_PATH.HOME,
        component:HomeComponent
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
        path:ROUTING_PATH.EXPLICIT,
        component:HomeComponent
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {
    
}