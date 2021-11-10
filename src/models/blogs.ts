import mongoose from "mongoose";

export interface Post {
  title: string;
  description: string;
  picture: string;
  content: string;
  timeOfCreation: string;
  timeOfUpdation: string;
}

const postSchema = new mongoose.Schema<Post>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  timeOfCreation: {
    type: String,
    required: true,
  },

  timeOfUpdation: {
    type: String,
  },
});

export const Posts = mongoose.model<Post>("Posts", postSchema);
