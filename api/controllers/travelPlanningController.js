const graph = require('../models/providerModel');
const request = require('request');

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, { json: true }, (err, extResponse, body) => {
            if (!err && extResponse.statusCode == 200) {
                resolve(body);
            } else {
                reject(err);
            }
        });
    }).
    catch(error => { console.log('caught', error.message); });
}

exports.getTravel = async function(req, res) {
    
    var provider = graph.graphProvider();
    var extURI = provider.setup(req.params.start, req.params.destination, req.params.type);
    
    let response = await doRequest(extURI);
    res.json(response);

};
  
  
  
// EXAMPLE
exports.postMap = function(req, res) {

    res.json({
        "result": "DONE - postMap"
    });

};