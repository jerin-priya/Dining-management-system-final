import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss'],
})
export class ViewBillProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'নাম',
    'কোন তালিকার',
    'মূল্য',
    'পরিমাণ',
    'মোট মূল্য',
  ];
  dataSource: any = [];
  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewBillProductsComponent>
  ) {}

  ngOnInit() {
    
    this.data = this.dialogData.data;    
    this.dataSource = this.data.productDetails;
  }
}
