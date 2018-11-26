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
    MobilePayAppSwitch.prototype.setupWithMerchantId = function (merchantId, merchantUrlScheme, options) { return cordova(this, "setupWithMerchantId", { "callbackStyle": "node" }, arguments); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL21vYmlsZXBheWFwcHN3aXRjaC9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxzRUFBdUQsTUFBTSxvQkFBb0IsQ0FBQzs7SUFtQ2pELHNDQUFpQjs7OztJQU92RCxpREFBb0I7SUFPcEIsZ0RBQW1CLGFBQUMsVUFBa0IsRUFBRSxpQkFBeUIsRUFBRSxPQUErQjtJQU9sRywwREFBNkIsYUFBQyxPQUFlLEVBQUUsWUFBb0I7MEJBbkJuRSxxREFBcUI7Ozs7Ozs7Ozs7O0lBRlYsa0JBQWtCO1FBRDlCLFVBQVUsRUFBRTtPQUNBLGtCQUFrQjs2QkFwQy9CO0VBb0N3QyxpQkFBaUI7U0FBNUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgQ29yZG92YVByb3BlcnR5LCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2JpbGVQYXlTZXR1cE9wdGlvbnMge1xuICByZXR1cm5TZWNvbmRzPzogbnVtYmVyO1xuICB0aW1lb3V0U2Vjb25kcz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50UmVzdWx0IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgY2FuY2VsbGVkOiBib29sZWFuO1xuICBvcmRlcklkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFBheW1lbnRTdWNjZXNzID0gUGF5bWVudFJlc3VsdCAmIHtcbiAgdHJhbnNhY3Rpb25JZDogU3RyaW5nLFxuICBzaWduYXR1cmU6IFN0cmluZyxcbiAgcHJvZHVjdFByaWNlOiBOdW1iZXIsXG4gIGFtb3VudFdpdGhkcmF3bkZyb21DYXJkOiBOdW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIFBheW1lbnRDYW5jZWxsZWQgPSBQYXltZW50UmVzdWx0O1xuXG5leHBvcnQgdHlwZSBQYXltZW50RXJyb3IgPSBQYXltZW50UmVzdWx0ICYge1xuICBlcnJvckNvZGU6IG51bWJlcixcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmdcbn07XG5cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnTW9iaWxlUGF5QXBwU3dpdGNoJyxcbiAgcGx1Z2luOiAnY29yZG92YS1tb2JpbGVwYXktYXBwc3dpdGNoJyxcbiAgcGx1Z2luUmVmOiAnd2luZG93Lm1vYmlsZXBheScsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vdW13ZWx0ZGsvY29yZG92YS1tb2JpbGVwYXktYXBwc3dpdGNoJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJywgJ0Jyb3dzZXInXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9iaWxlUGF5QXBwU3dpdGNoIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICBAQ29yZG92YVByb3BlcnR5KClcbiAgaXNBcHBTd2l0Y2hJblByb2dyZXNzOiBib29sZWFuO1xuXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgaXNNb2JpbGVQYXlJbnN0YWxsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdub2RlJ1xuICB9KVxuICBzZXR1cFdpdGhNZXJjaGFudElkKG1lcmNoYW50SWQ6IHN0cmluZywgbWVyY2hhbnRVcmxTY2hlbWU6IHN0cmluZywgb3B0aW9ucz86IE1vYmlsZVBheVNldHVwT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgYmVnaW5Nb2JpbGVQYXltZW50V2l0aFBheW1lbnQob3JkZXJJZDogc3RyaW5nLCBwcm9kdWN0UHJpY2U6IG51bWJlcik6IFByb21pc2U8UGF5bWVudFN1Y2Nlc3MgfCBQYXltZW50Q2FuY2VsbGVkIHwgUGF5bWVudEVycm9yPiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=