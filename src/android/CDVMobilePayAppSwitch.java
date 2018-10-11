package com.github.emilbayes.CDVMobilePayAppSwitch;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

public class CDVMobilePayAppSwitch extends CordovaPlugin {
    @Override
    public void initialize(final CordovaInterface cordova, final CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
      if (action.equals("isMobilePayInstalled")) return isMobilePayInstalled(args, callbackContext);

      callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
      return false;
    }

    protected boolean isMobilePayInstalled(JSONArray args, CallbackContext callbackContext) throws JSONException {
        callbackContext.success(Long.toString(10000));

        return true;
    }

    private static PluginResult OK(Map obj) throws JSONException {
        return createPluginResult(obj, PluginResult.Status.OK);
    }

    private static PluginResult ERROR(Map obj) throws JSONException {
        return createPluginResult(obj, PluginResult.Status.ERROR);
    }

    private static PluginResult createPluginResult(Map map, PluginResult.Status status) throws JSONException {
        JSONObject json = new JSONObject(map);
        PluginResult result = new PluginResult(status, json);
        return result;
    }
}
