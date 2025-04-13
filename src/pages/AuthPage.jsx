import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="relative bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-900 bg-opacity-60 p-3 rounded-full">
            <FiUser className="text-purple-300 text-3xl" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-center text-purple-200 mb-8">
          {isLogin ? 'Sign in to continue' : 'Join us today'}
        </p>

        {isLogin ? (
          <>
            <SignIn />
            <div className="flex items-center justify-center mt-6 space-x-2">
              <span className="text-sm text-gray-400">New user?</span>
              <button
                onClick={() => setIsLogin(false)}
                className="text-sm font-medium text-purple-300 hover:text-purple-100 flex items-center transition-colors"
              >
                <FiUserPlus className="mr-1" /> Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <SignUp setIsLogin={setIsLogin} />
            <div className="flex items-center justify-center mt-6 space-x-2">
              <span className="text-sm text-gray-400">Already have an account?</span>
              <button
                onClick={() => setIsLogin(true)}
                className="text-sm font-medium text-purple-300 hover:text-purple-100 flex items-center transition-colors"
              >
                <FiLogIn className="mr-1" /> Sign in
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;