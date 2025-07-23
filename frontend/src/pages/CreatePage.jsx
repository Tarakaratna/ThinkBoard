import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast'

import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const submitButtonRef = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("All Fields are required");
      return;
    }
    const confirmed = window.confirm('Are you sure you want to submit?');
    if (confirmed){
      setIsLoading(true);
      try{
          await api.post("/notes",{
          title,content
      })
      toast.success("Note Created Successfully");
      navigate("/");
      }catch (error) {
        console.log(error);
          if (error.response && error.response.status === 429) {
            const serverMsg = error.response.data?.message || "Rate limit exceeded";
            toast.error(serverMsg); 
          } else {
            toast.error("Failed to create note");
          }
      }finally{
              setIsLoading(false);
      }
    } else {
      console.log('Submission cancelled.');
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior
      if (field === 'title') {
        contentRef.current.focus();
      } else if (field === 'content') {
        submitButtonRef.current.click();
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/">
            <ArrowLeftIcon className="cursor-pointer" />
          </Link>
          <span className="text-lg font-semibold">Back to Home</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium" htmlFor='title'>Title</label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter Title"
              value={title}
              autofocus
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'title')}
              className="p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium" htmlFor='content'>Content</label>
            <textarea
              ref={contentRef}
              placeholder="Enter Content here"
              value={content}
              id='content'
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'content')}
              className="p-2 rounded border border-gray-400 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
                type="submit"
                ref={submitButtonRef}
                disabled={isLoading}
                className={`bg-blue-600 text-white px-4 py-2 rounded transition 
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {isLoading ? "Creating..." : "Submit"}
              </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
