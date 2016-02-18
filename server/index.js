import express from 'express';

const app = express();

app.use(express.static(__dirname + '/../public'));

app.post('/api/users/signup');
app.post('/api/users/signin');
app.post('/api/users/signout');
app.post('/api/fuckit');

app.listen(8080, function(err) {
  if (err)
    return console.log(err);
  console.log('running on localhost:8080');
});