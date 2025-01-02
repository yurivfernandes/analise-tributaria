import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SocialLogin() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // TODO: Implement Google OAuth
      window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // TODO: Implement Facebook OAuth
      window.location.href = '/api/auth/facebook';
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      // TODO: Implement Apple OAuth
      window.location.href = '/api/auth/apple';
    } catch (error) {
      console.error('Apple login failed:', error);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <img
          className="h-5 w-5"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
        />
      </button>
      <button
        onClick={handleFacebookLogin}
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <img
          className="h-5 w-5"
          src="https://www.svgrepo.com/show/475647/facebook-color.svg"
          alt="Facebook logo"
        />
      </button>
      <button
        onClick={handleAppleLogin}
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <img
          className="h-5 w-5"
          src="https://www.svgrepo.com/show/475631/apple-color.svg"
          alt="Apple logo"
        />
      </button>
    </div>
  );
}
