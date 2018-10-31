# `cordova-mobilepay-appswitch`

>

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

### `window.mobilepay.isMobilePayInstalled(cb(err, isInstalled))`

### `window.mobilepay.setupWithMerchantId(merchantId, merchantUrlScheme, cb(err))`

### `window.mobilepay.beginMobilePaymentWithPayment(orderId, productPrice, cb(err, payment))`

`orderId` must be globally unique as it is a mechanism from MobilePay to prevent
double payments in case of failure. Two identical `orderId`s created more than
24 hours apart will get different transaction id's, but still be considered the
same order.

## Install

```sh
npm install cordova-mobilepay-appswitch
```

## License

[ISC](LICENSE)
