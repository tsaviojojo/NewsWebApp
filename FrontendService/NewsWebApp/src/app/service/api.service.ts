import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { roles } from '../model/roles.model';
import { NewsModel } from '../model/news-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get<any>("http://localhost:8080/role")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getSingleRole(roleTitle : string){
    return this.http.get<roles>("http://localhost:8080/role/"+ roleTitle)
    .pipe(map((res:roles)=>{
      return res;
    }))
  }

  postRoles(data : any){
    return this.http.post<any>("http://localhost:8080/role", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postNews(data : any){
    return this.http.post<any>("http://localhost:8080/news", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postNewsRead(data : any, userName : string){
    return this.http.post<any>("http://localhost:8080/newsRead/"+userName, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getNewsRead(newsId : any, userName : string){
    return this.http.get<any>("http://localhost:8080/newsRead/"+userName+"/"+newsId)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getNews(){
    return this.http.get<any>("http://localhost:8080/news")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUnreadNews(userId:any){
    return this.http.get<any>("http://localhost:8080/news/"+userId)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getReadNews(userId:any){
    return this.http.get<any>("http://localhost:8080/newsread/"+userId)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteNews(id : number){
    return this.http.delete<any>("http://localhost:8080/news/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateNews(data : any, id:number){
    return this.http.put<any>("http://localhost:8080/news/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postUser(data : any){
    return this.http.post<any>("http://localhost:8080/user", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllUsers(){
    return this.http.get<any>("http://localhost:8080/user")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUser(data : any, id:number){
    return this.http.put<any>("http://localhost:8080/user/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
