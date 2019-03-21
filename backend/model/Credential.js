  // Initialization
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  
  // Create Schema
  const Credential = new Schema({
      userEmail:String,
      password:String
  });
  
  
  // Export ideas model
  module.exports = mongoose.model('credetial', Credential);