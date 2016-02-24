var request = require ('request');

var config = {
  client_id: 'TWGUYY5KTEHCM2M1KKVXYRDUFUK0SRZZ0YK2R4GEZ2RWUVER',
  client_secret: 'ENXGFFMHGWW4A0CX5LLVCKVHNX5IX1PGLBHAHYZFKYFWSU5B'
}


module.exports = function (req, res, next) {
  // request.get('/api/users?username=' + req.params.username)
  //   .then(function (userObj) {
  //     return {
  //       section: userObj.section,
  //       radius: userObj.radius,
  //       price: userObj.radius,
  //       token: userObj.uberToken,
  //       lat: req.params.lat,
  //       lng: req.params.lng
  //     };
  //   })
  //   .then(function (query) {
  //     return request.get('https://api.foursquare.com/v2/venues/explore?ll='+query.lat+','+query.lng'&section='+query.section+'&openNow=1&limit=10&client_id='+config.client_id+'&client_secret='+config.client_secret+'&v=20160223');
  //   })
  //   .then(function (response) {
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
  //   })
  //   .catch(function (err) {
  //     console.error(err);
  //   });
}