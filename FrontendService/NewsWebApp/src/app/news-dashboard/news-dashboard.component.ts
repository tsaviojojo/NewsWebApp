import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { NewsModel } from '../model/news-dashboard.model';
import { UserRoleService } from '../service/user-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent implements OnInit {

  newsId !: number;
  formValue !: FormGroup;

  newsModelObj : NewsModel = new NewsModel();
  newsData !: any;

  showAdd !: boolean;
  showUpdate !:boolean;

  showNewsEditButton : boolean = true;
  showNewsDeleteButton : boolean = true;
  showNewsAddButton : boolean = true;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private userRole: UserRoleService,
    private router:Router,) {
  }

  ngOnInit(): void {
    if(this.userRole.getUserRole().length === 0) {
      alert("Please login to access News Dashboard")
      this.router.navigate(['login'])
    }
    this.formValue = this.formbuilder.group({
      newsTitle : [''],
      newsContent : ['']
    })

    if(this.userRole.getUserRole() === "Reader"){
      this.showNewsEditButton = false;
      this.showNewsDeleteButton = false;
      this.showNewsAddButton = false;
    }

    this.getAllNews();
  }

  postNews(){
    this.newsModelObj.newsTitle = this.formValue.value.newsTitle;
    this.newsModelObj.newsContent = this.formValue.value.newsContent;

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
    this.api.getNews()
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
  }

  updateNews(){
    this.newsModelObj.newsTitle = this.formValue.value.newsTitle;
    this.newsModelObj.newsContent = this.formValue.value.newsContent;

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

}
