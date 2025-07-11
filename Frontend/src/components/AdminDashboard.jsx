import { useEffect, useState } from 'react';
import API from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'Normal User' });
  const [store, setStore] = useState({ name: '', email: '', address: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/admin/stats').then(res => setStats(res.data));
    API.get('/admin/users').then(res => setUsers(res.data));
  }, [users]);

  const addUser = async (e) => {
    e.preventDefault();
    await API.post('/admin/add-user', form);
    alert('User added');
    setForm({ name: '', email: '', password: '', address: '', role: 'Normal User' });
    setUsers([...users, form]); 
  };

  const addStore = async (e) => {
    e.preventDefault();
    await API.post('/admin/add-store', store);
    alert('Store added');
    setStore({ name: '', email: '', address: '' });
  };

  return (
    <div className="container mt-4" style={{ minWidth: "1000px" }}>
      <h2 className="text-center">Admin Dashboard</h2>

      <div className="row my-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>System Stats</h5>
            <p>Users: {stats.totalUsers}</p>
            <p>Stores: {stats.totalStores}</p>
            <p>Ratings: {stats.totalRatings}</p>
          </div>
        </div>

        <div className="col-md-4">
          <form className="card p-3 shadow-sm" onSubmit={addUser}>
            <h5>Add User</h5>
            {['name', 'email', 'password', 'address'].map(field => (
              <input key={field} className="form-control mb-2" placeholder={field}
                onChange={e => setForm({ ...form, [field]: e.target.value })} />
            ))}
            <select className="form-select mb-2" onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="Normal User">Normal User</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Store Owner">Store Owner</option>
            </select>
            <button className="btn btn-primary w-100">Add</button>
          </form>
        </div>

        <div className="col-md-4">
          <form className="card p-3 shadow-sm" onSubmit={addStore}>
            <h5>Add Store</h5>
            {['name', 'email', 'address'].map(field => (
              <input key={field} className="form-control mb-2" placeholder={field}
                onChange={e => setStore({ ...store, [field]: e.target.value })} />
            ))}
            <button className="btn btn-success w-100">Add</button>
          </form>
        </div>
      </div>

      <h5 className="mt-4">All Users:</h5>
      <ul className="list-group">
        {users.map(u => (
          <li key={u.id} className="list-group-item d-flex justify-content-between">
            <span>{u.name}</span>
            <span className="badge bg-secondary">{u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
