import Yelp from 'yelp';
import request from 'request';

const yelp = new Yelp({
  consumer_key: 'mcOd7miyFhdp6Cz1L-oD9w',
  consumer_secret: 'RXwVPYUZropBN8uT9OpUNfVx-u4',
  token: 'qgA95Qm5YSrXItKRTxcR1iNWERcowxow',
  token_secret: 'z85acpirffZVzb-PzqvyDqkcp58',
});

module.exports = (req, res, next) => {
  // receive location and username from client. Go to the DB for everything else
  console.log(req.body);

  request.get('/api/users?username=' + req.body.username)
    .then(function (userObj) {
      return yelpQuery = {
        term: userObj.term,
        ll: req.body.lat + ',' + req.body.lon,
        sort: 2,
        radius_filter: userObj.radius,
        category_filter: userObj.categories
      }
    })
    .then(function (yelpQuery) {
      return yelp.search(yelpQuery)
    })
    .then(function (data) {
      return yelp.business(data.businesses[0].id)
    })
    .then(function(business) {
      request.post({ 
        uri: 'http://localhost:8080/api/uber', 
        body: {
          endLoc: business.location.coordinate,
          startLoc: req.body.location
        },
        json: true
      } , function(err, response) {
        console.log('yelp to uber request response', err, response);
      });
    })
    .catch(function (err) {
      console.error(err);
    });
};
