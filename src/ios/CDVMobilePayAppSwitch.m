#import <Cordova/CDV.h>
#import <MobilePayManager.h>
#import "CDVMobilePayAppSwitch.h"

@interface CDVMobilePayAppSwitch () {}
@end

@implementation CDVMobilePayAppSwitch

- (void)attachListener:(CDVInvokedUrlCommand*)command
{
    listenerCallback = command;
}

- (void)notifyListenerOfProp:(NSString*)prop
                       value:(id)value
{
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"prop": prop, @"value": value}];
        [pluginResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:listenerCallback.callbackId];
    });
}

- (void)isMobilePayInstalled:(CDVInvokedUrlCommand*)command
{
    MobilePayCountry country = MobilePayCountry_Denmark; // TODO make multi country

    BOOL isInstalled = [[MobilePayManager sharedInstance] isMobilePayInstalled:country];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:isInstalled];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setupWithMerchantId:(CDVInvokedUrlCommand*)command
{

    NSString* merchantId = [command argumentAtIndex:0];
    if ([self assert:(merchantId != nil) errorMessage:@"Missing merchantId" command:command]) return;

    NSString* merchantUrlScheme = [command argumentAtIndex:1];
    if ([self assert:(merchantUrlScheme != nil) errorMessage:@"Missing merchantUrlScheme" command:command]) return;

    MobilePayCountry country = MobilePayCountry_Denmark; // TODO make multi country

    // TODO handle the many arities of this method
    [[MobilePayManager sharedInstance]
     setupWithMerchantId:merchantId
     merchantUrlScheme:merchantUrlScheme
     country:country];

    [[MobilePayManager sharedInstance] setReturnSeconds:0];
    [[MobilePayManager sharedInstance] setTimeoutSeconds:5];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)beginMobilePaymentWithPayment:(CDVInvokedUrlCommand*)command
{
    if ([self assert:([[MobilePayManager sharedInstance] isAppSwitchInProgress] == NO) errorMessage:@"AppSwitch already in progress" command:command]) return;

    NSString* orderId = [command argumentAtIndex:0];
    if ([self assert:(orderId != nil) errorMessage:@"Missing orderId" command:command]) return;
    // As per https://github.com/MobilePayDev/MobilePay-AppSwitch-SDK/wiki/Parameter-specification
    if ([self assert:([orderId length] >= 4) errorMessage:@"Too short orderId (must be 4 chars)" command:command]) return;

    NSNumber* productPrice = [command argumentAtIndex:1];
    if ([self assert:(productPrice != nil) errorMessage:@"Missing productPrice" command:command]) return;
    if ([self assert:([productPrice floatValue] > 0) errorMessage:@"productPrice must be greater than zero" command:command]) return;

    MobilePayPayment* payment = [[MobilePayPayment alloc] initWithOrderId:orderId productPrice:[productPrice floatValue]];

    inflightPaymentCallbackId = command.callbackId;

    [[MobilePayManager sharedInstance] beginMobilePaymentWithPayment:payment error:^(NSError * _Nonnull error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error.userInfo];

            [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
            inflightPaymentCallbackId = nil;
        });
    }];
}

- (void)handleOpenURL:(NSNotification*)notification {
    NSURL* url = [notification object];

    if (![url isKindOfClass: [NSURL class]]) return;

    [self handleMobilePayPaymentWithUrl:url];
}

- (void)handleMobilePayPaymentWithUrl:(NSURL*)url
{
    [[MobilePayManager sharedInstance]handleMobilePayPaymentWithUrl:url success:^(MobilePaySuccessfulPayment * _Nullable payment) {

        NSDictionary* result = @{@"orderId": payment.orderId,
                                  @"transactionId": payment.transactionId,
                                  @"signature": payment.signature,
                                  @"productPrice": @(payment.productPrice),
                                  @"amountWithdrawnFromCard": @(payment.amountWithdrawnFromCard)};
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
        inflightPaymentCallbackId = nil;

    } error:^(NSError * _Nonnull error) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:error.userInfo];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
        inflightPaymentCallbackId = nil;
    } cancel:^(MobilePayCancelledPayment * _Nullable payment) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:NO];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
        inflightPaymentCallbackId = nil;
    }];
}

- (BOOL)assert:(BOOL)predicate
        errorMessage:(NSString*)errorMessage
        command:(CDVInvokedUrlCommand*)command
{
  if (predicate == YES) return NO;

  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                   messageAsString:errorMessage];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

  return YES;
}

@end
