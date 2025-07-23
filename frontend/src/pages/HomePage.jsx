import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react';

import api from '../lib/axios';
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI'
import NoteCard from '../components/NoteCard'
import NoNotesUI from '../components/NoNotesUI';

const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  useEffect(()=>{
    const fetchNotes = async()=>{
      try{
        const res = await api.get('/notes');
        setNotes(res.data);
      }catch(error){
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }
      }finally{
        setIsLoading(false);
      }
    }
    fetchNotes();
  },[]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitUI />}
      {!isRateLimited && notes.length === 0 && !isLoading && <NoNotesUI />}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center mt-10 text-blue-600">
          <Loader className="h-8 w-8 animate-spin" />
          <p className="mt-2 text-sm">Loading...</p>
        </div>
      ) : (
        <NoteCard notes={notes} setNotes = {setNotes} />
      )}

    </div>
  )
}

export default HomePage
