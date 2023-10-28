import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: "dashboard", name: "ড্যাশবোর্ড", icon: "dashboard", role: "" },
  { state: "order", name: "অর্ডার করুন", icon: "list_alt", role: "" },
  {
    state: "category",
    name: "খাবার বিভাগ",
    icon: "category",
    role: "admin",
  },
  { state: "product", name: " খাবার তালিকা ", icon: "grass", role: "admin" },
  {
    state: "categoryUser",
    name: "খাবার বিভাগ",
    icon: "category",
    role: "user",
  },
  { state: "productUser", name: " খাবার তালিকা ", icon: "grass", role: "user" },
  { state: "user", name: "ছাত্রী তালিকা", icon: "people", role: "admin" },
  { state: "bill", name: "বিল সমূহ", icon: "money", role: "admin" },
];

@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS;
  }
}
