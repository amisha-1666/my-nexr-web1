import mongoose, { Document, Schema } from 'mongoose';

interface IAbout extends Document {
  name: string;
  image: string;
  description: string;
}

const AboutSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
