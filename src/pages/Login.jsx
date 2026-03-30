import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username"
              placeholder="Enter your username" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              placeholder="Enter your password" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="auth-footer">
           Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;