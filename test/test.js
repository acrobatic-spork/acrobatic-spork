'use strict';

var expect = require('chai').expect;
import 'babel-polyfill';

import User from '../server/users/user';
import Controller from '../server/users/userController';

describe('the User Controller', function () {
  it('should have all the functions', function () {
    expect(Controller.signin).to.be.a('function');
  });
});