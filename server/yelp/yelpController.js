const Yelp = require('yelp');

const yelp = new Yelp({
  consumer_key: 'mcOd7miyFhdp6Cz1L-oD9w',
  consumer_secret: 'RXwVPYUZropBN8uT9OpUNfVx-u4',
  token: 'qgA95Qm5YSrXItKRTxcR1iNWERcowxow',
  token_secret: 'z85acpirffZVzb-PzqvyDqkcp58',
});


module.exports = (req, res, next) => {

  // const location = req.body.location;
  // search term
  // $$$$
  // rating

  yelp.search({ term: 'food', location: 'Montreal' })
  .then(function (data) {
    return yelp.business(data.businesses[0].id)
  })
  .then(function(business) {  
    // TODO: send location to uber
    res.json(business.location.coordinate);
  })
  .catch(function (err) {
    console.error(err);
  });
};
