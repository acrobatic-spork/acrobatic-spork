import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Q from 'q';
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

UserSchema.methods.comparePasswords = (candidatePassword) => {
  var savedPassword = this.password;
  return Q.Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, savedPassword, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.pre('save', next => {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

User.seed = () => {
  User.remove({}, () => {
    User.collection.insert(dummyUser, (err, user) => {
      if (err) {
        console.error('error seeding user: ', err);
      } else {
        console.log('database seeded:', JSON.stringify(user));
      }
    })
  }); 
}

export default User;