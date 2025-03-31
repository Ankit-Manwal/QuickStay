const express = require("express");
const router=  express.Router({mergeParams:true});

const wrapAsync= require("../utils/wrapAsync.js");
// const { UserSchema} = require("../Schema_models/schema_validations.js");  // data validation- joi

// //model folder file import
const User = require("../Schema_models/user.js");    //user schema

//passport
const passport= require("passport");
const localStrategy= require("passport-local");

//middlewares  for login and validations isLoggedIn
const {saveRedirectUrl} =require("../utils/middlewares.js");


const UserController = require("../controllers/user.js");

// //joi - as a middleware--------------------------------------------------------------------------------------------
// const validateUser=(req, res ,next)=>{
//     let {error}= userSchema.validate(req.body);
//     if(error)
//     {
//       console.log(error);
//       let error_msg=error.details.map((elem)=> elem.message).join(",");// join all error details
//       throw new expressError(400, error_msg);
//     }
           
//     else
//         next();
//   }
//   /****************************************************************************************************/
  




//user signup
router.get("/signUp", wrapAsync(UserController.RenderNewUserForm));



//user  register
router.post("/signUp", wrapAsync(UserController.SaveNewUser));




//user login form
router.get("/login", wrapAsync(UserController.RenderUserLoginForm));


//user login
router.post("/login", 
            saveRedirectUrl,   // to store url which will be reset after "passport.authenticate"
            passport.authenticate('local', { failureRedirect: '/login', failureFlash:true }),    //passport.authenticate() middleware for authentication
            wrapAsync(UserController.UserLogin));


router.get("/logout", UserController.UserLogout);

//Delete user 
// router.delete("/:reviewId", wrapAsync(UserController.DeleteUser));






module.exports=router ;

//gggggggg