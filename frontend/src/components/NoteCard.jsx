import {SquarePen,Trash2Icon } from 'lucide-react';
import {toast} from 'react-hot-toast';
import { Link } from 'react-router';

import { formatDate } from '../lib/utils.js';
import api from '../lib/axios.js';

const NoteCard = ({ notes,setNotes }) => {
  const handleDelete = async(e,id)=>{
    e.preventDefault();
    if(!window.confirm("Are you sure want to delete the note ?")){
      return;
    }
    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      setNotes((prev) => prev.filter(note => note._id !== id));
    }catch(error){
      console.log(error);
      toast.error("Failed to Delete Note");
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {notes.map(note => (
        <div
          key={note._id}
          className="p-4 border rounded shadow-md bg-white"
        >
          <Link to={`/note/${note._id}`}>
          <h2 className="text-xl font-semibold">{note.title}</h2>
          <p className="text-gray-700">{note.content}</p>
          </Link>
          <div className='flex justify-between items-center mt-8'>
            <span>Last Updated : { formatDate(new Date(note.updatedAt))}</span>
            <div className='flex justify-between items-centerd'>
              <Link to={`/note/${note._id}`}>
                  <SquarePen/>
              </Link>
              <button onClick={(event)=>{handleDelete(event,note._id)}} className="text-red-600 hover:text-red-800">
                  <Trash2Icon />
              </button>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default NoteCard;
