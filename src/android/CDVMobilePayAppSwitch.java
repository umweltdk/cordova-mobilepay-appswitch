package com.github.emilbayes.CDVMobilePayAppSwitch;

import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Map;
import java.util.Random;

import dk.danskebank.mobilepay.sdk.CaptureType;
import dk.danskebank.mobilepay.sdk.Country;
import dk.danskebank.mobilepay.sdk.MobilePay;
import dk.danskebank.mobilepay.sdk.ResultCallback;
import dk.danskebank.mobilepay.sdk.model.FailureResult;
import dk.danskebank.mobilepay.sdk.model.Payment;
import dk.danskebank.mobilepay.sdk.model.SuccessResult;


public class CDVMobilePayAppSwitch extends CordovaPlugin {
    private CallbackContext _listenerCallback;
    private CallbackContext _inflightPaymentCallback;
    private String _inflightOrderId;
    private int MOBILEPAY_PAYMENT_REQUEST_CODE = 0;

    private Random srand;

    @Override
    public void initialize(final CordovaInterface cordova, final CordovaWebView webView) {
        super.initialize(cordova, webView);

        this.srand = new SecureRandom();
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("isMobilePayInstalled")) return isMobilePayInstalled(args, callbackContext);
        if (action.equals("attachListener")) return attachListener(args, callbackContext);
        if (action.equals("setupWithMerchantId")) return setupWithMerchantId(args, callbackContext);
        if (action.equals("beginMobilePaymentWithPayment")) return beginMobilePaymentWithPayment(args, callbackContext);

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
        return false;
    }

    protected boolean isMobilePayInstalled(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Country country = Country.DENMARK; // TODO make multi country
        callbackContext.sendPluginResult(OK(MobilePay.getInstance().isMobilePayInstalled(this.cordova.getActivity().getApplicationContext(), country)));

        return true;
    }

    protected boolean attachListener(JSONArray args, CallbackContext callbackContext) throws JSONException {
        _listenerCallback = callbackContext;
        notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
        return true;
    }

    protected boolean notifyListenerOfProp (String prop, Object value) {
        cordova.getActivity().runOnUiThread(() -> {
            try {
                PluginResult result = OK(new Object[]{prop, value});
                result.setKeepCallback(true);
                _listenerCallback.sendPluginResult(result);
            } catch (JSONException ex) {
                _listenerCallback.error("Unable to serialize prop notification");
            }
        });

        return true;
    }

    protected boolean setupWithMerchantId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String merchantId = args.getString(0);

        // Unused by Android
        // String merchantUrlScheme = args.getString(1)

        Country country = Country.DENMARK;

        MobilePay.getInstance().init(merchantId, country);
        callbackContext.sendPluginResult(OK(null));

        return true;
    }

    protected boolean beginMobilePaymentWithPayment(JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.MOBILEPAY_PAYMENT_REQUEST_CODE = this.srand.nextInt();

        String orderId = args.getString(0);
        if (orderId.getBytes().length < 4) {
            callbackContext.error("Too short orderId");
            return false;
        }
        if (orderId.getBytes().length > 66) {
            callbackContext.error("Too long orderId");
            return false;
        }

        double productPrice = args.getDouble(1);
        if (productPrice < 0) {
            callbackContext.error("productPrice must be greater than zero");
            return false;
        }

        // MobilePay is present on the system. Create a Payment object.
        Payment payment = new Payment();
        payment.setProductPrice(new BigDecimal(productPrice));
        payment.setOrderId(orderId);

        // Create a payment Intent using the Payment object from above.
        Intent paymentIntent = MobilePay.getInstance().createPaymentIntent(payment);

        // We now jump to MobilePay to complete the transaction. Start MobilePay and wait for the result using an unique result code of your choice.
        cordova.getActivity().startActivityForResult(paymentIntent, this.MOBILEPAY_PAYMENT_REQUEST_CODE);
        this.notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
        _inflightOrderId = orderId; // need to fake this one on Android
        _inflightPaymentCallback = callbackContext;

        return true;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == this.MOBILEPAY_PAYMENT_REQUEST_CODE) {
            this.MOBILEPAY_PAYMENT_REQUEST_CODE = 0;

            // The request code matches our MobilePay Intent
            MobilePay.getInstance().handleResult(resultCode, data, new ResultCallback() {
                @Override
                public void onSuccess(SuccessResult result) {
                    notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
                    try {
                        JSONObject map = new JSONObject();
                        map.put("success", true);
                        map.put("cancelled", false);
                        map.put("orderId", result.getOrderId());
                        map.put("productPrice", 10);
                        map.put("amountWithdrawnFromCard", result.getAmountWithdrawnFromCard());
                        map.put("transactionId", result.getTransactionId());
                        map.put("signature", result.getSignature());

                        _inflightPaymentCallback.sendPluginResult(OK(map));
                    } catch (JSONException ex) {
                        _inflightPaymentCallback.error("Unable to serialise success result");
                    } finally {
                        _inflightPaymentCallback = null;
                        _inflightOrderId = null;
                    }
                }
                @Override
                public void onFailure(FailureResult result) {
                    notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
                    notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
                    try {
                        JSONObject map = new JSONObject();
                        map.put("success", false);
                        map.put("cancelled", false);
                        map.put("orderId", result.getOrderId());
                        map.put("errorCode", result.getErrorCode());
                        map.put("errorMessage", result.getErrorMessage());

                        _inflightPaymentCallback.sendPluginResult(OK(map));
                    } catch (JSONException ex) {
                        _inflightPaymentCallback.error("Unable to serialise error result");
                    } finally {
                        _inflightPaymentCallback = null;
                        _inflightOrderId = null;
                    }
                }
                @Override
                public void onCancel() {
                    notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
                    try {
                        JSONObject map = new JSONObject();
                        map.put("success", false);
                        map.put("cancelled", true);
                        map.put("orderId", _inflightOrderId);

                        _inflightPaymentCallback.sendPluginResult(OK(map));
                    } catch (JSONException ex) {
                        _inflightPaymentCallback.error("Unable to serialise cancel result");
                    } finally {
                        _inflightPaymentCallback = null;
                        _inflightOrderId = null;
                    }
                }
            });
        }
    }

    private static PluginResult OK(Object obj) throws JSONException {
        return createPluginResult(obj, PluginResult.Status.OK);
    }

    private static PluginResult ERROR(Object obj) throws JSONException {
        return createPluginResult(obj, PluginResult.Status.ERROR);
    }

    private static PluginResult createPluginResult(Object obj, PluginResult.Status status) throws JSONException {
        JSONArray json = new JSONArray(obj);
        PluginResult result = new PluginResult(status, json);
        return result;
    }
}
