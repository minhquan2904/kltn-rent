import { Number } from "core-js";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; 

var statisticSchema = new Schema({
    num_motel:  {type: Number, required: true},
    num_user:   {type: Number, required: true},
    visitors:   {type: Number, required: true},
    created_at: {type: Date, required: true},
    stopped_at: {type: Date},

},{collection : 'statistics'});

var statistics  = mongoose.model("statistics", userSchema);

module.exports = users;