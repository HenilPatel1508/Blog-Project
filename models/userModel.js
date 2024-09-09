const { Schema, model } = require("mongoose");

const schemaFormat = {
    type: String,
    required: true,
    trim: true
}

const userSchema = new Schema({
    name:{
        ...schemaFormat,
    },
    emailid:{
        ...schemaFormat,
        unique: true
    },
    password:{
        ...schemaFormat,
    },
    mobile:{
        ...schemaFormat,
    },
    role_id:{
        type:'Number',
        default:1,
        enum:[0,1,2]

    }
},  { timestamps: true });

const User = model("User", userSchema);
module.exports = User;