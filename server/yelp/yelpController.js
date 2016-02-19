var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'mcOd7miyFhdp6Cz1L-oD9w',
  consumer_secret: 'RXwVPYUZropBN8uT9OpUNfVx-u4',
  token: 'qgA95Qm5YSrXItKRTxcR1iNWERcowxow',
  token_secret: 'z85acpirffZVzb-PzqvyDqkcp58',
});





var Yelp = function (req, res, next) {

  var location = req.body.location;
  // search term
  // $$$$
  // rating

  yelp.search({ term: 'food', location: 'Montreal' })
  .then(function (data) {
    console.log(data);
    yelp.business(data)
      .then(function(business) {
        console.log(business.location.coordinate);
      });
  })
  .catch(function (err) {
    console.error(err);
  });
};
