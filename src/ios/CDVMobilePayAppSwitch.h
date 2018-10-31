#import <Cordova/CDVPlugin.h>
#import <MobilePayManager.h>

@interface CDVMobilePayAppSwitch : CDVPlugin
{
    NSString* inflightPaymentCallbackId;
    CDVInvokedUrlCommand* listenerCallback;
}

- (void)attachListener:(CDVInvokedUrlCommand*)command;
- (void)notifyListenerOfProp:(NSString*)prop value:(id)value;

- (void)isMobilePayInstalled:(CDVInvokedUrlCommand*)command;
- (void)setupWithMerchantId:(CDVInvokedUrlCommand*)command;
- (void)beginMobilePaymentWithPayment:(CDVInvokedUrlCommand*)command;
- (void)handleMobilePayPaymentWithUrl:(NSURL*)url;
- (BOOL)assert:(BOOL)predicate
        errorMessage:(NSString*)errorMessage
       command:(CDVInvokedUrlCommand*)command;

@end
