/**--------------------------------------------
 * 
 * Auther: M.alromaihi 
 * 
 * Created: 2024/11/23=
 * 
 * NOTE: This module is responsible for the user schema and its validation.
 * 
 * -------------------------------------------- */


//================****   User Module   ****=======================//


const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


//================================================================//








//================****  New User Schema   ****=======================//


const UserSchema = new mongoose.Schema({


//================****   User Schema   ****=======================//


username: {

    type: String,

    required: true,

    trim: true,

    minlength: 2,

    maxlength: 100,

    unique: true,

},


//================****   email Schema   ****=======================//

    
email: {

    type: String,

    required: true,

    trim: true,

    maxlength: 100,

    unique: true,

},

//================****   password Schema   ****=======================//


password: {

    type: String,

    required: true,

    trim: true,

    minlength: 8,

    validate: {

        validator: function (value) {
               


            
    /*==========================================================================
     *  Password must be strong: include at least one number and one character,
     and must not be '1234', your username, or email. 
     
         **** التحقق من هذع الشروط ***
          
  @## كلمة المرور تحتوي على رقم وحرف واحد على الأقل ##@
@## كلمة المرور ليست "1234" أو البريد الإلكتروني أو اسم المستخدم ##@


==============================================================================*/             

//================****   Password Validation   ****=======================//
               
              
const isValidPassword = /(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);

const isCommonPassword = ["1234", "password", "qwerty"].includes(value.toLowerCase());

const isUsernameOrEmail = 

value === this.username || 

value === this.email || 

value.includes(this.username) || 

value.includes(this.email);

return isValidPassword && !isCommonPassword && !isUsernameOrEmail;

},

message: "Password must be strong: include at least one number and one character, and must not be '1234', your username, or email.",

},

},



//================****   Reset Password Schema   ****=======================//





//================****   Profile Photo Schema   ****=======================//


profilePhoto: {

    type: Object,

    default: {

        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",

        publicId: null,

    },

},

//================****   Bio Schema   ****=======================//

    
bio: {

    type: String,

},


//================****   Location Schema   ****=======================//


location: { 
    
    type: String,
    default: "Not specified",
    City: "",
    Country: "",
},


//================****   Website Schema   ****=======================//


// Personal website


//================****   Social Media Schema   ****=======================//


socialMedia: { 
    type: Object,

twitter: "",

instagram: "",

snapchat: "",

},

//================****   isAdmin Schema   ****=======================//


isAdmin: {

    type: Boolean,

    default: false,

},


//================****   isBlocked Schema   ****=======================//

 isBlocked: { type: Boolean,
    
    default: false

},


//================****   isOnline Schema   ****=======================//

ISOnline: {
    
    type: Boolean,
    
    default: false

},

//================****   isDeleted Schema   ****=======================//

isDeleted: { 
    
    type: Boolean,
    
    default: false

},


//================****   isEmailVerified Schema   ****=======================//
//===ToDo: sending email && Add email verification functionality===//
isEmailVerified: { 

    type: Boolean, 

    default: false

},


//================****   resetPasswordToken Schema   ****=======================//

//================**** Timestamps Schema   ****=======================//


}, { timestamps: true });


//================****   Generate Auth Token   ****=======================//
                
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
    return token;
};


//==================**** User Module ****================//




const User = mongoose.model("User", UserSchema);



 //===============**** Validate Register User ****===============//



function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string()
            .trim()
            .min(8)
            .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/)
            .message("Password must include at least one number and one character.")
            .custom((value, helpers) => {

                     

                
 //=========**** التحقق من كلمة المرور نفسها كاسم المستخدم أو البريدلإلكتروني ****==========//

                
                if (value === obj.username || value === obj.email || value.includes(obj.username) || value.includes(obj.email)) {
                    return helpers.error("any.invalid", { message: "Password must not be the same as username or email." });
                }
                
//==============**** التحقق من كلمة المرور ككلمة مرور شائعة  ****================//


const commonPasswords = ["1234", "password", "qwerty"];
if (commonPasswords.includes(value.toLowerCase())) {

    return helpers.error("any.invalid", { message: "Password must not be too common like '1234'." });
}

return value;
}),
});
return schema.validate(obj);
}

//====================**** login Validation ****=============================//

       
function validateLoginUser(obj) {

    const schema = Joi.object({
email: Joi.string().trim().min(2).max(100).required().email(),

password: Joi.string()
            .required()
            .trim()
            .min(8)
            .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/)
            .message("Password must include at least one number and one character.")
            .custom((value, helpers)  => {
            
                if (value === obj.email || value.includes(obj.email)) {
                    return helpers.error("any.invalid", { message: "Password must not be the same as email." })
                 }

                
                 const commonPasswords = ["1234", "password", "qwerty"];
                if (commonPasswords.includes(value.toLowerCase())) {
                  return helpers.error("any.invalid", { message: "Password must not be too common like '1234'." });
                }
                
                return value;
                }),
             });
                return schema.validate(obj);
            }


                  
//=========**** Export Modules ****=================//

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
};

//================*** The End ***====================//