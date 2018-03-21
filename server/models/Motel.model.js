var mongoose = require("mongoose");

var Schema = mongoose.Schema; 


var motelSchema = new Schema({
    _creator:       { type: Schema.Types.ObjectId, ref: 'User' },
    title:          { type: String, required: true },
    category:       String,
    customer:       String,
    description:    String,
    price:          Number,
    city:           String,
    district:       String,
    street:         String,
    ward:           String,
    add:            String,
    address:        String,
    lng:            String,
    lat:            String,
    img:            {type: [String]},
    contact:        String,
    status:         Boolean,
    fields:         { type: [String], index: true, text: true }


},{collection : 'motels'});

motelSchema.set('autoIndex', false);
motelSchema.index(
    { "category" : "text", 
        "city": "text"
    },
    {
        "weights": {
            "category": 5,
            "city": 2
        }
    }
    );
var motels  = mongoose.model("motels", motelSchema);

module.exports = motels;