
//================ **** Require import modules **** ====================//

const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");

const { User, validateRegisterUser, validateLoginUser } = require("../module/User");
//=====================================================================//


/**-----------------------------------------
 * @desc    Register a new user 
 * @route    /api/auth/register
 * @method POST
 * @access  Public
 -------------------------------------------*/
 



//================**** regesterRouteHaandler ****======================//


 module.exports.registerUserCtrl = asyncHandler(async (req, res) => {

                     //**** Validation ****//
                           
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }


//================**** Check if user already exists ****===============//



    let user =  await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }


//================**** PASSWORD ENCRYTION ****===========//


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


//================**** Create a new user ****===============//


    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    await user.save();


//================**** Create a token ****===============//



//================**** send a response to client ****===============//

  res.status(201).json({ message: "User registered successfully, please login. ^__^" });


 });

//=====================================================================================================// 


//================**** loginUserCtrl ****==========================//


/**-----------------------------------------
 * @desc     Login user 
 * @route    /api/auth/Login
 * @method   POST
 * @access  Public
 -------------------------------------------*/
 

 //================**** loginRouteHaandler ****======================//

    
 module.exports.loginUserCtrl = asyncHandler(async (req, res) => {


//================**** Validation ****==============================//


const { error } = validateLoginUser(req.body);

if (error) {

    return res.status(400).json({ message: error.details[0].message });

}

//================**** Check if user exists ****====================//


const user = await User.findOne9({ email: req.body.email });

if (!user) {

    return res.status(400).json({ message: "Invalid email or password." });
    
}

//================**** Check if password is correct ****===========//


const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

if (!isPasswordMatch) {

    return res.status(400).json({ message: "Invalid email or password." });

}


//================**** Create a token ****=========================//

const token = user.generateAuthToken() ;


//================**** send a response to client ****===============//



res.status(200).json({ 

    _id: user.id,

    isAdmin: user.isAdmin,

    profilePhoto: user.profilePhoto,

    token,

    message: "WELCOME, you logged in successfully. ^__^" });

});
