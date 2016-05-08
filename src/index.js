var json = require("../package.json");

var samuel = {
    // Current version of Samuel
    version: json.version,

    // Collection of regular-expression patterns
    patterns: {
        // Current supported currencies: Dollar, Bitcoin, Euro, Pound, Yen
        // Status: Implemented
        currency: /(\$|\Ƀ|\€|\£|\¥)([0-9]+[.]?[0-9][0-9])/g,
        // Status: Unimplemented
        age: / /,
        // Status: Unimplemented
        questions: / /,
        // Status: Unimplemented
        interrogative: / /,
        // Status: Unimplemented
        names: / /
    },

    // Checks for specific text elements
    checks: {
        // Checks for currency using patterns
        // Status: Implemented
        currency: function(str) {
            var match = 0;

            // Returned array of json objects
            var output = [];

            // Gets every currency match
            while (match != null) {
                // Refresh match
                match = samuel.patterns.currency.exec(str);

                // Make sure currency has been found
                if (match == null) {
                    break;
                }

                // JSON object with details
                var jsonBuilder = {
                    name: "Currency",
                    type: null,
                    value: 0.00
                };

                // Determines currency type
                switch (match[0][0]) {
                    case '$':
                        jsonBuilder.type = "Dollars";
                        break;
                    case 'Ƀ':
                        jsonBuilder.type = "Bitcoins";
                        break;
                    case '€':
                        jsonBuilder.type = "Euros";
                        break;
                    case '£':
                        jsonBuilder.type = "Pounds";
                        break;
                    case '¥':
                        jsonBuilder.type = "Yen";
                        break;
                }

                // Determines currency value
                jsonBuilder.value = match[2];

                // Appends currency object
                output.push(jsonBuilder);
            }

            return output;
        }
    }
};

console.log(samuel.checks.currency("I have $5.00 and €2.50"));
