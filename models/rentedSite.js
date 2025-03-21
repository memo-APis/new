import mongoose from "mongoose";

const RentedSiteSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AvailableSite",
    required: true,
  },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  subscriptionType: {
    type: String,
    enum: ["Monthly", "Yearly", "Free"],
    required: true,
  },
  subscriptionStatus: {
    type: String,
    enum: ["ongoing", "stopped", "free"],
    required: true,
  },
});
export default mongoose.models.RentedSite ||
  mongoose.model("RentedSite", RentedSiteSchema);
