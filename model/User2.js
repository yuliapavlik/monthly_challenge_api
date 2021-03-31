const mongoose = require("mongoose");

const User2Schema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            match: /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
            required: true
        },
    },
    { collection : 'users2' });

// export model user with UserSchema
module.exports = mongoose.model("user2", User2Schema);
