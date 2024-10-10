import { UserServiceService } from './../services/user-service.service';

import { user } from '../user.model';
import { Component } from '@angular/core';
import { organisation } from '../organisation.model';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  currentStep: number = 1;  // To track the current step
  organizations:organisation[] = [{orgid:"1301",orgname:'Org1'}, {orgid:"1302",orgname:'Org2'}, {orgid:"1303",orgname:'Org3'}];  // Mock organization list
  designations: string[] = ["Manager", "Developer", "Designer"];  // Mock designation list
  invorg: boolean = false;
  signedup: boolean = false;

  email: string="";
  fullName: string="";
  password: string="";
  orgName: string="";
  orgid: string="";
  designation: string="";
  design: any;
  birthdate: Date=new Date('1990-01-01');
  city: string="";
  pincode: number=0;
  newuser: user = {email:"",fullname:"",password:"",orgName:"",orgid:"",birthdate:new Date('1990-01-01'),city:"",pincode:0,designation:""};

  emailError: string="";

  constructor(private service: UserServiceService, private router: Router) {
  }

  ngOnInit(): void {
    let temp=localStorage.getItem('email');  // to display the email already entered by the user
    if(temp){
      this.email=temp;
    }
  }

  //to navigate to step 2
  nextStep() {
    if (this.currentStep === 1) {
      this.currentStep = 2;
    }
  }

  //to navigate back to step 1
  previousStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
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

  onSubmit() {

    //validating if all fields are having values entered or not

    if(this.email===""){alert("Enter valid email")}
    else if(this.fullName===""){alert("Enter Full Name")}
    else if(this.password===""){alert("Enter password")}
    else if(this.orgName===""){alert("Enter Organisation Name")}
    else if(this.designation===""){console.log("ekjfbdj"+this.designation);alert("Select Designation")}
    else if(!this.birthdate){alert("Enter BirthDate")}
    else if(this.city===""){alert("Enter city")}
    else if(this.pincode===0){alert("Enter Pincode")}
    else{

          this.newuser.email=this.email;
          this.newuser.fullname=this.fullName;
          this.newuser.password=this.password;
          this.newuser.orgName=this.orgName;
          this.newuser.orgid=this.orgid;
          this.newuser.designation=this.designation;
          this.newuser.birthdate=this.birthdate;
          this.newuser.city=this.city;
          this.newuser.pincode=this.pincode;

          // adding the new user using service
          this.service.addUser(this.newuser);
          this.signedup=true;
          localStorage.setItem("email",this.email);
          localStorage.setItem("username",this.fullName);
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
    }
  }

  // to check if organosation is present in the list of allowed Organization-id in the mocks response.
  validateOrgName() {
    const temp=this.organizations.find(o=>o.orgname===this.orgName);
    if(temp===undefined){
      this.invorg=true;
      this.orgid="";
    }
    else{
      this.invorg=false;
      this.orgid=temp.orgid;
    }
  }

  // verify pincode is 6 digits.
  validatepin(){
    let temp=this.pincode.toString();
    let d=temp.length;
    if(d!==6){
        alert("enter valid pincode");
    }
  }
}
