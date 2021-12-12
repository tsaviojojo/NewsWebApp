import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel.model';
import { ApiService } from '../service/api.service';
import { UserRoleService } from '../service/user-role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  public userModelObj : UserModel = new UserModel();
  userData !: any;

  errorMessage !: any;

  constructor(private formBuilder : FormBuilder, 
    private api: ApiService,
    private router:Router,
    private userRole: UserRoleService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName:[''],
      userPassword:['']
    })
  }

  login(){
    this.errorMessage = "Login Failed. User not found"
    this.api.getAllUsers()
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        if(a.userName === this.loginForm.value.userName){
          this.errorMessage = "Login Failed. Please check your password"
        }
        return a.userName === this.loginForm.value.userName && a.userPassword === this.loginForm.value.userPassword
      });
      console.info(user)
      if(user){
        this.userModelObj.userRole = user.userRole;
        this.userModelObj.userName = user.userName;
        this.userRole.setUserRole(user.roles, user.userName);
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert(this.errorMessage);
      }
    })

  }
}
