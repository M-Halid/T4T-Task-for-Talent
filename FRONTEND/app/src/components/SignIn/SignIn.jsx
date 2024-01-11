// src/pages/SignIn.jsx
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Perform authentication logic here
    // For simplicity, let's assume a successful sign-in redirects to the home page
    // In a real app, you would connect to an authentication service (e.g., Firebase, Auth0)
    // and handle the sign-in process there.

    // For demonstration purposes, let's assume the sign-in is successful
    // and redirect the user to the home page ("/").
    // navigate('/');
    try {
        const response = await fetch('http://localhost:5000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Store the token in local storage or state for future requests
          console.log('Token:', data.token);
          // Redirect or perform other actions as needed
        } else {
          console.error('Invalid credentials');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
//https://codepen.io/rikosteo/pen/vwrwMe sign in form template
  return (
    <div className="flex-container">
      <div className="content-container">
        <div className="form-container">
          <form action="/">
            <h1>Sign In</h1>
            <br />
            <br />
            <span className="subtitle">USERNAME:</span>
            <br />
            <input type="text" name="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <span className="subtitle">PASSWORD:</span>
            <br />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
            <input type="submit" value="Sign In" className="btn btn-outline btn-accent" onClick={handleSignIn}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
