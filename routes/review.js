const express = require("express");
const router=  express.Router({mergeParams:true});

const wrapAsync= require("../utils/wrapAsync.js");
const expressError= require("../utils/expressErrors.js");
// const { reviewSchema} = require("../Schema_models/schema_validations.js");  // data validation- joi

const ReviewController = require("../controllers/review.js");


//isLoggedIn
const{isLoggedIn,isReviewWriter, validateReview} =require("../utils/middlewares.js");



//reviews  save
router.post("/",isLoggedIn, validateReview, wrapAsync(ReviewController.SaveReview));


//Delete review in show
router.delete("/:reviewId",isLoggedIn, isReviewWriter, wrapAsync(ReviewController.DeleteReview));





module.exports=router ;