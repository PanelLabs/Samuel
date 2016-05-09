var json = require("../package.json");

var samuel = {
    // Current version of Samuel
    version: json.version,

    // Collection of regular-expression patterns
    patterns: {
        // Current supported currencies: Dollar, Bitcoin, Euro, Pound, Yen
        // Status: Implemented
        currency: /(\$|\Ƀ|\€|\£|\¥)([0-9]+[.]?[0-9][0-9])/g,

        // Status: Implemented
        age: /([0-9]+)\s(years old|years of age)/gi,

        // Status: Unimplemented
        questions: /(what|who|where|when|why|how|can|which)/gi,

        // Status: Unimplemented
        interrogative: /("what"|"who"|"where")/,

        // Status: Unimplemented
        names: /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/g,

        // Status: Unimplemented
        emails: /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi,

        // Status: Unimplemented
        phoneNumbers: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,

        // Status: Unimplemented
        time: /(([0-9]+)\s(o'clock))|(([0-9]+)(AM|PM))|(([0-9]+):([0-9]+)((AM|PM))?)/gi
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
        },
        // Checks for age-related phrases using patterns
        // Status: Implemented
        age: function(str) {
            var match = 0;

            // Returned array of json objects
            var output = [];

            // Gets every currency match
            while (match != null) {
                // Refresh match
                match = samuel.patterns.age.exec(str);

                // Make sure currency has been found
                if (match == null) {
                    break;
                }

                // JSON object with details
                var jsonBuilder = {
                    name: "Age",
                    value: match[1]
                };

                // Appends currency object
                output.push(jsonBuilder);
            }

            return output;
        }
    }
};

console.log(samuel.checks.age("I am 22 years old"));
