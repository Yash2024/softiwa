import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { user } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
    email:string='';
    mob: number | null | undefined;
    emailError: string='';

    constructor(private service: UserServiceService, private router: Router) {
    }
  
    ngOnInit(): void {
      localStorage.setItem("email",'');
          localStorage.setItem("username",'');
    }

    //to validate the email
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.email.match(emailPattern)) {
        this.emailError = 'Please enter a valid email address.';
      } else {
        this.emailError = '';
      }
    }

    // to navigate to signup or login page accordingly
    gonext(){

      if(this.email===''&&this.mob===undefined){
        alert('Please Enter Email Id or Mobile Number');
      }
      else{
        let user:user|undefined;
        user=this.service.findByEmail(this.email);
        console.log(user);
        //making use of localstorage of browser to store the email entered by user and name (if user exists) so that it can be used further
        localStorage.setItem("email",this.email);
        if(user){
          localStorage.setItem("username",user.fullname);
          this.router.navigate(['login']);
        }
        else{
          this.router.navigate(['signup']);
        }
      }
    }
}
