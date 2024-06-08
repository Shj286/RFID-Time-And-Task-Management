import React from 'react';

const Header = () => {
  const handleLogin = () => {
    // Replace 'https://your-login-website.com' with the actual login website URL
    window.location.href = 'http://localhost:3000';
  };

  const handleSignUp = () => {
    // Replace 'https://your-signup-website.com' with the actual signup website URL
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div>
      <h1>Company Name</h1>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;