var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova, cordovaPropertyGet, cordovaPropertySet } from '@ionic-native/core';
var MobilePayAppSwitch = /** @class */ (function (_super) {
    __extends(MobilePayAppSwitch, _super);
    function MobilePayAppSwitch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePayAppSwitch.prototype.isMobilePayInstalled = function () { return cordova(this, "isMobilePayInstalled", { "callbackStyle": "node" }, arguments); };
    MobilePayAppSwitch.prototype.setupWithMerchantId = function (merchantId, merchantUrlScheme) { return cordova(this, "setupWithMerchantId", { "callbackStyle": "node" }, arguments); };
    MobilePayAppSwitch.prototype.beginMobilePaymentWithPayment = function (orderId, productPrice) { return cordova(this, "beginMobilePaymentWithPayment", { "callbackStyle": "node" }, arguments); };
    Object.defineProperty(MobilePayAppSwitch.prototype, "isAppSwitchInProgress", {
        get: function () { return cordovaPropertyGet(this, "isAppSwitchInProgress"); },
        set: function (value) { cordovaPropertySet(this, "isAppSwitchInProgress", value); },
        enumerable: true,
        configurable: true
    });
    MobilePayAppSwitch.pluginName = "MobilePayAppSwitch";
    MobilePayAppSwitch.plugin = "cordova-mobilepay-appswitch";
    MobilePayAppSwitch.pluginRef = "window.mobilepay";
    MobilePayAppSwitch.repo = "https://github.com/umweltdk/cordova-mobilepay-appswitch";
    MobilePayAppSwitch.platforms = ["Android", "iOS", "Browser"];
    MobilePayAppSwitch = __decorate([
        Injectable()
    ], MobilePayAppSwitch);
    return MobilePayAppSwitch;
}(IonicNativePlugin));
export { MobilePayAppSwitch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL21vYmlsZXBheWFwcHN3aXRjaC9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxzRUFBdUQsTUFBTSxvQkFBb0IsQ0FBQzs7SUE4QmpELHNDQUFpQjs7OztJQU92RCxpREFBb0I7SUFPcEIsZ0RBQW1CLGFBQUMsVUFBa0IsRUFBRSxpQkFBeUI7SUFPakUsMERBQTZCLGFBQUMsT0FBZSxFQUFFLFlBQW9COzBCQW5CbkUscURBQXFCOzs7Ozs7Ozs7OztJQUZWLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7T0FDQSxrQkFBa0I7NkJBL0IvQjtFQStCd0MsaUJBQWlCO1NBQTVDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIENvcmRvdmFQcm9wZXJ0eSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFJlc3VsdCB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIGNhbmNlbGxlZDogYm9vbGVhbjtcbiAgb3JkZXJJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXltZW50U3VjY2VzcyA9IFBheW1lbnRSZXN1bHQgJiB7XG4gIHRyYW5zYWN0aW9uSWQ6IFN0cmluZyxcbiAgc2lnbmF0dXJlOiBTdHJpbmcsXG4gIHByb2R1Y3RQcmljZTogTnVtYmVyLFxuICBhbW91bnRXaXRoZHJhd25Gcm9tQ2FyZDogTnVtYmVyXG59O1xuXG5leHBvcnQgdHlwZSBQYXltZW50Q2FuY2VsbGVkID0gUGF5bWVudFJlc3VsdDtcblxuZXhwb3J0IHR5cGUgUGF5bWVudEVycm9yID0gUGF5bWVudFJlc3VsdCAmIHtcbiAgZXJyb3JDb2RlOiBudW1iZXIsXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nXG59O1xuXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ01vYmlsZVBheUFwcFN3aXRjaCcsXG4gIHBsdWdpbjogJ2NvcmRvdmEtbW9iaWxlcGF5LWFwcHN3aXRjaCcsXG4gIHBsdWdpblJlZjogJ3dpbmRvdy5tb2JpbGVwYXknLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3Vtd2VsdGRrL2NvcmRvdmEtbW9iaWxlcGF5LWFwcHN3aXRjaCcsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUycsICdCcm93c2VyJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vYmlsZVBheUFwcFN3aXRjaCBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgQENvcmRvdmFQcm9wZXJ0eSgpXG4gIGlzQXBwU3dpdGNoSW5Qcm9ncmVzczogYm9vbGVhbjtcblxuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIGlzTW9iaWxlUGF5SW5zdGFsbGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgc2V0dXBXaXRoTWVyY2hhbnRJZChtZXJjaGFudElkOiBzdHJpbmcsIG1lcmNoYW50VXJsU2NoZW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIGJlZ2luTW9iaWxlUGF5bWVudFdpdGhQYXltZW50KG9yZGVySWQ6IHN0cmluZywgcHJvZHVjdFByaWNlOiBudW1iZXIpOiBQcm9taXNlPFBheW1lbnRTdWNjZXNzIHwgUGF5bWVudENhbmNlbGxlZCB8IFBheW1lbnRFcnJvcj4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19