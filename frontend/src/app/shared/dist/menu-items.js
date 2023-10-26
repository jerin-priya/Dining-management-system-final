"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuItems = void 0;
var core_1 = require("@angular/core");
var MENUITEMS = [
    { state: "dashboard", name: "ড্যাশবোর্ড", icon: "dashboard", role: "" },
    {
        state: "category",
        name: "খাবার বিভাগ",
        icon: "category",
        role: "admin"
    },
    { state: "product", name: " খাবার তালিকা ", icon: "grass", role: "" },
    { state: "order", name: "অর্ডার তালিকা", icon: "list_alt", role: "" },
    { state: "bill", name: "বিল সমূহ", icon: "money", role: "" },
    { state: "user", name: "ছাত্রী তালিকা", icon: "people", role: "admin" },
];
var MenuItems = /** @class */ (function () {
    function MenuItems() {
    }
    MenuItems.prototype.getMenuItems = function () {
        return MENUITEMS;
    };
    MenuItems = __decorate([
        core_1.Injectable()
    ], MenuItems);
    return MenuItems;
}());
exports.MenuItems = MenuItems;
