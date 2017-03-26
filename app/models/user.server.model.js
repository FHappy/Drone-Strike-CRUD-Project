var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

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
  updatedAt: Date
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) { this.createdAt = now; }
  next();
});

UserSchema.pre('update', function(next) {
  now = new Date();
  this.update({}, {
    $set: {updatedAt: now}
  });
  next();
});

UserSchema.post('save', function(next) {
  if (this.isNew) {console.log('A nwe user has been created.');}
  else {console.log('A user has updated his/her details.');}
});

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.set('toJSON', {setters: true, getters: true, virtuals: true});

// var UserModel = mongoose.model('User', UserSchema);
mongoose.model('User', UserSchema);
