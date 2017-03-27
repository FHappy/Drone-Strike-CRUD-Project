var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
// var crypto                = require('crypto');
var bcrypt                = require('bcrypt-nodejs');

// const saltRounds          = 10;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: String,
  createdAt: Date,
  updatedAt: Date,
  // passport properties
  // salt: {
  //   type: String
  // // },
  provider: {
    type: String,
    required: true
  },
  providerId: String,
  providerData: {} //for OAuth providers if I ever get around to it
});

UserSchema.pre('save', function(next) {
  var now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) { this.createdAt = now; }

  // more passport pre-save middleware nonsense
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    // console.log('about to do bcrypt compare method');
    // console.log(bcrypt.compareSync('default', hash));
  }

  next();
});

UserSchema.pre('update', function(next) {
  var now = new Date();
  this.update({}, {
    $set: {updatedAt: now}
  });
  next();
});

UserSchema.post('save', function(next) {
  console.log(this);
  if (this.isNew) {console.log('A nwe user has been created.');}
  else {console.log('A user has updated his/her details.');}
});

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

// new instance methods
// UserSchema.methods.hashPassword = function(password) {
//   return crypto.pbkdf2Sync(password, this.salt, 10000, 64)
//                .toString('base64');
// }

UserSchema.methods.authenticate = function(password) {
  // console.log('this.password is ' + this.password);
  // return this.password === this.hashPassword(password);
  return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
  setters: true,
  getters: true,
  virtuals: true
});

// var UserModel = mongoose.model('User', UserSchema);
mongoose.model('User', UserSchema);
