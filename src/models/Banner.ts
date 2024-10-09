// models/Banner.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  image: string; // Store the image URL or name, depending on how you handle uploads
  link: string;
  createdAt: Date;
}

const BannerSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema);
