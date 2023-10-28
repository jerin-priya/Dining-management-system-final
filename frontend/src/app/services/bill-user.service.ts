import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import jwt_decode from 'jwt-decode';
import {  Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillUserService {
  url: string = environment.apiURL;
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient,private router: Router) {
    
  }
  // getBills(){
  //   const token = localStorage.getItem('token');
  //   if(token){
  //     const decodedToken: any = jwt.decode(token);
  //     const userEmail = decodedToken.email;
  //   }
  //   // return this.http.get(`${this.url}/bill/getUserBills`);
  // }
  getBills() {
    const token: string | null = localStorage.getItem('token');
    let tokenPayload: any;
  
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userEmail = decodedToken.email;
      return this.http.get(`${this.url}/bill/getUserBills?email=${userEmail}`);
    } else {
      this.router.navigate(['/cafe/dashboard']);
      // Return an observable with an error or default value
      return of([]); // You need to import 'of' from 'rxjs' if not already imported.
    }
  }
  
  generateReport(data: any) {
    return this.http.post(
      `${this.url}/bill/generateReport`,
      data,
      this.jsonHeader
    );
  }

  getPDF(data: any): Observable<Blob> {
    return this.http.post(`${this.url}/bill/getPDF`, data, {
      responseType: 'blob',
    });
  }
  delete(id: any) {
    return this.http.delete(`${this.url}/bill/delete/${id}`, this.jsonHeader);
  }
}
