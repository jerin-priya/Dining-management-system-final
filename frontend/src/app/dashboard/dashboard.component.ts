import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  isAdmin: boolean = false; // Initialize isAdmin property
  ngAfterViewInit() {}

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackBar: SnackbarService,
    private router: Router,
  ) {
    this.ngxService.start();
    this.dashboardData();
  }

  dashboardData() {
    const token: string = localStorage.getItem('token')!;
    let tokenPayload: any;
    try {
      tokenPayload = jwt_decode(token);
      // Check if the user is an admin based on the role in the token
      this.isAdmin = tokenPayload.role === 'admin';
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
    this.dashboardService.getDetails().subscribe(
      (resp: any) => {
        this.ngxService.stop();
        this.data = resp.data;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
