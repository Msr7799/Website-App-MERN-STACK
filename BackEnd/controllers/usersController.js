

//================*** Model ***=================//
const asyncHandler = require("express-async-handler");



/**-----------------------------------------
 * @desc      Get All Users Profile
 * @route    /api/users/profile
 * @method   GET
 * @access   Private ( Only Admin )
 -------------------------------------------*/
 
 module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200) .json(users);
 });