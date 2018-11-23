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

### `window.mobilepay.setupWithMerchantId(merchantId, merchantUrlScheme, cb(err))`

Initialize MobilePay with your `merchantId` and `merchantUrlScheme`. Merchant id
is provided by MobilePay A/S, the url scheme is iOS only, but must be unique.
For testing a `merchantId` of `APPDK0000000000` can be used.

### `window.mobilepay.beginMobilePaymentWithPayment(orderId, productPrice, cb(err, payment))`

`orderId` must be globally unique as it is a mechanism from MobilePay to prevent
double payments in case of failure. Two identical `orderId`s created more than
24 hours apart will get different transaction id's, but still be considered the
same order.

Payment will be an object of:

```js
{
  // These properties are always present
  orderId: String,
  success: Boolean,
  cancelled: Boolean,

  // These properties are only present if success === false (cancelled is always the negation of success)
  transactionId: String,
  signature: String,
  productPrice: Number,
  amountWithdrawnFromCard: Number

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

## License

[ISC](LICENSE)
