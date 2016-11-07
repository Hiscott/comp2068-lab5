/**
 * Created by Jordan on 2016-11-04.
 */
// link to mongoose
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
    // empty schema is ok as passport defines username/ password automatically
});

accountSchema.plugin(plm);

//make this public
module.exports = mongoose.model('Account', accountSchema);