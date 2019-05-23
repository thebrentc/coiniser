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
        let amount = document.getElementById(amountId).value;
        
        // validate input, return if invalid
        if (!validateCurrency(amount)) {
            document.getElementById(replyId).innerHTML = "Sorry, invalid value";
            return;
        }
        
        // compute coin mix
        let coinages = coinage(amount);
        
        // format and output
        let reply = "";        
        for (var [coin, count] of Object.entries(coinages)) {            
            if (count > 0) {
                reply += (count + " x " + coin + ", ");
            }
        }
        reply = reply.substr(0, reply.length-2); // remove extra comma
        document.getElementById(replyId).innerHTML = reply;
    }
    
    /* Const array of Stirling coins */
    var coins = ['£2', '£1', '50p', '20p', '10p', '5p', '2p', '1p' ];
    
    /* Core function to compute optimal coin mix for parameter currency amount */
    /* Returns object array: { '£2' => n, '£1' = n, ... } */
    var coinage = function(currency) {        
        let coinage = {}; // for return
        
        // loop through coins, populating coinage for return and decreasing remaining total until zero
        let total = parsePennies(currency);        
        let denomination = 0;
        while (total !== 0 && denomination < coins.length) {
            let coin = coins[denomination];
            let coinpennies = parsePennies(coin);
            // integer quotient from division is number of denomination coin required  
            coinage[coin] = parseInt(total / coinpennies);
            // remainder is the remaining total
            total = total % coinpennies;
            // move to next coin denomination
            denomination++;
        }

        return coinage;
    }

    /* Validates format as Stirling currency for currency parameter */
    var validateCurrency = function(currency) {
        if (!currency 
            || currency.match(/^£?[\d\.]+p?$/g) === null // basic currency structure            
            || (currency.match(/\./g) !== null && currency.match(/\./g).length > 1) // and not more than one decimal point
        ) 
        {                
            return false;
        } else {
            return true;
        }
    }
    
    /* Const array of Stirling coins */
    var coins = ['£2', '£1', '50p', '20p', '10p', '5p', '2p', '1p' ];
    
    /* Core function to compute optimal coin mix for parameter currency amount */
    /* Returns object array: { '£2' => n, '£1' = n, ... } */
    var coinage = function(currency) {        
        let coinage = {}; // for return
        
        // loop through coins, populating coinage for return and decreasing remaining total until zero
        let total = parsePennies(currency);        
        let denomination = 0;
        while (total !== 0 && denomination < coins.length) {
            let coin = coins[denomination];
            let coinpennies = parsePennies(coin);
            // integer dividend is number of denomination coins required  
            coinage[coin] = parseInt(total / coinpennies);
            // remainder is the remaining total
            total = total % coinpennies;
            denomination++;
        }

        return coinage;
    }
   
    /* Helper function to convert currency value to integer pennies value */
    var parsePennies = function(currency) {
        
        // initialise variable to hold pennies value for return
        let pennies = currency;
        
        // drop pound symbol for numeric computations
        if (pennies.indexOf('£') > -1) { 
            pennies = pennies.substr(1); 
        }
        
        // convert to numeric now
        pennies = parseFloat(pennies);
                
        // round up any decimals to two places
        // uses multiply/divide approach as at https://javascript.info/number#rounding
        if (currency.indexOf('.') > -1) {
            pennies *= 100;
            pennies = Math.ceil(pennies);
            pennies /= 100;
        }
        
        // if pounds indicated by £ symbol, or decimal point, multiply up to penny value
        if (currency.indexOf('£') > -1 || currency.indexOf('.') > -1) {
            pennies *= 100;
        }            
        
        return pennies;
    }    
    
    /* Basic test facility taking array of input and required output values */
    var test = function(
        inputs = [
            '',
            '$100',
            '123p',
            '£15.62'
        ], 
        outputs = [
            'Sorry, invalid value',
            'Sorry, invalid value',
            '1 x £1, 1 x 20p, 1 x 2p, 1 x 1p',
            '7 x £2, 1 x £1, 1 x 50p, 1 x 10p, 1 x 2p'
        ]
        ) {
            // set up timer-based testing to populate form, pseudo-submit and check result for each test item
            for (let c = 0; c < inputs.length; c++) {
                window.setTimeout(function() {
                    console.log("Testing " + inputs[c]);
                    document.getElementById(amountId).setAttribute('value',inputs[c]);                    
                    // from JS, need to call handler directly rather than submitting form
                    coinise(); 
                    // check results                    
                    if (document.getElementById(replyId).innerHTML === outputs[c]) {
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

/* invoke coiniser with essential html elements as parameters */
var coiniser = new Coiniser('request','amount','reply');

/* add page-specific interface handling - show output block on submission */
document.getElementById('request').addEventListener("submit", function(event) {
    document.getElementById('output').style.display = 'block';
});

/* optional, run tests */
function test_coiniser() {
    // display output section, and run Coiniser tests
    document.getElementById('output').style.display = 'block'; 
    coiniser.test();
}
//test_coiniser(); // uncomment to run tests
