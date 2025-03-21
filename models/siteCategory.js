import mongoose from "mongoose";

const SiteCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

export default mongoose.models.SiteCategory || mongoose.model("SiteCategory", SiteCategorySchema);
