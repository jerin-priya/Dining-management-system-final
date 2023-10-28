import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryUserService {
  url: string = environment.apiURL;
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get(`${this.url}/category/get/`);
  }
}
