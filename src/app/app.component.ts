import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn : boolean = false;

  constructor(private readonly authService : AuthenticationService){

  }

  ngOnInit(): void {
    const user = this.authService.getUserValue
    if(user){
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }

  onLogout(){
    console.log('Logout pressed')
    // Call logout api
    // Remove user from local storage
  }

  onLogin(){
    console.log('Login pressed')
    // Navigate To Login Route

  }
}
