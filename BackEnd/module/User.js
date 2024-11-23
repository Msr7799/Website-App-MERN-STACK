const mongoose = require("mongoose");

//**** User Schema ****//
const UserSchema = new mongoose.Schema({



//**** User Schema ****//
username:{
    type: String,
    required: true ,
    trim: true,
    minlength: 2,
    maxleghth: 100,
    unique: true,

},
//**** email Schema ****//

email:{
    type: String,
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 100,
    unique: true,

},


//**** password Schema ****//


password:{
    type: String,
    required: true ,
    trim: true,
    minlength: 8,
},

//**** profilePhoto Schema ****//


profilePhot: {
    type: objectobject,
    default: {
        url:"public/img/1.jpghttps://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        publicId: null,
}

},

//**** bio Schema ****//

bio: {
    type: String,

},

//**** isAdmin Schema ****//

isAdmin: {
    type:Boolean,
    default: false,
},

//**** isAccountVerified Schema ****//


isAccountVerified: {
    type:Boolean,
    default: false,
}
    
    },
//**** Timestamps ****//
    {
        timestamps: true,
    }
    );


//**** User Module ****//


const User = mongoose.model("User", UserSchema);

//**** Validate Register User ****//

function validateRegisterUser(obj){

    const schema = Joi.object({
        username: Joi.string().min(2).max(100).required(),
        email: Joi.string().min(2).max(100).required().email(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(obj);
}

//**** Validate Login User ****//




module.exports ={
     User,
     validateRegisterUser
};

