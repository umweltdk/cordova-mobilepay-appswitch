#import <Cordova/CDV.h>
#import <MobilePayManager.h>
#import "CDVMobilePayAppSwitch.h"

@interface CDVMobilePayAppSwitch () {}
@end

@implementation CDVMobilePayAppSwitch

- (void)attachListener:(CDVInvokedUrlCommand*)command
{
    listenerCallback = command;
    [self notifyListenerOfProp:@"isAppSwitchInProgress" value:@([[MobilePayManager sharedInstance] isAppSwitchInProgress])];
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

    NSString* merchantUrlScheme =  [command argumentAtIndex:1];
    if ([self assert:(merchantUrlScheme != nil) errorMessage:@"Missing merchantUrlScheme" command:command]) return;

    NSDictionary* options = [command argumentAtIndex:2 withDefault:nil andClass:[NSDictionary class]];

    // These ranges come form the disassembled .jar file
    NSNumber* maybeReturnSeconds = [options objectForKey:@"returnSeconds"];
    int returnSeconds = maybeReturnSeconds != nil ? [maybeReturnSeconds intValue] : 5;
    if ([self assert:(returnSeconds >= 0) errorMessage:@"returnSeconds must not be negative" command:command]) return;
    if ([self assert:(returnSeconds <= 9) errorMessage:@"returnSeconds must not be greater than 9s" command:command]) return;

    NSNumber* maybeTimeoutSeconds = [options objectForKey:@"timeoutSeconds"];
    int timeoutSeconds = maybeTimeoutSeconds != nil ? [maybeTimeoutSeconds intValue] : 0;
    if ([self assert:(timeoutSeconds >= 0) errorMessage:@"timeoutSeconds must not be negative" command:command]) return;
    if ([self assert:(timeoutSeconds <= 1200) errorMessage:@"timeoutSeconds must not be greater than 1200s" command:command]) return;

    MobilePayCountry country = MobilePayCountry_Denmark; // TODO make multi country

    [[MobilePayManager sharedInstance]
     setupWithMerchantId:merchantId
     merchantUrlScheme:merchantUrlScheme
     timeoutSeconds:timeoutSeconds
     captureType:MobilePayCaptureType_Reserve // TODO make option
     country:country];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)beginMobilePaymentWithPayment:(CDVInvokedUrlCommand*)command
{
    if ([self assert:([[MobilePayManager sharedInstance] isAppSwitchInProgress] == NO) errorMessage:@"AppSwitch already in progress" command:command]) return;

    NSString* orderId = [command argumentAtIndex:0];
    if ([self assert:(orderId != nil) errorMessage:@"Missing orderId" command:command]) return;
    // As per https://github.com/MobilePayDev/MobilePay-AppSwitch-SDK/wiki/Parameter-specification
    if ([self assert:([orderId length] >= 4) errorMessage:@"Too short orderId (must be at least 4 chars)" command:command]) return;
    if ([self assert:([orderId length] <= 50) errorMessage:@"Too long orderId (must be at most 50 chars)" command:command]) return;

    NSDecimalNumber* productPrice = [command argumentAtIndex:1];
    if ([self assert:(productPrice != nil) errorMessage:@"Missing productPrice" command:command]) return;
    if ([self assert:(productPrice > 0) errorMessage:@"productPrice must be greater than zero" command:command]) return;

    MobilePayPayment* payment = [[MobilePayPayment alloc] initWithOrderId:orderId productPrice:productPrice];

    inflightPaymentCallbackId = command.callbackId;
    inflightOrderId = orderId;

    [[MobilePayManager sharedInstance] beginMobilePaymentWithPayment:payment error:^(MobilePayErrorPayment * _Nonnull error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self notifyListenerOfProp:@"isAppSwitchInProgress" value:@([[MobilePayManager sharedInstance] isAppSwitchInProgress])];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{
              @"orderId": inflightOrderId,
              @"errorCode": [NSNumber numberWithInteger:error.error.code],
              @"errorMessage": [error.error.userInfo valueForKey:NSLocalizedFailureReasonErrorKey],
              @"success": @NO,
              @"cancelled": @NO
            }];

            [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
            inflightPaymentCallbackId = nil;
            inflightOrderId = nil;
        });
    }];

    [self notifyListenerOfProp:@"isAppSwitchInProgress" value:@([[MobilePayManager sharedInstance] isAppSwitchInProgress])];
}

- (void)handleOpenURL:(NSNotification*)notification {
    NSURL* url = [notification object];

    if (![url isKindOfClass: [NSURL class]]) return;

    [self handleMobilePayPaymentWithUrl:url];
}

- (void)handleMobilePayPaymentWithUrl:(NSURL*)url
{
    [[MobilePayManager sharedInstance]handleMobilePayPaymentWithUrl:url success:^(MobilePaySuccessfulPayment * _Nullable payment) {
        [self notifyListenerOfProp:@"isAppSwitchInProgress" value:@([[MobilePayManager sharedInstance] isAppSwitchInProgress])];
        NSDictionary* result = @{@"orderId": payment.orderId,
                                  @"transactionId": payment.transactionId,
                                  @"signature": payment.signature,
                                  @"amountWithdrawnFromCard": payment.amountWithdrawnFromCard,
                                  @"success": @YES,
                                  @"cancelled": @NO};
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
        inflightPaymentCallbackId = nil;
        inflightOrderId = nil;

    } error:^(MobilePayErrorPayment * _Nullable error) {
        [self notifyListenerOfProp:@"isAppSwitchInProgress" value:@([[MobilePayManager sharedInstance] isAppSwitchInProgress])];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{
          @"orderId": inflightOrderId,
          @"errorCode": [NSNumber numberWithInteger:error.error.code],
          @"errorMessage": [error.error.userInfo valueForKey:NSLocalizedFailureReasonErrorKey],
          @"success": @NO,
          @"cancelled": @NO
        }];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
        inflightPaymentCallbackId = nil;
        inflightOrderId = nil;
    } cancel:^(MobilePayCancelledPayment * _Nullable payment) {
        [self notifyListenerOfProp:@"isAppSwitchInProgress" value:@([[MobilePayManager sharedInstance] isAppSwitchInProgress])];
        NSDictionary* result = @{@"orderId": payment.orderId,
                                 @"success": @NO,
                                 @"cancelled": @YES};

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:inflightPaymentCallbackId];
        inflightPaymentCallbackId = nil;
        inflightOrderId = nil;
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
