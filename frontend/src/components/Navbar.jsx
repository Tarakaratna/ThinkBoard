import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
	<header className="bg-slate-800 text-white shadow-md">
		<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
			<h1 className="text-3xl font-bold tracking-wide">ThinkBook</h1>
			<Link
			to="/create"
			className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
			>
				<PlusIcon className="w-5 h-5" />
				<span>Create</span>
			</Link>
      </div>
    </header>
  );
};

export default Navbar;
