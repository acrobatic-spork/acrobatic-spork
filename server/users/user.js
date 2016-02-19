import mongoose from 'mongoose';

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


User.seed = () => {
  User.remove({}, function() {
    User.collection.insert(dummyUser, function(err, user) {
      if (err) {
        console.error('error seeding user: ', err);
      } else {
        console.log('database seeded:', JSON.stringify(user));
      }
    })
  }); 
}

export default User;