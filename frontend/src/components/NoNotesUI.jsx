import { Notebook } from 'lucide-react';

const NoNotesUI = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
      <Notebook size={64} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Notes Yet</h2>
      <p className="text-gray-500 mb-4">
        You haven't created any notes. Start by creating your first one!
      </p>
      <a
        href="/create"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
      >
        Create Note
      </a>
    </div>
  );
};

export default NoNotesUI;
