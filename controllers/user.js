// //model folder file import
const User = require("../Schema_models/user.js");    //user schema



//user signup
module.exports.RenderNewUserForm = async (req, res) => {
    
    res.render("user/new_user.ejs");  
  }



//user  register
module.exports.SaveNewUser  = async(req, res) => {
    try{
        let { username, email, password,confirmPassword } = req.body;

        if(password!=confirmPassword)
        {
          req.flash("error", `Re-entered password do not match`);
          res.redirect("/signUp");
          return;
        }

        const newUser = new User({email, username});
        const registeredUser= await User.register(newUser, password );

        console.log("new user registered:",registeredUser ); 
        
        //login after registering ****************************
        req.login(registeredUser, (err)=> {
          if (err) {
              next(err);
          }
          req.flash("success", `🎉 Welcome to Wanderlust, ${registeredUser.username} 🎉!  Your account has been successfully created`);
          res.redirect("/listings");
      });
      //****************************************************** */
    }
    catch(err)
    {
        console.log(err);
        req.flash("error", err.message);
        res.redirect("/signUp" );
    }
}




//user login
module.exports.RenderUserLoginForm  =async (req, res) => {
    
    res.render("user/userLogin.ejs");  
  }


//user login
module.exports.UserLogin  = async (req, res) => {   

        let { username , password } = req.body;

        console.log("welcome:",username ); 

        req.flash("success", `Welcome to wanderlust!   ${username}`);
        
        //to page just before login page
        let redirectUrl= res.locals.redirectUrl || "/listings" ;  // if directly login from home without "isLoggedIn"

        console.log("\n*********************************",redirectUrl,"*******************\n");
        
        res.redirect(redirectUrl);
}


module.exports.UserLogout =  (req, res) => {
    req.logout((err) => {
      if (err) {
          return next(err);
      }
      req.flash("success", "Logged out!");
      res.redirect("/listings");
    });
}

// //Delete user 
// module.exports.DeleteUser  = async (req, res) => {
// let { id, reviewId } = req.params;

// let deletedReviewInListing= await Listing.findByIdAndUpdate(id,  {$pull:  {reviews:reviewId}} )  ;
// let deletedReview = await Review.findByIdAndDelete(reviewId);

// console.log(deletedReviewInListing,"\n**************\n", deletedReview);
// req.flash("success", "Review Deleted");

// res.redirect(`/listings/${id}`);
// }

