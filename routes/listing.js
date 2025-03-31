const express = require("express");
const router=  express.Router({mergeParams:true});

const wrapAsync= require("../utils/wrapAsync.js");
const expressError= require("../utils/expressErrors.js");
//const {listingSchema} = require("../Schema_models/schema_validations.js");  // data validation- joi


//middlewares  for login and validations isLoggedIn
const{isLoggedIn, validateListing, isOwner} =require("../utils/middlewares.js");

const ListingController = require("../controllers/listing.js");



//image upload libraries
const multer  = require('multer')
const{cloudinary, storage} =require("../cloudConfig.js");
// destination of image through form after multer encode it
const upload = multer({ storage: storage }) 
// const upload = multer({ dest: 'data/image_uploads/' })   // for local image








// app.use("/listings", listingRouter);


//Index Route-  show full list
router.get("/", wrapAsync(ListingController.index)
);




// Search Suggestions API
router.get("/search-suggestions", ListingController.search_suggestions );

router.get("/search_listing",  ListingController.search_listing);






//New Route- create new data form                            1
router.get("/new", isLoggedIn,ListingController.RenderNewListingForm );
  

  
//Create Route - save info. input in (new data form)
router.post("/",isLoggedIn, upload.single('listing[image]'), validateListing ,wrapAsync( ListingController.SaveNewListing));

  
//Show Route-   specific data                                 2
router.get("/:id", wrapAsync(ListingController.ShowSpecificListing));




//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingController.RenderEditSpecificListingForm));


//Update Route
router.put("/:id",isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(ListingController.UpdateSpecificListing));


//Delete list in show Route
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(ListingController.DeleteSpecificListing));




module.exports=router ;