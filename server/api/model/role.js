const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    role: { type: String, required: [true, 'Role is required'] },
    roleCode: {
        type: Number,
    },
    status: {
        type: Number,
        default: 1
    },
    module: [],
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdOn: String,
    modifiedOn: String,
    createdBy: String,
    modifiedBy: String,
});


module.exports = mongoose.model('Role', roleSchema);