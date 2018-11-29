# `cordova-mobilepay-appswitch`

> Cordova plugin for MobilePay AppSwitch

## Usage

```js
window.mobilepay.isMobilePayInstalled(onisinstalled)

function onisinstalled (err, isinstalled) {
  if (err) throw err // fatal error
  if (!isinstalled) return // Could open appstore to mobilepay installation

  window.mobilepay.setupWithMerchantId('APPDK0000000000', 'umwdev', onsetup)
}

function onsetup (err) {
  if (err) throw err // Fatal error

  var orderid = 'Order ID should be between 4 and 50 bytes (not same as string.length)'
  var price = 100.123 // Be careful with decimals. Doubles are not great for money
  window.mobilepay.beginMobilePaymentWithPayment(orderid, price, onpayment)
}

function onpayment (err, payment) {
  if (err) throw err // fatal error

  console.log(payment)
}
```

## API

### `window.mobilepay.isAppSwitchInProgress`

Property indicating whether a payment is in progress. Any MobilePay method while
this is happening will most likely cause an error.

### `window.mobilepay.isMobilePayInstalled(cb(err, isInstalled))`

Check if the MobilePay (Denmark) app is installed.

### `window.mobilepay.setupWithMerchantId(merchantId, merchantUrlScheme, [options], cb(err))`

Initialize MobilePay with your `merchantId` and `merchantUrlScheme`. Merchant id
is provided by MobilePay A/S, the url scheme is iOS only, but must be unique.
For testing a `merchantId` of `APPDK0000000000` can be used.

`options` include:

* `returnSeconds`: How long is the MobilePay receipt shown. Default `5` seconds.
  Allowed range is `0` - `9`, both inclusive.
* `timeoutSeconds`: How long is the user given before the payment errors.
  Default `0` seconds (infinite). Allowed range is `0` - `1200`, both inclusive.

### `window.mobilepay.beginMobilePaymentWithPayment(orderId, productPrice, cb(err, payment))`

`orderId` must be globally unique as it is a mechanism from MobilePay to prevent
double payments in case of failure. Two identical `orderId`s created more than
24 hours apart will get different transaction id's, but still be considered the
same order. Notice that `err` is not a Javascript `Error` object, but the below
object with `success === false`, `cancelled === false` and the `errorCode` and
`errorMessage` properties set.

Payment will be an object of:

```js
{
  // These properties are always present
  orderId: String,
  success: Boolean,
  cancelled: Boolean,

  // These properties are only present if
  // success === true && cancelled === false
  // (cancelled is always the negation of success)
  transactionId: String,
  signature: String,
  productPrice: Number,
  amountWithdrawnFromCard: Number

  // These properties are only present when called on err
  errorCode: Number,
  errorMessage: String
}
```

Errors are documented here: https://github.com/MobilePayDev/MobilePay-AppSwitch-SDK/wiki/Error-handling

## Install

```sh
cordova plugins add cordova-mobilepay-appswitch \
  --variable WIDGET_ID=io.cordova.hellocordova \ # Replace this with your id
  --variable URL_SCHEME=hellocordova # Replace this with your unique identifier (iOS only)
```

## Known Issues

MobilePay AppSwitch SDK does not list any known issues, however during the
development of this plugin, several issues have been found and reported to
MobilePay, but are deemed "not a priority" by MobilePay:

* On iOS MobilePay SDK represents prices as `float` and not `double`, which
  means that prices such as `1.26` become `1.259999…`
* The MobilePay list of error codes is not exhaustive. For example on iOS you
  may sometimes get `errorCode` `1001` due to technical errors.
* Sometimes the AppSwitch may fail if any Javascript errors happen after
  `beginMobilePaymentWithPayment` but before the AppSwitch happened. This will
  still open the MobilePay app, but not show any AppSwitch, while the SDK in
  the origin app is in the `isAppSwitchInProgress === true` state. There is no
  API to force clear this state, except restart the origin app.
* The previous error has also been observed when switching back and fourth
  between the origin app and MobilePay.
* The Android JAR file is included in this repository as it is not available on
  any public package manager. The iOS SDK is downloaded from CocoaPods
## License

[ISC](LICENSE)
