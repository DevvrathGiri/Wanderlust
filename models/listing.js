const mongoose = require("mongoose");
const Review = require("./review.js");
const { ref } = require("joi");
const { listingSchema } = require("../schema.js");
const Schema = mongoose.Schema;

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: { type: String, default: '' },
    filename: { type: String, default: '' }
},
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref : "Review",
    },
  ],
  owner: {
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});

ListingSchema.post("findOneAndDelete", async function(listing) {
  if (listing) {
      // Perform any actions, like cleaning up related reviews
      await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
})
const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
