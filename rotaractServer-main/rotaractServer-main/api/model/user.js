const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    userName: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    userCode: {
        type: Number
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    mobile: {
        type: Number
    },
    address: {
        type: String,
    },
    privileges: {
        type: String,
    },
    emailId: {
        type: String,
        require: true,
        dropDups: true
    },
    status: {
        type: Number,
        default: 1
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdOn: String,
    createdBy: String,
    modifiedBy: String,
    modifiedOn: String

});
/* customer code  auto increment plungin function */
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userCode',
    startAt: 2,
    incrementBy: 1
});

userSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function (hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);