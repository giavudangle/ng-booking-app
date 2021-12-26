import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTING_PATH } from 'src/app/router/app-routing.enum';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form! : FormGroup
  public loginInvalid : boolean = false;
  private formSubmitAttempt = false;
  private returnUrl!: string;


  constructor(
    private readonly fb:FormBuilder,
    private readonly route : ActivatedRoute,
    private readonly router : Router,
    private readonly authService : AuthenticationService
  ) { 
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || ROUTING_PATH.EXPLICIT
    this.form = this.fb.group({
      email:['',Validators.email],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if(this.form.valid){
      try {
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        await this.authService.login(email,password)
      } catch(err){
        this.loginInvalid = true;
      }
    }else {
      this.formSubmitAttempt = true;
    }
  }
}
