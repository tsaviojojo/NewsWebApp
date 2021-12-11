import { Injectable } from '@angular/core';
import { roles } from '../model/roles.model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor() { }

  userRole : roles = new roles;
  userName : string = '';
  
  getUserName(){
    return this.userName;
  }


  getUserRole(){
    return this.userRole;
  }

  setUserRole(userRole : roles, userName : string){
    this.userRole = userRole;
    this.userName = userName;
  }
}
