  // Initialization
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    userDetails:Object,
    userDisease:Object,
    score:Number,
    date:Date
});


// Export ideas model
module.exports = mongoose.model('user', UserSchema);