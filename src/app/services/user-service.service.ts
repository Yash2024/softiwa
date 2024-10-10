import { Injectable } from '@angular/core';
import { user } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  //mock response for some users
  users: user[]= [{
    email: 'demo1@example.com',
    fullname: "demo",
    password: "000",
    orgName: 'Org1',
    orgid: '1301',
    designation: 'Manager',
    birthdate: new Date('1990-01-01'),
    city: 'democity1',
    pincode: 123456
  },
{
    email: 'demo2@example.com',
    fullname: "demo",
    password: "000",
    orgName: 'Org1',
    orgid: '1301',
    designation: 'Developer',
    birthdate: new Date('1990-01-01'),
    city: 'democity1',
    pincode: 456789
}];

  constructor() { }

  // add a new user
  addUser(newUser: user): void {
    this.users.push(newUser);
  }

  // find the user (if exists) by Email
  findByEmail(email: string): user | undefined {
    return this.users.find(u => u.email === email);
  }
}
