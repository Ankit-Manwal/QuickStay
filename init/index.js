const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Schema_models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/QuickStay";
const Atlas_cloud_mongo_url= process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data=  initData.data.map(  (obj)=>({...obj, owner:"67ea9a5325b634203a83e9d4" })  ) ;

  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();