var request = require ('request');

var config = {
  client_id: 'TWGUYY5KTEHCM2M1KKVXYRDUFUK0SRZZ0YK2R4GEZ2RWUVER',
  client_secret: 'ENXGFFMHGWW4A0CX5LLVCKVHNX5IX1PGLBHAHYZFKYFWSU5B'
}


var foursquare = function (req, res, next) {
  console.log(req.query);
  request.get('http://localhost:8080/api/users?username='+req.query.username, function (err, resposne) {
    var userObj = {
        // section: userObj.section,
        // radius: userObj.radius,
        // price: userObj.price,
        // token: userObj.uberToken,
        // lat: req.params.lat,
        // lng: req.params.lng
        section: 'food',
        radius: 5000,
        price: 2,
        token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicHJvZmlsZSIsImhpc3RvcnkiLCJwbGFjZXMiXSwic3ViIjoiZjU3MTg2NTctMzFmMS00NTk3LWE5OGQtMzZiODRkMDhlNzc5IiwiaXNzIjoidWJlci11czEiLCJqdGkiOiJjNDIxNGMxYS03NzMxLTQ4NjktYjczMC01Y2IyYzA1ZWQwZDEiLCJleHAiOjE0NTg5NDQ5OTksImlhdCI6MTQ1NjM1Mjk5OSwidWFjdCI6IlV1aEFkaEFwMm5DcmQyWVhGa2VjVTJYd0RLbGlleSIsIm5iZiI6MTQ1NjM1MjkwOSwiYXVkIjoieDhaQk9HZ3Z2ZTJKSFFnT0Z1UjdpYjJlMmR0X0E2Nm0ifQ.T7KxojbjevUpNTiyImT-UQx0_HEExKxdrU5t3hPCG3XklEhJT3QWUr4DVTRJAm_Y4gdvdcLNlsI5PSgwI3REDxTfG7Kee2WpwjBiWhEi6GwU1XSKPcOOakxDZuGCT9EStXZTc0X9JQKUHzFOH_ndirb8JV8t38vabRQqydSaXPHp77GAMbCWOZx9apVAseMR9vTnfqXyqIiDsqjeDWH_sBF1U1ONcpNwDamp34R6RWkDBBGtM-Du3yCu1cCuLYaVMNrB4ZB8zQRHSqcbKAkCvqiPtU9ubUFd9vMqBfKfTg4-6DkX5BRKJ5kP6RSn1oEj7bwZUh0I4jfA912caac9lg',
        lat: req.query.lat,
        lng: req.query.lng
      };
    request.get('https://api.foursquare.com/v2/venues/explore?ll='+userObj.lat+','+userObj.lng+'&section='+userObj.section+'&openNow=1&limit=10&client_id='+config.client_id+'&client_secret='+config.client_secret+'&v=20160223',
    function (err, response) {
      var venue = JSON.parse(response.body).response.groups[0].items[Math.floor(Math.random()*10)].venue;
      var venueLat = venue.location.lat;
      var venueLng = venue.location.lng;
      console.log('venue chosen ========', venue.name);
      request.post({ 
        uri: 'http://localhost:8080/api/uber', 
        body: {
          token: userObj.token,
          startLat: userObj.lat,
          startLng: userObj.lng,
          endLat: venueLat,
          endLng: venueLng
        },
        json: true
      } , function(err, response) {
        console.log('yelp to uber request response', err, response.body);
      });     
    });
  })
    // .then(function (userObj) {
    //   return {
    //     section: userObj.section,
    //     radius: userObj.radius,
    //     price: userObj.radius,
    //     token: userObj.uberToken,
    //     lat: req.params.lat,
    //     lng: req.params.lng
    //   };
    // })
    // .then(function (query) {
    //   request.get('https://api.foursquare.com/v2/venues/explore?ll='+query.lat+','+query.lng+'&section='+query.section+'&openNow=1&limit=10&client_id='+config.client_id+'&client_secret='+config.client_secret+'&v=20160223',
    //   function (err, response) {
    //     var venue = response.response.groups.items[Math.floor(Math.random(10))].venue;
    //     var venueLat = venue.location.lat;
    //     var venueLng = venue.location.lng;
    //     request.post({ 
    //       uri: 'http://localhost:8080/api/uber', 
    //       body: {
    //         token: query.token,
    //         endLoc: venueLat+','+venueLng,
    //         startLoc: query.lat+','+query.lng
    //       },
    //       json: true
    //     } , function(err, response) {
    //       console.log('yelp to uber request response', err, response);
    //     });     
    //   });
    // })
    // .then(function (response) {
    //   var venue = response.response.groups.items[Math.floor(Math.random(10))].venue;
    //   var venueLat = venue.location.lat;
    //   var venueLng = venue.location.lng;
    //   request.post({ 
    //     uri: 'http://localhost:8080/api/uber', 
    //     body: {
    //       token: query.token,
    //       endLoc: venueLat+','+venueLng,
    //       startLoc: query.lat+','+query.lng
    //     },
    //     json: true
    //   } , function(err, response) {
    //     console.log('yelp to uber request response', err, response);
    //   });
    // })
    // .catch(function (err) {
    //   console.error(err);
    // });
}

module.exports = foursquare;