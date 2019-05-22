/**  Coiniser module, taking HTML form, input and output elements as parameters **/
var Coiniser = function(formId, amountId, replyId) {

    /* Initialise, adding handler to form */
    var init = function() {
        document.getElementById(formId).addEventListener("submit", function(event) {
            // override default submit
            event.preventDefault();
            event.stopPropagation();
            // invoke main request handler
            coinise();            
        });
    }
    init();
    
    /* Controller function linked to form submission */
    var coinise = function() {
        // ...
    }
    
    /* Basic test facility taking array of input and required output values */
    var test = function(
        inputs = ['123p','£15.62'], 
        outputs = ['1 x £1, 1 x 20p, 1 x 2p, 1 x 1p','7 x £2, 1 x £1, 1 x 50p, 1 x 10p, 1 x 2p']
        ) {
            // ...            
        });
    }
    
    /* export test function for availability */
    return { 
        test : test
    }

}

/* invoke coiniser with page elements as parameters */
var coiniser = new Coiniser('request','amount','reply');

/* optional, run tests */
coiniser.test();
