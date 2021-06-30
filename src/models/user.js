const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },

    userName: {
        type: String,
        required: false,
        trim: true,
        uniqu: true,
        index: true,
        lowercase: true
    },
    
    email: {
        type: String,
        required: false,
        trim: true,
        uniqu: true,
        lowercase: true
    },

    hash_password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum:['user','admin'],
        default:'admin'
    },

    contactNumber:{type: String },
    pofilePicture:{type:String}

}, {timestamps:true});

userSchema.virtual('password')
.set(function(password){
    console.log(password)
this.hash_password = bcrypt.hashSync(password, 10);
});

/* userSchema.virtual('fullName')
.get(function(){
    return `${firstName} ${lastName}`;
}); */

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema);