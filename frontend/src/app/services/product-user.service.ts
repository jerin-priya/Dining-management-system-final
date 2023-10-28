import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductUserService {

  url: string = environment.apiURL;
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.url}/product/get`);
  }
  getProductsByCategory(id: any) {
    return this.http.get(`${this.url}/product/getByCategoryID/${id}`);
  }

  getById(id: any) {
    return this.http.get(`${this.url}/product/getByID/${id}`);
  }
}
