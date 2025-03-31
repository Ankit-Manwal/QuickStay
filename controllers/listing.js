// //model folder file import
const Listing = require("../Schema_models/listing.js");


const{cloudinary} =require("../cloudConfig.js");


//Index Route-  show full list
module.exports.index  =  async (req, res) => {
    const allListings = await Listing.find({});
    
    res.render("listings/index.ejs", { allListings:allListings , searched_Query:""});  
  }


//New Route- create new data form                            1
module.exports.RenderNewListingForm = (req, res) => {
  console.log(req.user);   //user info 
  res.render("listings/new.ejs");
}


//Create Route - save info. input in (new data form)
module.exports.SaveNewListing = async (req, res) => {

const imag_url=  req.file.path;
const imag_name=  req.file.filename;

const newListing = new Listing(req.body.listing);

newListing.image.filename=  imag_name;
newListing.image.url=  imag_url ;
newListing.owner= req.user._id ;

console.log(newListing);

await newListing.save();
req.flash("success", "New Listing Created");
res.redirect("/listings");
}



module.exports.ShowSpecificListing =  async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate(  { path:"reviews",
                                                          populate:{path:"writer"} 
                                                        }    
                                                      )
                                            .populate("owner");  
  if(!listing )
  {
    req.flash("error", "Listing you requested not found");
    return res.redirect("/listings");
  }
  console.log("\n***Show***\n",listing);
  res.render("listings/show.ejs", { listing });
}



module.exports.RenderEditSpecificListingForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing )
      {
        req.flash("error", "Listing you requested for edit not found");
        return res.redirect("/listings");
      }
    // lower pixel
    listing.image.url = listing.image.url.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing });
}



module.exports.UpdateSpecificListing =  async (req, res) => {
 
    let { id } = req.params;

     // Check if the listing exists before updating
     let listing = await Listing.findById(id);
     if (!listing) {
         req.flash("error", "Listing not found!");
         return res.redirect("/listings");
     }

    let updateListing = { ...req.body.listing };

      // If an image is uploaded, update the image fields
      if (req.file) {
          // Delete old image from Cloudinary
          if (listing.image && listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }

        updateListing.image = {
            filename: req.file.filename,
            url: req.file.path
        };
      }

      // Update listing using $set to prevent overwriting missing fields
      let savedListing = await Listing.findByIdAndUpdate(id, { $set: updateListing }, { 
        new: true, 
        runValidators: true 
    });

    console.log('\nUpdated Listing:', savedListing, '\n');
    req.flash("success", "Listing Edited Successfully!");
    res.redirect(`/listings/${id}`);
}



module.exports.DeleteSpecificListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log("deleted listing:\n",deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
  }



  module.exports.search_suggestions =  async (req, res) => {
    let { query } = req.query;
    if (!query) return res.json([]);

    try {
        // Find listings whose title matches the query (case-insensitive)
        const listings = await Listing.find(
            { title: { $regex: query, $options: "i" } } 
        ).limit(5); // Limit results

        res.json(listings.map(listing => ({
            id: listing._id,
            title: listing.title
        })));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

  
module.exports.search_listing = async (req, res) => {
  let { query } = req.query;
  const SearchedListings = await Listing.find({ title: { $regex: query, $options: "i" } });
  res.render("listings/index.ejs", { allListings:SearchedListings, searched_Query:query });
}



  