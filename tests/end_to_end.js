/*
Request XML

<GenerateRequest>
  <PxPayUserId>TestAccount</PxPayUserId>
  <PxPayKey>dc339b3126c8fbadf4b30b498ded6a62a17b5f831e3111116bd8e332c730bbc8</PxPayKey>
  <AmountInput>2.06</AmountInput>
  <CurrencyInput>NZD</CurrencyInput>
  <MerchantReference>Test Transaction</MerchantReference>
  <EmailAddress></EmailAddress>
  <TxnData1>28 Grange Rd</TxnData1>
  <TxnData2>Auckland</TxnData2>
  <TxnData3>NZ</TxnData3>
  <TxnType>Purchase</TxnType>
  <TxnId>P777575CA3DDA78C</TxnId>
  <BillingId></BillingId>
  <EnableAddBillCard>0</EnableAddBillCard>
  <UrlSuccess>http://www.mycompany.com/success.cfm</UrlSuccess>
  <UrlFail>http://www.mycompany.com/fail.cfm</UrlFail>
  <Opt>TO=0901142221</Opt>
</GenerateRequest>

        var dpsData = {
            GenerateRequest: [
                { PxPayUserId: details.user },
                { PxPayKey: details.password },
                { TxnType: details.transactionType || 'Purchase' },
                { AmountInput: details.amount },
                { CurrencyInput: details.currency || 'NZD' },
                { MerchentReference: details.reference },
                { TxnData1: details.line1 },
                { TxnData2: details.line2 },
                { TxnData3: details.line3 },
                { EmailAddress: details.email },
                { TxnId: details.transactionId || '' },
                { BillingId: details.billingId },
                { EnableAddBillCard: details.addCard },
                { UrlSuccess: details.successURL },
                { UrlFail: details.failURL }
            ]
        };


<Request valid="1">
  <URI>https://sec.paymentexpress.com/pxpay/pxpay.aspx?userid=TestAccount
&request=e88cd9f2f6f301c712ae2106ab2b6137d86e954d2163d1042f73cce130b2c 88c06daaa226629644dc741b16deb77ca14ce4c59db84929eb0280837b92bd2ffec 2fae0b9173c066dab48a0b6d2c0f1006d4d26a8c75269196cc540451030958d257c1 86f587ad92cfa7472b101ef72e45cda3bf905862c2bf58fc214870292d6646f7c4ad 02a75e42fc64839fc50cea8c17f65c6a9b83b9c124e2f20844b63538e13a8cff17ec d8f165aee525632fd3661b591626f5fb77725ade21648fed94553f43bfa69acf3557 0ff8fdcbaf8a13a3fa7deb244017e41749e652a3549a5dbe20c6c3a7a66aa5901e3f 87150f7fc</URI>
</Request>

*/
var expect = require('chai').expect
var proxyquire = require('proxyquire');

var returnedRequest = '<Request valid="1"><URI>https://sec.paymentexpress.com/pxpay/pxpay.aspx?userid=TestAccount&amp;request=e88cd9f2f6f301c712ae2106ab2b6137d86e954d2163d1042f73cce130b2c 88c06daaa226629644dc741b16deb77ca14ce4c59db84929eb0280837b92bd2ffec 2fae0b9173c066dab48a0b6d2c0f1006d4d26a8c75269196cc540451030958d257c1 86f587ad92cfa7472b101ef72e45cda3bf905862c2bf58fc214870292d6646f7c4ad 02a75e42fc64839fc50cea8c17f65c6a9b83b9c124e2f20844b63538e13a8cff17ec d8f165aee525632fd3661b591626f5fb77725ade21648fed94553f43bfa69acf3557 0ff8fdcbaf8a13a3fa7deb244017e41749e652a3549a5dbe20c6c3a7a66aa5901e3f 87150f7fc</URI></Request>';
var returnedResponse = '<Response valid="1"><AmountSettlement>10000.00</AmountSettlement><AuthCode>140031</AuthCode><CardName>Visa</CardName><CardNumber>411111........11</CardNumber><DateExpiry>0116</DateExpiry><DpsTxnRef>000000031799d8d5</DpsTxnRef><Success>1</Success><ResponseText>APPROVED</ResponseText><DpsBillingId></DpsBillingId><CardHolderName>TEST</CardHolderName><CurrencySettlement>NZD</CurrencySettlement><TxnData1></TxnData1><TxnData2>Owner Contact Name_test@buddybid.com_0800Buddybid</TxnData2><TxnData3></TxnData3><TxnType>Purchase</TxnType><CurrencyInput>NZD</CurrencyInput><MerchantReference></MerchantReference><ClientInfo>116.193.147.58</ClientInfo><TxnId>P0B7D48CE8FCC88D</TxnId><EmailAddress>test@buddybid.com</EmailAddress><BillingId></BillingId><TxnMac>2BC20210</TxnMac><CardNumber2></CardNumber2><DateSettlement>20160120</DateSettlement><IssuerCountryId>0</IssuerCountryId><Cvc2ResultCode>NotUsed</Cvc2ResultCode><ReCo>00</ReCo><ProductSku></ProductSku><ShippingName></ShippingName><ShippingAddress></ShippingAddress><ShippingPostalCode></ShippingPostalCode><ShippingPhoneNumber></ShippingPhoneNumber><ShippingMethod></ShippingMethod><BillingName></BillingName><BillingPostalCode></BillingPostalCode><BillingAddress></BillingAddress><BillingPhoneNumber></BillingPhoneNumber><PhoneNumber></PhoneNumber><AccountInfo></AccountInfo></Response>';

describe('requestGeneration', function() {

  it('request object should return result', function(done) {
    var pxpay = proxyquire('../index.js', { 'request' : function (opts, callback) {
      callback(null, null, returnedRequest);
    }});

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
        console.log(result);
        console.log('that was the result from px');
        expect(err).to.be.null;
        expect(result.$.valid).to.equal('1');
        done();
    });
        
  });

    it('request response object should return result', function(done) {
        var pxpay = proxyquire('../index.js', { 'request' : function (opts, callback) {
            callback(null, null, returnedResponse);
        }});

        pxpay.parseResults({
            user: 'TestAccount',
            password: 'password',
            response: '0000030032534793003fd4ca40de75bb'
        }, function submitcallback(err, result) {
            console.log(result);
            console.log('that was the result from px');
            expect(err).to.be.null;
            expect(result.$.valid).to.equal('1');
            done();
        });

    });
});
