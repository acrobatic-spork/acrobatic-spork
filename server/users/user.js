import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import Promise from 'bluebird';
const SALT_WORK_FACTOR = 13;

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
    maxCost: {
      type: Number,
      default: 2
    },
    minRating: {
      type: Number,
      default: 3
    },
    maxMiles: {
      type: Number,
      default: 3
    },
    faster: Boolean,
    foodTypes: Array,
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

  preferences: {
    maxCost: 1,
    minRating: 1,
    maxMiles: 60,
    faster: false,
    foodTypes: ['pizza', 'crap'],
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

export default User;