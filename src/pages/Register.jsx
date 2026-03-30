import { Link } from 'react-router-dom';
function Register() {
  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username"
              placeholder="Choose a username" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              placeholder="Create a password" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Verify Password:</label>
            <input 
              type="password" 
              id="confirmPassword"
              placeholder="Re-enter your password" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
        <p className="auth-footer">
           Already have an account? <Link to="/login">Login here</Link> 
        </p>
      </div>
    </div>
  );
}

export default Register;