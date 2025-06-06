import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaUserCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      {/* Left: Hamburger + Brand */}
      <div className="flex items-center space-x-4">
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="text-xl" />
        </button>

        {/* Logo with Home link */}
        <Link to="/">
          <div
            className={`flex justify-center items-center space-x-2 transition-all duration-1000 ease-in-out ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <img
              src="/logo.png"
              alt="Niyam Buddy Logo"
              className="h-8 w-8 md:h-12 md:w-12 object-contain rounded-full"
            />
            <span className="text-white tracking-widest text-sm md:text-base font-light">NIYAM</span>
            <span
              className="text-4xl md:text-5xl font-cursive"
              style={{
                background: 'linear-gradient(to right, #f9d29d, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              nb
            </span>
            <span className="text-white tracking-widest text-sm md:text-base font-light">BUDDY</span>
          </div>
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <ul
        className={`${
          menuOpen ? 'block' : 'hidden'
        } lg:flex lg:space-x-6 absolute lg:static top-14 left-0 w-full lg:w-auto bg-black lg:bg-transparent px-4 py-2 lg:p-0`}
      >
        <li>
          <Link to="/" className="block py-2 hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/routine" className="block py-2 hover:text-yellow-400">
            Routine
          </Link>
        </li>
        <li>
          <Link to="/today" className="block py-2 hover:text-yellow-400">
            Today
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="block py-2 hover:text-yellow-400">
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Right: User Info + Logout */}
      {user ? (
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-xl" />
          <span className="hidden sm:block">{user.name}</span>
          <button
            onClick={handleLogout}
            className="ml-2 hover:text-red-400 transition"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <Link to="/auth" className="hover:text-yellow-400">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
