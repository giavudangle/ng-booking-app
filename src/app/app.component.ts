import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING_PATH } from './shared/enums/app-routing.enum';
import { APP_CONFIG } from './shared/enums/app.enum';
import { AuthenticationService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() public isLoggedIn: boolean = false;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.authService.userOservable.subscribe(
      item => item != null
        ? this.isLoggedIn = true
        : this.isLoggedIn = false
    )
  }




  onLogout() {
    // Call logout api
    // Remove user from local storage
    this.authService.logout().subscribe(
      item => {
        this.isLoggedIn = false;
        this.router.navigate([ROUTING_PATH.LOGIN])
      }
    )

  }

  onLogin() {
    // Navigate To Login Route
    this.router.navigate([ROUTING_PATH.LOGIN])

  }
}
