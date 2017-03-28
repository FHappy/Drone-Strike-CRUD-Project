var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var bcrypt                = require('bcrypt-nodejs');
// var ListSchema            = require('mongoose').model('List');


var ListSchema = new Schema({
  name: String,
  strikes: Array,
  comments: Array
});

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
  lists: [ListSchema]
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

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
  setters: true,
  getters: true,
  virtuals: true
});

mongoose.model('List', ListSchema);
mongoose.model('User', UserSchema);
