var request = require ('request');

var config = {
  client_id: 'x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m',
  client_secret: 'S5gtX14LRlWMs_oo_F1ANa0lVDjw7kkf6Q0f5QPg',
  server_token: '1C_9lI-9D2E1K3OuFqH9EeayNcoWzAJendBM3BfT',
  endpoint: 'https://api.uber.com/v1/requests',
  code_redirect: 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&scope=request&redirect_uri=https://acrobaticspork.com/auth/uber',
  redirect_uri: 'https://acrobaticspork.com/auth/uber'

};

var test = {
  endpoint: 'https://sandbox-api.uber.com/v1/requests',
  code_redirect: 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&scope=request&redirect_uri=http://localhost:3000/auth/uber',
  access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ'
};

module.exports = function(userController) {

var Uber = {};

Uber.redirectToUber = function (req, res) {
  req.session.user = req.query.username;
  var redirect = req.protocol + '://' + req.get('host') + '/auth/uber';
  var code_redirect = 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&scope=request&redirect_uri=' + redirect;
  res.redirect(code_redirect);
};

Uber.getToken = function (req, res, next) {
  var redirect = req.protocol + '://' + req.get('host') + '/auth/uber';
  request.post("https://login.uber.com/oauth/v2/token?code=" + req.query.code + "&redirect_uri=" + redirect + "&client_id=" + config.client_id + "&client_secret=" + config.client_secret + "&grant_type=authorization_code", function(err, response) {
    var token = {
      uberToken: JSON.parse(response.body).access_token
    };
    userController.updateUberToken(req.session.user, token.uberToken, function(err, user) {
      res.redirect('/?username=' + req.session.user);
    });
  });
};

Uber.requestCar = function (req, res, next) {
  // var token = req.body.token;
  var requestCar = {
    start_latitude: req.body.startLat,
    start_longitude: req.body.startLng,
    end_latitude: req.body.endLat,
    end_longitude: req.body.endLng
  };
  
  request.post({ 
    uri: test.endpoint,
    headers: {
      'Authorization': 'Bearer '+req.body.token
    },
    body: requestCar,
    json: true
  } , function(err, response) {
    if(err) {
      res.json(err);
    } else {
      res.json(response);
    }
  });   
};

Uber.checkStatus = function (req, res, next) {
  console.log('chcek status: ', req.body);
  if(req.body) {
    request.get( req.protocol + '://' + req.get('host') + '/api/users?username='+req.query.username, function (err, response) {
      if (err) {
        reject(err);
      } else {
        console.log('db response for Uber status update: ', response.body);
        request.get({ 
          uri: test.endpoint+'/'+req.body,
          headers: {
            'Authorization': 'Bearer '+response.body.uberToken
          } 
        }, function(err, response) {
            console.log('Status of uber ride', err, response.body);
            res.json(response.body);
        });
      }
    });
  }
}

Uber.cancelRequest = function (req, res, next) {
  request.del({
    uri: test.endpoint+'/'+req.body,
    headers: {
      'Authorization': 'Bearer '+req.body.token
    }
  } , function(err, response) {
    if(err) {
      console.error("There was an error cancelling the uber: ", err);
    } else {
      console.log('Cancelling uber request.');
      // console.log('The response was: ', response);
    }
  });
}

return Uber;
};
