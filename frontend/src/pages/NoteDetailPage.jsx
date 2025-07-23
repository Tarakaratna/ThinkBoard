import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, Loader, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../lib/axios';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("Note not found!");
        } else if(error.response?.status === 429){
          toast.error(`You are too fast. Slow down.`);
        }
        else {
          toast.error("Failed to fetch note.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate('/');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSaveChange = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Both title and content cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated");
      navigate("/");

    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to update note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (field === 'title') {
        contentRef.current.focus();
      } else {
        handleSaveChange();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-blue-600">
        <Loader className="h-8 w-8 animate-spin" />
        <p className="mt-2 text-sm">Loading...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <ArrowLeftIcon className="cursor-pointer" />
            </Link>
            <span className="text-lg font-semibold">Back to Home</span>
          </div>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <Trash2Icon />
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="title">Title</label>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              id="title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, 'title')}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor='content'>Content</label>
            <textarea
              ref={contentRef}
              placeholder="Enter Content"
              value={note.content}
              id="content"
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, 'content')}
              className="w-full p-2 border border-gray-300 rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveChange}
              disabled={isSaving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
