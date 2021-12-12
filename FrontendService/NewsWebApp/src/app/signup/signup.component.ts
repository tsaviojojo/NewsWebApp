import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  roleData !: any;

  userModelObg : UserModel = new UserModel();
  userData !: any;

  constructor(private formBuilder : FormBuilder, 
    private api: ApiService,
    private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName:[''],
      userRole:[''],
      userPassword:['']
    })
    this.getRole();
  }

  getRole(){
    this.api.getRoles()
    .subscribe(res=>{
      this.roleData = res;
    })
  }

  signUp(){
    this.userModelObg.userName = this.signupForm.value.userName;
    this.userModelObg.userPassword = this.signupForm.value.userPassword;
    this.userModelObg.userRole = this.signupForm.value.userRole;

    this.api.postUser(this.userModelObg)
    .subscribe(res =>{
      console.log(res);
      alert("SignUp successfull. Redirect to login page")
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
  }

}
