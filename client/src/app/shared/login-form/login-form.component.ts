import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {AuthenticationService} from "../authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private userModel = new User();
  private error : string;
  private loading = false;
  private returnUrl;

  constructor(private authService: AuthenticationService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginUser() {
    this.loading = true;
    this.authService.login(this.userModel).subscribe(response => {
      if (response === true) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.error = 'Invalid username or password';
      }
    },
      (error) =>{
      if(error.status == 401){
        this.error = "Invalid username or password";
        this.loading = false;
      }
      });
  }


}
