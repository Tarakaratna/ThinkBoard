import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    content: {
      type: String,
      required: [true, "Please enter content"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
