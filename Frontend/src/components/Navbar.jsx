import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">🏪 Store Rating</Link>

        <div className="d-flex ms-auto">
          {token ? (
            <button className="btn btn-outline-light" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-light me-2" to="/">Login</Link>
              <Link className="btn btn-light text-primary" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
