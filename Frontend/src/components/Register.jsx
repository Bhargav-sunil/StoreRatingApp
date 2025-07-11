import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'Normal User' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registered! Please log in.');
      setForm({ name: '', email: '', password: '', address: '', role: 'Normal User' });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{ minWidth: '500px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <input className="form-control" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="mb-3">
          <input className="form-control" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="mb-3">
          <select className="form-select" onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="Normal User">Normal User</option>
            <option value="System Administrator">System Administrator</option>
            <option value="Store Owner">Store Owner</option>
          </select>
        </div>
        <button className="btn btn-success w-100" type="submit">Register</button>
        <p className="mt-3 text-center text-muted">
          Already have an account?{" "}
          <span
            className="text-primary fw-semibold text-decoration-underline hover-shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
