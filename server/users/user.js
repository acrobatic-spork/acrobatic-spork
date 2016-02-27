var mongoose = require ('mongoose');
var bcrypt = require ('bcrypt-nodejs');
var Promise = require ('bluebird');
var SALT_WORK_FACTOR = 13;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  uberToken: String,

  preferences: {
    price: {
      type: Number,
      required: true,
      default: 2
    },
    range: {
      type: Number,
      required: true,
      default: 2
    },
    chooseFood: {
      type: Boolean,
      required: true,
      default: true
    },
  }
},
{
  timestamps: true
});



UserSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return new Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};


Promise.promisifyAll(bcrypt);




UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    console.log('password not modified');
    return next();
  }
   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    console.log('salt is ' + salt + ', user password is ' + user.password);

    // hash the password along with our new salt
    bcrypt.hash(user.password, null, null, function (err, hash) {
      console.log('callback happened in hash');
      if (err) {
        console.log('hash error: ' + err);
        return next(err);
      }
      console.log('hash is ' + hash);
      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

var User = mongoose.model('users', UserSchema);



var dummyUser = {
  username: 'Sondra',

  password: 'stuff',

  uberToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ',

  preferences: {
    price: 1,
    range: 3,
    chooseFood: true
  }
};

User.seed = function () {
  User.remove({}, function () {
    User.collection.insert(dummyUser, function(err, user) {
      if (err) {
        console.error('error seeding user: ', err);
      } else {
        console.log('database seeded:', JSON.stringify(user));
      }
    });
  }); 
};

module.exports = User;
