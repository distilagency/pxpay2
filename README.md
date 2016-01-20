[![Build Status](https://travis-ci.org/Kevnz/pxpay.png?branch=master)](https://travis-ci.org/Kevnz/pxpay)

pxpay
=====
This is fork from https://github.com/Kevnz/pxpay

Added aditional feature of parsing results of DPS transaction

PxPay implementation for node.js
Initial URL Request
```
var pxpay = require('pxpay2');
pxpay.request({
    user: 'TestAccount',
    password: 'password',
    amount: '1.00',
    reference: 'Test',
    TxnId: 'test-' + Date.now(),
    addCard: 1,
    successURL: 'http://example.com/success',
    failURL: 'http://example.com/fail'
}, function submitcallback (err, result) {

    result.$.valid; //=== 1

});
```

Parsing DPS Return results
```
var pxpay = require('pxpay2');
pxpay.request({
    user: 'TestAccount',
    password: 'password',
    Response: 'encrypted-token-result-from-dps'
}, function submitcallback (err, result) {

    result.$.valid; //=== 1

});
```
