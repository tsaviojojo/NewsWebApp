import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { NewsModel } from '../model/news-dashboard.model';
import { UserRoleService } from '../service/user-role.service';
import { Router } from '@angular/router';
import { roles } from '../model/roles.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent implements OnInit {

  newsId !: number;
  formValue !: FormGroup;
  roleForm !: FormGroup;
  formValueNewsView !: FormGroup;

  newsModelObj : NewsModel = new NewsModel();
  roleModelObj : roles = new roles();
  newsData !: any;
  public roleData !: roles;
  newsView !: NewsModel;

  showAdd !: boolean;
  showUpdate !:boolean;
  newsRead !: any;
  canAddToTable : boolean = true;

  showNewsCard !: boolean;
  showNewsEditButton !: boolean;
  showNewsDeleteButton !: boolean;
  showNewsAddButton !: boolean;
  showAddRoleButton !: boolean;
  showModifyUserButton !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private userRole: UserRoleService,
    private router:Router,
    public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    if(!this.userRole.getUserRole().roleTitle || this.userRole.getUserRole().roleTitle.length === 0) {
      alert("Please login to access News Dashboard")
      this.router.navigate(['login'])
    }
    this.formValue = this.formbuilder.group({
      newsTitle : [''],
      newsImage : [''],
      newsContent : [''],
      newsPublished : [''],
      newsValidFrom : [''],
      newsValidTo : [''],
    })

    this.formValueNewsView = this.formbuilder.group({
      newsTitle : [''],
      newsImage : [''],
      newsContent : [''],
      newsPublished : [''],
      newsValidFrom : [''],
      newsValidTo : [''],
    })

    this.roleForm = this.formbuilder.group({
      roleTitle : [''],
      toReadNews : false,
      toCreateNews : false,
      toEditNews : false,
      toEditownNews : false,
      toDeleteNews : false,
      toModifyUser : false,
      toAddNewRoles : false,
    })

    if(this.userRole.getUserRole().addNewRoles){
      this.showAddRoleButton = true;
    } else {
      this.showAddRoleButton = false;
    }

    if(this.userRole.getUserRole().modifyUser){
      this.showModifyUserButton = true;
    } else {
      this.showModifyUserButton = false;
    }

    if(this.userRole.getUserRole().createNews){
      this.showNewsAddButton = true;
    } else {
      this.showNewsAddButton = false;
    }

    this.getAllNews();

    
  }

  showNews(row : NewsModel){

    if(row.newsSavedAsDraft) {
      if(row.newsAuthor === this.userRole.userName) {
        return this.showNewsCard = true;
      }
      if(this.userRole.getUserRole().addNewRoles &&
      this.userRole.getUserRole().modifyUser &&
      this.userRole.getUserRole().createNews &&
      this.userRole.getUserRole().deleteNews &&
      this.userRole.getUserRole().updateNews) {
        return this.showNewsCard = true;
      }

      return this.showNewsCard = false;
    }
    return this.showNewsCard = true;
  }

  showNewsEdit(row : NewsModel){
    if(this.userRole.getUserRole().updateNews){
      return this.showNewsEditButton = true;
    }
    if(this.userRole.getUserRole().onlyUpdateOwnNews){
      if(row.newsAuthor === this.userRole.userName){
        return this.showNewsEditButton = true;
      }
    }
    return this.showNewsEditButton = false;
  }

  showNewsDelete(row : NewsModel){
    if(this.userRole.getUserRole().deleteNews){
      return this.showNewsDeleteButton = true;
    }
    if(this.userRole.getUserRole().deleteOwnNews){
      if(row.newsAuthor === this.userRole.userName){
        return this.showNewsDeleteButton = true;
      }
    }
    return this.showNewsDeleteButton = false;
  }

  postNews(){
    this.newsModelObj.newsTitle = this.formValue.value.newsTitle;
    this.newsModelObj.newsContent = this.formValue.value.newsContent;
    this.newsModelObj.newsValidFrom = this.formValue.value.newsValidFrom;
    this.newsModelObj.newsValidTo = this.formValue.value.newsValidTo;
    this.newsModelObj.newsAuthor = this.userRole.getUserName();
    this.newsModelObj.newsPublished = new Date();
    this.newsModelObj.newsSavedAsDraft = false;

    this.api.postNews(this.newsModelObj)
    .subscribe(res =>{
      console.log(res);
      let ref = document.getElementById('newsCancelButton')
      ref?.click();
      this.formValue.reset();
      this.getAllNews();
    })
  }

  postNewsAsDraft(){
    this.newsModelObj.newsTitle = this.formValue.value.newsTitle;
    this.newsModelObj.newsContent = this.formValue.value.newsContent;
    this.newsModelObj.newsValidFrom = this.formValue.value.newsValidFrom;
    this.newsModelObj.newsValidTo = this.formValue.value.newsValidTo;
    this.newsModelObj.newsAuthor = this.userRole.getUserName();
    this.newsModelObj.newsSavedAsDraft = true;

    this.api.postNews(this.newsModelObj)
    .subscribe(res =>{
      console.log(res);
      let ref = document.getElementById('newsCancelButton')
      ref?.click();
      this.formValue.reset();
      this.getAllNews();
    })
  }

  getAllNews(){
    this.api.getUnreadNews(this.userRole.userName)
    .subscribe(res=>{
      this.newsData = res;
    })
  }

  deleteNews(row : any){
    this.api.deleteNews(row.newsId)
    .subscribe(res=>{
      console.log(res);
      alert("News Deleted")
      this.getAllNews();
    })
  }

  onEditNews(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.newsId = row.newsId;
    this.formValue.controls['newsTitle'].setValue(row.newsTitle);
    this.formValue.controls['newsContent'].setValue(row.newsContent);
    this.formValue.controls['newsValidFrom'].setValue(this.datepipe.transform(row.newsValidFrom, 'yyyy-MM-dd'));
    this.formValue.controls['newsValidTo'].setValue(this.datepipe.transform(row.newsValidTo, 'yyyy-MM-dd'));
  }

  onViewNews(row : any){
    this.newsView = row;
    this.newsId = row.newsId;
    this.formValueNewsView.controls['newsTitle'].setValue(row.newsTitle);
    this.formValueNewsView.controls['newsContent'].setValue(row.newsContent);
    this.formValueNewsView.controls['newsPublished'].setValue(this.datepipe.transform(row.newsPublished, 'yyyy-MM-dd'));
    this.api.postNewsRead(row, this.userRole.getUserName())
    .subscribe(res =>{
      let ref = document.getElementById('newsCancelButton')
      ref?.click();
      this.getAllNews();
    })
  }

  updateNews(){
    this.newsModelObj.newsTitle = this.formValue.value.newsTitle;
    this.newsModelObj.newsContent = this.formValue.value.newsContent;
    this.newsModelObj.newsValidFrom = this.formValue.value.newsValidFrom;
    this.newsModelObj.newsValidTo = this.formValue.value.newsValidTo;
    this.newsModelObj.newsAuthor = this.userRole.getUserName();
    this.newsModelObj.newsPublished = new Date();
    this.newsModelObj.newsSavedAsDraft = false;

    this.api.updateNews(this.newsModelObj, this.newsId)
    .subscribe(res=>{
      alert("Updated successfully")
      let ref = document.getElementById('newsCancelButton')
      ref?.click();
      this.formValue.reset();
      this.getAllNews();
    })
  }

  clickAddNews(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
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

  modifyUser(){
    this.router.navigate(['userList'])
  }

  addRole(){
    let roleTitleString : string = this.roleForm.value.roleTitle;

    this.roleModelObj.roleTitle = roleTitleString.replace(/\s/g, "").toUpperCase();
    this.roleModelObj.createNews  = this.roleForm.value.toCreateNews;
    this.roleModelObj.updateNews  = this.roleForm.value.toEditNews;
    this.roleModelObj.onlyUpdateOwnNews  = this.roleForm.value.toEditownNews;
    this.roleModelObj.deleteNews  = this.roleForm.value.toDeleteNews;
    this.roleModelObj.deleteOwnNews  = this.roleForm.value.toDeleteownNews;
    this.roleModelObj.modifyUser  = this.roleForm.value.toModifyUser;
    this.roleModelObj.addNewRoles  = this.roleForm.value.toAddNewRoles;

    this.api.getRoles()
    .subscribe(res=>{
      const role = res.find((a:any)=>{
        return a.roleTitle === roleTitleString.replace(/\s/g, "").toUpperCase()
      });
      if (role) {
        alert("Role with same title exists. Choose another Title") 
        this.roleForm.reset();
      } else {
        this.api.postRoles(this.roleModelObj)
        .subscribe(res =>{
          alert("Role added successfully") 
          let ref = document.getElementById('rolesCancelButton')
          ref?.click();
          this.roleForm.reset();
          this.getAllNews();
        })
      }
    })

  }
  navigateToReadNews(){
    this.router.navigate(['/readNews'])
    .then(() => {
      this.ngOnInit();
    });
  }

}
