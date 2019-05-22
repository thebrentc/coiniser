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
    }
    
    /* Basic test facility taking array of input and required output values */
    var test = function(
        inputs = ['123p','£15.62'], 
        outputs = ['1 x £1, 1 x 20p, 1 x 2p, 1 x 1p','7 x £2, 1 x £1, 1 x 50p, 1 x 10p, 1 x 2p']
        ) {
            // set up timer-based testing to populate form, pseudo-submit and check result for each test item
            for (let c = 0; c < inputs.length; c++) {            
                window.setTimeout(function() {
                    console.log("Testing " + inputs[c]);
                    document.getElementById(amountId).setAttribute('value',inputs[c]);                    
                    // from JS, need to call handler directly rather than submitting form
                    coinise(); 
                    // check results
                    if (document.getElementById(replyId).getAttribute('value') === outputs[c]) {
                        console.log("Pass");
                    } else {
                        console.log("Fail");
                    }
                }, 1000 + (c * 1000));
            }            
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
