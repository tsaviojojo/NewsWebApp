import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor() { }

  userRole : string = "";

  getUserRole(){
    return this.userRole;
  }

  setUserRole(userRole : string){
    this.userRole = userRole;
  }
}
