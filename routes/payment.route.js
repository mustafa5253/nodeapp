// var request = require('request');

// function payWithRazor() {
//     request({
//         method: 'POST',
//         url: 'https://rzp_test_gTxVpenEBcBVCB:nrGDkGKURLe6jqXQazGcdlWS@api.razorpay.com/v1/payments/pay_9OOcOEWe8bpW6T/capture',
//         form: {
//           amount: 100 * 100
//         }
//       }, function (error, response, body) {
//         console.log('Status:', response.statusCode);
//         console.log('Headers:', JSON.stringify(response.headers));
//         console.log('Response:', body);
//       });
// };




// payment_id = 'pay_9OOcOEWe8bpW6T'

const Razorpay = require('razorpay');

var rzp = new Razorpay({
    key_id: 'rzp_test_gTxVpenEBcBVCB',
    key_secret: 'nrGDkGKURLe6jqXQazGcdlWS'
});


function payWithRazor(req, res, next) {
    // Capture a particular payment
    rzp.payments.capture('pay_9OOAbY3X3nfzaV', 1000).then((data) => {
        // success
        console.log('the Success data is :', data);
        next();
    }).catch((error) => {
        // error
        console.log('the Error is :', error);
        next();            
    });
}



module.exports = payWithRazor;


// {
// 	"id": "pay_9OOcOEWe8bpW6T",
// 	"entity": "payment",
// 	"amount": 10000,
// 	"currency": "INR",
// 	"status": "captured",
// 	"order_id": null,
// 	"invoice_id": null,
// 	"international": false,
// 	"method": "netbanking",
// 	"amount_refunded": 0,
// 	"refund_status": null,
// 	"captured": true,
// 	"description": "A test transaction by apmeena",
// 	"card_id": null,
// 	"bank": "SBIN",
// 	"wallet": null,
// 	"vpa": null,
// 	"email": "apnodedev@gmail.com",
// 	"contact": "+911234567890",
// 	"notes": {
// 		"address": "This is some dummy address"
// 	},
// 	"fee": 236,
// 	"tax": 36,
// 	"error_code": null,
// 	"error_description": null,
// 	"created_at": 1515695040
// }


// {
//     statusCode: 400,
//         error:
//     {
//         code: 'BAD_REQUEST_ERROR',
//             description: 'This payment has already been captured'
//     }
// }
  
