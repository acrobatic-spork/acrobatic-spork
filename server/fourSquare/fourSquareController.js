var request = require ('request');

var config = {
  client_id: 'TWGUYY5KTEHCM2M1KKVXYRDUFUK0SRZZ0YK2R4GEZ2RWUVER',
  client_secret: 'ENXGFFMHGWW4A0CX5LLVCKVHNX5IX1PGLBHAHYZFKYFWSU5B',
  foursquare_endpoint: 'https://api.foursquare.com/v2/venues/explore?openNow=1&limit=10&v=20160223'
}

var test = {
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ',
  section: 'food',
  radius: 4828,
  price: 2,
  lat: 37.7836970,
  lng: -122.4089660,
  uri: 'http://localhost:3000'
}

var FourSquare = {};

FourSquare.userObj = {}

FourSquare.init = function (req, res, cb) {
  FourSquare.getUserInfoAsync(req)
  .then(function() {
    console.log('user: ', FourSquare.userObj)
    return FourSquare.sendQueryAsync(FourSquare.userObj);
  })
  .then(function (venue) {
    return FourSquare.callUberAsync(venue);
  })
  .then(function (response) {
    var sendToFront = {
      uberStatus: response.body.body,
      venue: FourSquare.userObj.venue
    }
    console.log('response from callUberAsync: ', sendToFront);
    res.json(sendToFront);
  })

}

FourSquare.getUserInfoAsync = function (req) {
  return new Promise(function (resolve, reject) {
    request.get(test.uri + '/api/users?username='+req.query.username, function (err, response) {
      if (err) {
        reject(err);
      } else {
        var userInfo = JSON.parse(response.body);

        FourSquare.userObj = {
          section: userInfo.preferences.chooseFood ? 'food' : 'drinks',
          radius: userInfo.preferences.range*1610,
          price: userInfo.preferences.price,
          token: userInfo.uberToken,
          lat: req.query.lat,
          lng: req.query.lng
        };
        resolve(response);
      }
    })
  });
}

FourSquare.sendQueryAsync = function (userObj) {
  var queryString = config.foursquare_endpoint + '&ll='+userObj.lat+','+userObj.lng+'&section='+userObj.section+'&radius='+userObj.radius+'&price='+userObj.price+'&client_id='+config.client_id+'&client_secret='+config.client_secret;
  
  return new Promise(function (resolve, reject) {
    request.get(queryString, function (err, response) {
      if (err) {
        reject(err);
      } else {
        if(JSON.parse(response.body).response.groups[0].items.length < 1) {
          console.log('recalling 4[] due to lack of results: ', userObj);
          request.get(queryString, function (err, response) {
            if (err) {
              reject(err);
            } else {
              var venue = JSON.parse(response.body).response.groups[0].items[Math.floor(Math.random()*10)].venue;
              console.log('venue name = ', venue.name)
              FourSquare.userObj.venue = venue.name;
              resolve(venue);
            }
          });
        } else {
          var venue = JSON.parse(response.body).response.groups[0].items[Math.floor(Math.random()*10)].venue;
          console.log('venue name = ', venue.name)
          FourSquare.userObj.venue = venue.name;
          resolve(venue);
        }
      }
    });
  })
}

FourSquare.callUberAsync = function (venue) {
  return new Promise(function (resolve, reject) {
    request.post({ 
      uri: test.uri + '/api/uber', 
      body: {
        token: FourSquare.userObj.token,
        startLat: FourSquare.userObj.lat,
        startLng: FourSquare.userObj.lng,
        endLat: venue.location.lat,
        endLng: venue.location.lng
      },
      json: true
    } , function(err, response) {
      if(err) {
        reject(err);
      } else {
        resolve(response);
      }
    }); 
  })
}

module.exports = FourSquare;

// var foursquare = function (req, res, next) {
//   console.log('fourquare query', req.query);
//   request.get(test.uri + '/api/users?username='+req.query.username, function (err, response) {
//     console.log('user pulled from db for 4square params: ', response);
//     var userObj = {
//       section: test.section,
//       radius: test.radius,
//       price: test.price,
//       token: test.token,
//       lat: req.query.lat,
//       lng: req.query.lng
//     };
    
//     var queryString = config.foursquare_endpoint + '&ll='+userObj.lat+','+userObj.lng+'&section='+userObj.section+'&radius='+userObj.radius+'&price='+userObj.price+'&client_id='+config.client_id+'&client_secret='+config.client_secret;

//     request.get(queryString, function (err, response) {

//       var venue = JSON.parse(response.body).response.groups[0].items[Math.floor(Math.random()*10)].venue;

//       console.log('venue chosen ========', venue.name);
//       request.post({ 
//         uri: test.uri + '/api/uber', 
//         body: {
//           token: userObj.token,
//           startLat: userObj.lat,
//           startLng: userObj.lng,
//           endLat: venue.location.lat,
//           endLng: venue.location.lng
//         },
//         json: true
//       } , function(err, response) {
//         // console.log('yelp to uber request response', err, response.body);
//       });     
//     });
//   })
// }

