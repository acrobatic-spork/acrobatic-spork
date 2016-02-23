import Yelp from 'yelp';
import request from 'request';

const yelp = new Yelp({
  consumer_key: 'mcOd7miyFhdp6Cz1L-oD9w',
  consumer_secret: 'RXwVPYUZropBN8uT9OpUNfVx-u4',
  token: 'qgA95Qm5YSrXItKRTxcR1iNWERcowxow',
  token_secret: 'z85acpirffZVzb-PzqvyDqkcp58',
});

module.exports = (req, res, next) => {
  const yelpQuery = {
    term: req.body.term,
    ll: req.body.lat + ',' + lon,
    sort: 2,
    redius_filter: req.body.radius,
    category_filter: req.body.categories
  }
  // const location = req.body.location;
  // search term 
  // $$$$
  // rating

  yelp.search({ term: 'food', location: 'Montreal' })
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
