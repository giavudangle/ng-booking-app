import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ROUTING_PATH } from '../../shared/enums/app-routing.enum';
import { AuthenticationService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup
  public loginInvalid: boolean = false;
  private formSubmitAttempt = false;
  private returnUrl!: string;


  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    if (this.authService.getUserValue) {
      this.router.navigate([ROUTING_PATH.HOME])
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || ROUTING_PATH.HOME
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

  navigateToRegister() {
    this.router.navigate([ROUTING_PATH.REGISTER])
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        this.authService.login(email, password)
          .pipe(first())
          .subscribe(
            data => this.router.navigate([this.returnUrl]),
            error => {
              this.formSubmitAttempt = true;
            }
          )
      } catch (err) {
        // Alert error here

        this.loginInvalid = true;
      }
    } else {
      // Alert error here
      this.formSubmitAttempt = true;
    }
  }
}
