import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { user } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 showinc: boolean=false;
 email: string='';
 password: string ='';
 name: string ='';
 loggedin: boolean=false;
 emailError: string='';

 constructor(private service: UserServiceService) {
  }

  ngOnInit(): void {
    let temp=localStorage.getItem('email');  // to display the email already entered by the user
    if(temp){
      this.email=temp;
    }
    let nametemp=localStorage.getItem('username');  // to display the name of the user
    if(nametemp){
      this.name=nametemp;
    }
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
 
  //function used to check password we can further enhance the password safety by encrypting it via backend
 login(){
  let user:user|undefined;
  user=this.service.findByEmail(this.email);

  if(user===undefined){
    this.showinc=true;
  }
  else{
    // to show a success modal or failure inline message, stating the password is not valid.
    if(user.password===this.password)
    {
      this.loggedin=true;
      this.showinc=false;
    }
    else{
      this.showinc=true;
      this.loggedin=false;
    }
  }
 }
}
