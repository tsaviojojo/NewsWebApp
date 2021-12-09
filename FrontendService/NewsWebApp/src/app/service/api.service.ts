import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postNews(data : any){
    return this.http.post<any>("http://localhost:8080/news", data)
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
