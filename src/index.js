var json = require("../package.json");

var samuel = {
    version: json.version,
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
    checks: {
        currency: function(str) {
            var match = 0;

            while (match != null) {
                match = samuel.patterns.currency.exec(str);

                if (match == null) {
                    break;
                }

                console.log(match[0]);
            }
        }
    }
};

samuel.checks.currency("I have $5.00 and €2.50");
