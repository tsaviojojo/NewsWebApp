import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel.model';
import { ApiService } from '../service/api.service';
import { UserRoleService } from '../service/user-role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userId !: number;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  roleData !: any;

  formValue !: FormGroup;

  constructor(private formbuilder : FormBuilder, 
    private api: ApiService,
    private userRole: UserRoleService,
    private router:Router) { }

  ngOnInit(): void {
    if(!this.userRole.getUserRole().roleTitle || this.userRole.getUserRole().roleTitle.length === 0) {
      alert("Please login as admin to access Users List")
      this.router.navigate(['login'])
    }

    this.formValue = this.formbuilder.group({
      userName : [''],
      userRole : ['']
    })

    this.getAllUser();
  }

  getRole(){
    this.api.getRoles()
    .subscribe(res=>{
      this.roleData = res;
    })
  }

  getAllUser() {
    this.api.getAllUsers()
    .subscribe(res=>{
      this.userData = res;
    })
  }

  onEditUser(row : any){
    this.userId = row.userId;
    this.formValue.controls['userName'].setValue(row.userName);
    this.formValue.controls['userRole'].setValue(row.userRole);
    this.getRole();
  }

  updateUser() {
    this.userModelObj.userName = this.formValue.value.userName;
    this.userModelObj.userRole = this.formValue.value.userRole;

    this.api.updateUser(this.userModelObj, this.userId)
    .subscribe(res=>{
      alert("Updated successfully")
      let ref = document.getElementById('userCancelButton')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    })
  }

  openNav() {
    let ref : any =  document.getElementById('mySidebar');
    ref.style.width = "250px";
    let ref1 : any =  document.getElementById('main')
    ref1.style.marginLeft = "250px";
  }

  closeNav() {
    let ref : any = document.getElementById("mySidebar");
    ref.style.width = "0";
    let ref1 : any =  document.getElementById("main");
    ref1.style.marginLeft= "0";
  }

}
