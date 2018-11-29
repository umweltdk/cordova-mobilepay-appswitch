package com.github.emilbayes.CDVMobilePayAppSwitch;

import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Random;

import dk.danskebank.mobilepay.sdk.Country;
import dk.danskebank.mobilepay.sdk.MobilePay;
import dk.danskebank.mobilepay.sdk.ResultCallback;
import dk.danskebank.mobilepay.sdk.model.FailureResult;
import dk.danskebank.mobilepay.sdk.model.Payment;
import dk.danskebank.mobilepay.sdk.model.SuccessResult;


public class CDVMobilePayAppSwitch extends CordovaPlugin {
    private CallbackContext _listenerCallback;
    private final Object _listenerCallbackLock = new Object();
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
        boolean isInstalled = MobilePay.getInstance().isMobilePayInstalled(this.cordova.getActivity().getApplicationContext(), country);
        callbackContext.sendPluginResult(new PluginResult(Status.OK, isInstalled));

        return true;
    }

    protected boolean attachListener(JSONArray args, CallbackContext callbackContext) throws JSONException {
        synchronized(_listenerCallbackLock) {
            _listenerCallback = callbackContext;
        }
        notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
        return true;
    }

    protected void notifyListenerOfProp (String prop, Object value) {
        synchronized(_listenerCallbackLock) {
            try {
                PluginResult result = new PluginResult(Status.OK, new JSONArray(new Object[]{prop, value}));
                result.setKeepCallback(true);
                _listenerCallback.sendPluginResult(result);
            } catch (JSONException ex) {
                PluginResult result = new PluginResult(Status.ERROR, "Unable to serialize prop notification");
                result.setKeepCallback(true);
                _listenerCallback.sendPluginResult(result);
            }
        }
    }

    protected boolean setupWithMerchantId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String merchantId = args.getString(0);

        // Unused by Android
        // String merchantUrlScheme = args.getString(1)

        JSONObject options = args.getJSONObject(2);
        if (options == null) options = new JSONObject(); // Just so we dont have to handle this case

        Country country = Country.DENMARK;

        MobilePay.getInstance().init(merchantId, country);

        int returnSeconds = options.optInt("returnSeconds", 5);
        if (returnSeconds < 0) {
            callbackContext.error("returnSeconds must not be negative");
            return false;
        }
        if (returnSeconds > 9) {
            callbackContext.error("returnSeconds must not be greater than 9s");
            return false;
        }

        int timeoutSeconds = options.optInt("timeoutSeconds", 0);
        if (timeoutSeconds < 0) {
            callbackContext.error("timeoutSeconds must not be negative");
            return false;
        }
        if (timeoutSeconds > 1200) {
            callbackContext.error("timeoutSeconds must not be greater than 1200s");
            return false;
        }

        MobilePay.getInstance().setReturnSeconds(returnSeconds);
        MobilePay.getInstance().setTimeoutSeconds(timeoutSeconds);

        callbackContext.sendPluginResult(new PluginResult(Status.OK, true));

        return true;
    }

    protected boolean beginMobilePaymentWithPayment(JSONArray args, CallbackContext callbackContext) throws JSONException {
        MOBILEPAY_PAYMENT_REQUEST_CODE = this.srand.nextInt(65535) + 1;

        String orderId = args.getString(0);
        if (orderId.getBytes().length < 4) {
            callbackContext.error("Too short orderId (must be at least 4 chars)");
            return false;
        }

        if (orderId.getBytes().length > 50) {
            callbackContext.error("Too long orderId (must be at most 50 chars)");
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
        cordova.setActivityResultCallback (this);
        cordova.startActivityForResult(this, paymentIntent, MOBILEPAY_PAYMENT_REQUEST_CODE);
        notifyListenerOfProp("isAppSwitchInProgress", MobilePay.getInstance().hasActivePayment());
        _inflightOrderId = orderId; // need to fake this one on Android
        _inflightPaymentCallback = callbackContext;

        return true;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == MOBILEPAY_PAYMENT_REQUEST_CODE) {
            MOBILEPAY_PAYMENT_REQUEST_CODE = 0;

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

                        _inflightPaymentCallback.success(map);
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
                    try {
                        JSONObject map = new JSONObject();
                        map.put("success", false);
                        map.put("cancelled", false);
                        map.put("orderId", result.getOrderId());
                        map.put("errorCode", result.getErrorCode());
                        map.put("errorMessage", result.getErrorMessage());

                        _inflightPaymentCallback.success(map);
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

                        _inflightPaymentCallback.success(map);
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
}
