var request = require ('request');

var config = {
  client_id: 'TWGUYY5KTEHCM2M1KKVXYRDUFUK0SRZZ0YK2R4GEZ2RWUVER',
  client_secret: 'ENXGFFMHGWW4A0CX5LLVCKVHNX5IX1PGLBHAHYZFKYFWSU5B'
}

var testAccessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ'


var foursquare = function (req, res, next) {
  console.log(req.query);
  request.get('http://localhost:8080/api/users?username='+req.query.username, function (err, response) {
    var userObj = {
        // section: response.section,
        // radius: response.radius,
        // price: response.price,
        // token: response.uberToken,
        // lat: req.params.lat,
        // lng: req.params.lng
        section: 'food',
        radius: 5000,
        price: 2,
        token: testAccessToken,
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
}

module.exports = foursquare;