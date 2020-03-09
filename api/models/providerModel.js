exports.graphProvider = function () {
    return {
        //"uri": "https://graphhopper.com/api/1/route?point={startPoint}&point={destinationPoint}&vehicle={vehicleType}&debug=false&locale=it&points_encoded=false&instructions=true&elevation=false&optimize=false&key={authKey}",
        "uri": "http://localhost:8989/route?point={startPoint}&point={destinationPoint}&vehicle={vehicleType}&debug=false&locale=it&points_encoded=false&instructions=true&elevation=false&optimize=false&weighting=shortest&key={authKey}",
        "startPoint": "0,0",
        "destinationPoint": "1,1",
        "vehicleType": "car",
        "authKey": "9db0a28e-4851-433f-86c7-94b8a695fb18",
        "getKey": function () {
            //TODO
        },
        "setup": function (start, destination, type) {
            var me = this;
            me.startPoint = start;
            me.destinationPoint = destination;
            me.vehicleType = type;

            me.uri = me.uri
                .replace("{startPoint}", me.startPoint)
                .replace("{destinationPoint}", me.destinationPoint)
                .replace("{vehicleType}", me.vehicleType)
                .replace("{authKey}", me.authKey);

            return me.uri;
        }
    };
}