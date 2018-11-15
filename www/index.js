var _isAppSwitchInProgress = false
module.exports = {
  get isAppSwitchInProgress () {
    return _isAppSwitchInProgress
  },
  isMobilePayInstalled: function (cb) {
    exec('isMobilePayInstalled', [], cb)
  },
  setupWithMerchantId: function (merchantId, merchantUrlScheme, cb) {
    if (!(typeof merchantId === 'string')) throw new Error('merchantId must be string')
    if (!(typeof merchantUrlScheme === 'string')) throw new Error('merchantUrlScheme must be string')

    exec('setupWithMerchantId', [merchantId, merchantUrlScheme], cb)
    exec('attachListener', [], function (prop, value) {
      if (prop === 'isAppSwitchInProgress') _isAppSwitchInProgress = value
    })
  },
  beginMobilePaymentWithPayment: function (orderId, productPrice, cb) {
    if (!(typeof orderId === 'string' && orderId.length >= 4)) throw new Error('orderId must be string of at least 4 chars')
    if (!(Number.isFinite(productPrice) && productPrice > 0)) throw new Error('productPrice must be finite and positive')

    exec('beginMobilePaymentWithPayment', [orderId, productPrice], function (err, result) {
      // defer to avoid accidentally blocking the reander thread which is not
      // allowed at least in the obj c plugin model
      setTimeout(function () {
        cb(err, result)
      }, 0)
    })
  }
}

function exec (method, args, cb) {
  return window.cordova.exec(
    onresult,
    onerror,
    'MobilePayAppSwitch',
    method,
    args
  )

  function onresult () {
    cb.apply(cb, [null].concat(Array.prototype.slice.call(arguments)))
    cb = oncalltwice
  }

  function onerror (err) {
    cb(err)
    cb = oncalltwice
  }

  function oncalltwice () {
    console.error('cb called twice')
  }
}
