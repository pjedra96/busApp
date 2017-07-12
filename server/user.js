var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
var UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required:true
	}
},{ collection: 'users' }, { versionKey: false });
 
UserSchema.pre('save', function (next) {
    var user = this;
	if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
exports.UserSchema = UserSchema;
//module.exports = mongoose.model('users', UserSchema);