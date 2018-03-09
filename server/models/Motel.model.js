var mongoose = require("mongoose");

var Schema = mongoose.Schema; 


var motelSchema = new Schema({
    category: String,
    customer: String,
    description: String,
    price: Number,
    city: String,
    district: String,
    street: String,
    ward: String,
     add: String,
    lng: String,
    lat: String,
    img: String,
    contact: String,
    status: Boolean


},{collection : 'motels'});

var motels  = mongoose.model("motels", motelSchema);

module.exports = motels;