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

describe('the FourSquare Controller', function () {
  it('should have all the functions', function () {
    expect(FourSquare.init).to.be.a('function');
    expect(FourSquare.getUserInfoAsync).to.be.a('function');
    expect(FourSquare.sendQueryAsync).to.be.a('function');
    expect(FourSquare.callUber).to.be.a('function');

  });
});