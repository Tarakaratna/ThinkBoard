import Note from "../models/noteModel.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find(); // fetch all notes
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};
// Express example
export const getANote = async(req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and Content are required" });
  }

  try {
    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note", error });
  }
};

export const updateNote = async(req,res)=>{  
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findById(id);

        if (!note) {
        return res.status(404).json({ message: "Note not found" });
        }

        // Update fields if provided
        if (title !== undefined) note.title = title;
        if (content !== undefined) note.content = content;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Failed to update note", error });
    }
};


export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note", error });
  }
};