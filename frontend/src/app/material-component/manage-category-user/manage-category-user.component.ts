import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

import { CategoryUserService } from 'src/app/services/category-user.service';


@Component({
  selector: 'app-manage-category-user',
  templateUrl: './manage-category-user.component.html',
  styleUrls: ['./manage-category-user.component.scss']
})
export class ManageCategoryUserComponent {
  displayedColumns: string[] = ['name'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private categoryService: CategoryUserService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.categoryService.getCategories().subscribe(
      (resp: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(resp.data);
        console.log(resp);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
       
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
