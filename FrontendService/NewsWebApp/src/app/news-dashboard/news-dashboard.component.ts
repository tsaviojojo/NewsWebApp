import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { NewsModel } from './news-dashboard.model';

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

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      newsTitle : [''],
      newsContent : ['']
    })

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
}
