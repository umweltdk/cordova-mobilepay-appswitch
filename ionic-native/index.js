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
    MobilePayAppSwitchOriginal.prototype.setupWithMerchantId = function (merchantId, merchantUrlScheme, options) { return cordova(this, "setupWithMerchantId", { "callbackStyle": "node" }, arguments); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL21vYmlsZXBheWFwcHN3aXRjaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsT0FBTyxzRUFBdUQsTUFBTSxvQkFBb0IsQ0FBQzs7SUFtQ2pELHNDQUFpQjs7OztJQU92RCxpREFBb0I7SUFPcEIsZ0RBQW1CLGFBQUMsVUFBa0IsRUFBRSxpQkFBeUIsRUFBRSxPQUErQjtJQU9sRywwREFBNkIsYUFBQyxPQUFlLEVBQUUsWUFBb0I7MEJBbkJuRSxxREFBcUI7Ozs7Ozs7Ozs7OzZCQXRDdkI7RUFvQ3dDLGlCQUFpQjtTQUE1QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBDb3Jkb3ZhUHJvcGVydHksIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vYmlsZVBheVNldHVwT3B0aW9ucyB7XG4gIHJldHVyblNlY29uZHM/OiBudW1iZXI7XG4gIHRpbWVvdXRTZWNvbmRzPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRSZXN1bHQge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBjYW5jZWxsZWQ6IGJvb2xlYW47XG4gIG9yZGVySWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUGF5bWVudFN1Y2Nlc3MgPSBQYXltZW50UmVzdWx0ICYge1xuICB0cmFuc2FjdGlvbklkOiBTdHJpbmcsXG4gIHNpZ25hdHVyZTogU3RyaW5nLFxuICBwcm9kdWN0UHJpY2U6IE51bWJlcixcbiAgYW1vdW50V2l0aGRyYXduRnJvbUNhcmQ6IE51bWJlclxufTtcblxuZXhwb3J0IHR5cGUgUGF5bWVudENhbmNlbGxlZCA9IFBheW1lbnRSZXN1bHQ7XG5cbmV4cG9ydCB0eXBlIFBheW1lbnRFcnJvciA9IFBheW1lbnRSZXN1bHQgJiB7XG4gIGVycm9yQ29kZTogbnVtYmVyLFxuICBlcnJvck1lc3NhZ2U6IHN0cmluZ1xufTtcblxuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdNb2JpbGVQYXlBcHBTd2l0Y2gnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLW1vYmlsZXBheS1hcHBzd2l0Y2gnLFxuICBwbHVnaW5SZWY6ICd3aW5kb3cubW9iaWxlcGF5JyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS91bXdlbHRkay9jb3Jkb3ZhLW1vYmlsZXBheS1hcHBzd2l0Y2gnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnLCAnQnJvd3NlciddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2JpbGVQYXlBcHBTd2l0Y2ggZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIEBDb3Jkb3ZhUHJvcGVydHkoKVxuICBpc0FwcFN3aXRjaEluUHJvZ3Jlc3M6IGJvb2xlYW47XG5cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdub2RlJ1xuICB9KVxuICBpc01vYmlsZVBheUluc3RhbGxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIHNldHVwV2l0aE1lcmNoYW50SWQobWVyY2hhbnRJZDogc3RyaW5nLCBtZXJjaGFudFVybFNjaGVtZTogc3RyaW5nLCBvcHRpb25zPzogTW9iaWxlUGF5U2V0dXBPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdub2RlJ1xuICB9KVxuICBiZWdpbk1vYmlsZVBheW1lbnRXaXRoUGF5bWVudChvcmRlcklkOiBzdHJpbmcsIHByb2R1Y3RQcmljZTogbnVtYmVyKTogUHJvbWlzZTxQYXltZW50U3VjY2VzcyB8IFBheW1lbnRDYW5jZWxsZWQgfCBQYXltZW50RXJyb3I+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==