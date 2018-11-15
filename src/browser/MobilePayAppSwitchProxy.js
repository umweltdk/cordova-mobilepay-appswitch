var listenerCallback = null

var merchant = null

module.exports = {
  attachListener (success, error, args) {
    listenerCallback = { error, success }
  },
  notifyListenerOfProp (prop, value) {
    listenerCallback.success(prop, value)
  },
  isMobilePayInstalled (success, error, args) {
    return success(true)
  },
  setupWithMerchantId (success, error, args) {
    var merchantId = args[0]
    if (merchantId == null) return error(new Error('Missing merchantId'))

    var merchantUrlScheme = args[0]
    if (merchantUrlScheme == null) return error(new Error('Missing merchantUrlScheme'))

    var country = 'Denmark'

    merchant = { merchantId, merchantUrlScheme, country }

    return success()
  },
  beginMobilePaymentWithPayment (success, error, args) {
    if (merchant == null) return error(new Error('Uninitialised'))

    var orderId = args[0]
    if (orderId == null) return error(new Error('Missing orderId'))
    if (orderId.length < 4) return error(new Error('Too short orderId'))
    if (orderId.length > 66) return error(new Error('Too long orderId'))

    var productPrice = args[1]
    if (productPrice == null) return error(new Error('Missing productPrice'))
    if (productPrice < 0) return error(new Error('productPrice must be greater than zero'))

    module.exports.notifyListenerOfProp('isAppSwitchInProgress', true)

    var didPay = window.confirm('Pay "' + productPrice + '" for "' + orderId + '" to ' + merchant.merchantId)

    module.exports.notifyListenerOfProp('isAppSwitchInProgress', false)
    if (didPay === true) {
      return success({
        orderId,
        transactionId: '169b0c6d-8d50-4dd5-92e0-d01f71535d76',
        signature: 'some-logn-base64-blob',
        productPrice,
        amountWithdrawnFromCard: productPrice,
        success: true,
        cancelled: false
      })
    } else {
      return success({
        orderId,
        success: false,
        cancelled: true
      })
    }
  }
  // handleMobilePayPaymentWithUrl (success, error, args) {}
}

require('cordova/exec/proxy').add('MobilePayAppSwitch', module.exports)
