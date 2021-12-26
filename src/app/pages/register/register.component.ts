import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTING_PATH } from '../../shared/enums/app-routing.enum';
import { AuthenticationService } from '../../shared/services/auth.service';
import { Location } from '@angular/common'
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup
  public registerInvalid: boolean = false;
  private formSubmitAttempt = false;
  private returnUrl!: string;
  private error : string =''

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly location: Location
  ) {
    if (this.authService.getUserValue) {
      this.router.navigate([ROUTING_PATH.HOME])
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    this.formSubmitAttempt = false;
    this.registerInvalid = false;
    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.authService.register(name,email,password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([ROUTING_PATH.LOGIN],{
            queryParams:{
              registered: true
            }
          })
        },
        error => {
          this.error = error
          this.formSubmitAttempt = true;
        }
      )
    } else {
      // Alert error here
      this.formSubmitAttempt = true;
    }
  }

  goBack() {
    return this.location.back()
  }
}
