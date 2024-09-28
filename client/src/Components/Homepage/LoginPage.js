import React from 'react'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div className="container">
      <div className="form-container">
        <h1>Get Started Now</h1>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input id="name" placeholder="Enter your name" type="text" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" placeholder="Enter your password" type="password" />
          </div>
          <div className="checkbox-group">
            <input id="terms" type="checkbox" />
            <label htmlFor="terms">I agree to the terms & policy</label>
          </div>
          <button className="btn" type="submit">Signup</button>

          <div className="divider">
            <span>Or</span>
          </div>

          <div className="social-login">
            <button type="button">
              <img src="" alt="Google logo" width="20" height="20" />
              Sign in with Google
            </button>
            <button type="button">
              <img src="" alt="Fb logo" width="48" height="48" />
              Sign in with Facebook
            </button>
          </div>

          <div className="signin-link">
            Have an account? <a href="#">Sign In</a>
          </div>
        </form>
      </div>

      <div className="image-container"></div>
    </div>
  );
}

export default LoginPage;
