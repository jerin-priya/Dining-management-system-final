
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';
import { ProductUserService } from 'src/app/services/product-user.service';

@Component({
  selector: 'app-manage-product-user',
  templateUrl: './manage-product-user.component.html',
  styleUrls: ['./manage-product-user.component.scss']
})
export class ManageProductUserComponent {
  displayedColumns: string[] = [
    'name',
    'category',
    'image',
    'description',
    'price',
  ];
  dataSource: any;
  responseMessage: any;

  constructor(
    private productUserService: ProductUserService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.productUserService.getProducts().subscribe(
      (resp: any) => {
        console.log(resp)
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(resp.data);
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