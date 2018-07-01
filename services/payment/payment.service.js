/**
 * users.js
 *
 * @description :: Server-side logic for managing users.
 */

var dcl = require('../../dcl');
var validationEngine = require('../../validation-engine');
const Razorpay = require('razorpay');
var rzp = new Razorpay({
    key_id: 'rzp_test_gTxVpenEBcBVCB',
    key_secret: 'nrGDkGKURLe6jqXQazGcdlWS'
});

module.exports = {

	getTotalPayment: (req, res) => {

		var cb = (response) => {
			if (response.status === 'success') {
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		const condition = {
			company_id: req.user.company_id,
			fromDate: req.fromDate,
			toDate: req.toDate
		}

		dcl.getSumWhere('Payment', condition, cb);
	},

    capture: (req, res) => {

        let response = {};
        let data = req.body;

        validationEngine(data, 'payment', 'create', (isPassed, validationResult) => {
        	if (isPassed) {

        		var cb = (response) => {
					if(response.status === 'success') {
						// do something with data
						response.data = 'Payment captured successfully.'
						res.send(response);
					} else {
						// do something with error
						res.send(response);
					}
				}
       

				rzp.payments.capture(data.razorpay_payment_id, data.amount).then((razorPayData) => {
				    
				    razorPayData.company_id = req.user.company_id;
				    
				    razorPayData.user_id = req.user._id;

				    razorPayData.user_type = req.user.user_type;

				    // success
        			dcl.create(razorPayData, 'Payment', cb);
				        
				    }).catch((error) => {
				        // error
				        var errorObj = {
				        	status: 'error',
				        	data: error
				        };

				        res.send(errorObj);
				    });

        	} else {
        		response.status = 'validationFailed';
        		response.errors = validationResult.errors;
		   		res.status(400).json(response);
        	}
        });
    },

};
