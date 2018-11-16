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
import { IonicNativePlugin, cordova, cordovaPropertyGet, cordovaPropertySet } from '@ionic-native/core';
var MobilePayAppSwitchOriginal = /** @class */ (function (_super) {
    __extends(MobilePayAppSwitchOriginal, _super);
    function MobilePayAppSwitchOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePayAppSwitchOriginal.prototype.isMobilePayInstalled = function () { return cordova(this, "isMobilePayInstalled", { "callbackStyle": "node" }, arguments); };
    MobilePayAppSwitchOriginal.prototype.setupWithMerchantId = function (merchantId, merchantUrlScheme) { return cordova(this, "setupWithMerchantId", { "callbackStyle": "node" }, arguments); };
    MobilePayAppSwitchOriginal.prototype.beginMobilePaymentWithPayment = function (orderId, productPrice) { return cordova(this, "beginMobilePaymentWithPayment", { "callbackStyle": "node" }, arguments); };
    Object.defineProperty(MobilePayAppSwitchOriginal.prototype, "isAppSwitchInProgress", {
        get: function () { return cordovaPropertyGet(this, "isAppSwitchInProgress"); },
        set: function (value) { cordovaPropertySet(this, "isAppSwitchInProgress", value); },
        enumerable: true,
        configurable: true
    });
    MobilePayAppSwitchOriginal.pluginName = "MobilePayAppSwitch";
    MobilePayAppSwitchOriginal.plugin = "cordova-mobilepay-appswitch";
    MobilePayAppSwitchOriginal.pluginRef = "window.mobilepay";
    MobilePayAppSwitchOriginal.repo = "https://github.com/umweltdk/cordova-mobilepay-appswitch";
    MobilePayAppSwitchOriginal.platforms = ["Android", "iOS", "Browser"];
    return MobilePayAppSwitchOriginal;
}(IonicNativePlugin));
var MobilePayAppSwitch = new MobilePayAppSwitchOriginal();
export { MobilePayAppSwitch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL21vYmlsZXBheWFwcHN3aXRjaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsT0FBTyxzRUFBdUQsTUFBTSxvQkFBb0IsQ0FBQzs7SUE4QmpELHNDQUFpQjs7OztJQU92RCxpREFBb0I7SUFPcEIsZ0RBQW1CLGFBQUMsVUFBa0IsRUFBRSxpQkFBeUI7SUFPakUsMERBQTZCLGFBQUMsT0FBZSxFQUFFLFlBQW9COzBCQW5CbkUscURBQXFCOzs7Ozs7Ozs7Ozs2QkFqQ3ZCO0VBK0J3QyxpQkFBaUI7U0FBNUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgQ29yZG92YVByb3BlcnR5LCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50UmVzdWx0IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgY2FuY2VsbGVkOiBib29sZWFuO1xuICBvcmRlcklkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFBheW1lbnRTdWNjZXNzID0gUGF5bWVudFJlc3VsdCAmIHtcbiAgdHJhbnNhY3Rpb25JZDogU3RyaW5nLFxuICBzaWduYXR1cmU6IFN0cmluZyxcbiAgcHJvZHVjdFByaWNlOiBOdW1iZXIsXG4gIGFtb3VudFdpdGhkcmF3bkZyb21DYXJkOiBOdW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIFBheW1lbnRDYW5jZWxsZWQgPSBQYXltZW50UmVzdWx0O1xuXG5leHBvcnQgdHlwZSBQYXltZW50RXJyb3IgPSBQYXltZW50UmVzdWx0ICYge1xuICBlcnJvckNvZGU6IG51bWJlcixcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmdcbn07XG5cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnTW9iaWxlUGF5QXBwU3dpdGNoJyxcbiAgcGx1Z2luOiAnY29yZG92YS1tb2JpbGVwYXktYXBwc3dpdGNoJyxcbiAgcGx1Z2luUmVmOiAnd2luZG93Lm1vYmlsZXBheScsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vdW13ZWx0ZGsvY29yZG92YS1tb2JpbGVwYXktYXBwc3dpdGNoJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJywgJ0Jyb3dzZXInXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9iaWxlUGF5QXBwU3dpdGNoIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICBAQ29yZG92YVByb3BlcnR5KClcbiAgaXNBcHBTd2l0Y2hJblByb2dyZXNzOiBib29sZWFuO1xuXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgaXNNb2JpbGVQYXlJbnN0YWxsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdub2RlJ1xuICB9KVxuICBzZXR1cFdpdGhNZXJjaGFudElkKG1lcmNoYW50SWQ6IHN0cmluZywgbWVyY2hhbnRVcmxTY2hlbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgYmVnaW5Nb2JpbGVQYXltZW50V2l0aFBheW1lbnQob3JkZXJJZDogc3RyaW5nLCBwcm9kdWN0UHJpY2U6IG51bWJlcik6IFByb21pc2U8UGF5bWVudFN1Y2Nlc3MgfCBQYXltZW50Q2FuY2VsbGVkIHwgUGF5bWVudEVycm9yPiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=