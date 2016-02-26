'use strict';

var expect = require('chai').expect;
import 'babel-polyfill';

import User from '../server/users/user';
import Controller from '../server/users/userController';
import Uber from '../server/uber/uberController';
import FourSquare from '../server/fourSquare/fourSquareController';


describe('the User Controller', function () {
  it('should have all the functions', function () {
    expect(Controller.signin).to.be.a('function');
  });
});

describe('the Uber Controller', function () {
  it('should have all the functions', function () {
    expect(Uber(Controller).getToken).to.be.a('function');
    expect(Uber(Controller).requestCar).to.be.a('function');
    expect(Uber(Controller).checkStatus).to.be.a('function');
    expect(Uber(Controller).cancelRequest).to.be.a('function');
  });
});

describe('the FourSquare Controller', function (done) {
  it('should have all the functions', function () {
    expect(FourSquare.init).to.be.a('function');
    expect(FourSquare.getUserInfoAsync).to.be.a('function');
    expect(FourSquare.sendQueryAsync).to.be.a('function');
    expect(FourSquare.callUber).to.be.a('function');
  });

  it('should populate userObj when calling getUserInfoAsync', function () {
    var queryObj = {
      query: {
        username: 'Sondra',
        lat: '37.7836970',
        lng: '-122.4089660'
      }
    }
    // expect(FourSquare.userObj).to.equal({});
    return FourSquare.getUserInfoAsync(queryObj)
    .then(function () {
      expect(FourSquare.userObj.lat).to.equal('37.7836970');
      expect(FourSquare.userObj.lng).to.equal('-122.4089660');
    });
  });

  it('should send an explore query to the FourSquare api when calling sendQueryAsync and return a venue', function () {
    var testUserObj = {
      section: 'food',
      radius: '4828',
      price: '2',
      lat: '37.7836970',
      lng: '-122.4089660',
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ'
    };
    // expect(FourSquare.userObj).to.equal({});
    return FourSquare.sendQueryAsync(testUserObj)
    .then(function (venue) {
      expect(venue.name).to.exist;
      expect(venue.location).to.exist;
    });
  });

});