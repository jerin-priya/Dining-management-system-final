import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageCategoryUserComponent } from './manage-category-user/manage-category-user.component';
import { ManageProductUserComponent } from './manage-product-user/manage-product-user.component';
import { ViewBillUserComponent } from './view-bill-user/view-bill-user.component';

export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'categoryUser',
    component: ManageCategoryUserComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['user'],
    },
  },
  {
    path: 'productUser',
    component:ManageProductUserComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['user'],
    },
  },
  {
    path: 'product',
    component: ManageProductComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'order',
    component: ManageOrderComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },
  {
    path: 'bill',
    component: ViewBillComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'billUser',
    component: ViewBillUserComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['user'],
    },
  },
  {
    path: 'user',
    component: ManageUserComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
];
