import mongoose from "mongoose";

const AvailableSiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
 category: { type: mongoose.Schema.Types.ObjectId, ref: "SiteCategory", required: true },
    url: { type: String },
    images: [String],
});

export default mongoose.models.AvailableSite ||
  mongoose.model("AvailableSite", AvailableSiteSchema);
