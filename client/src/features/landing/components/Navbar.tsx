import { Logo } from '../../../components/Logo';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo className="w-48 h-12" />
        </div>
        <Link to={'#'} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition-all duration-200">
          Login
        </Link >
      </div>
    </nav>
  );
} 