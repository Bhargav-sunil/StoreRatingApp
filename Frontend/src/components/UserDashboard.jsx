import { useEffect, useState } from 'react';
import API from '../utils/api';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [ratingForm, setRatingForm] = useState({ store_id: '', rating: '' });

  const fetchStores = async () => {
    const res = search
      ? await API.get(`/user/search?keyword=${search}`)
      : await API.get('/user/stores');
    setStores(res.data);
  };

  useEffect(() => { fetchStores(); }, []);

  const submitRating = async (e) => {
    e.preventDefault();
    await API.post('/user/rate', ratingForm);
    alert('Rating submitted/updated');
  };

  return (
    <div className="container mt-4" style={{ minWidth: "1000px" }}>
      <h2 className="text-center">User Dashboard</h2>

      <div className="input-group mb-3">
        <input className="form-control" placeholder="Search stores..."
          onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-outline-primary" onClick={fetchStores}>Search</button>
      </div>

      <h5>Stores</h5>
      <ul className="list-group mb-4">
        {stores.map(s => (
          <li key={s.id} className="list-group-item">
            <strong>{s.name}</strong><br />
            <small>{s.address}</small>
          </li>
        ))}
      </ul>

      <h5>Submit/Update Rating</h5>
      <form className="card p-3" onSubmit={submitRating}>
        <input className="form-control mb-2" placeholder="Store ID"
          onChange={e => setRatingForm({ ...ratingForm, store_id: e.target.value })} />
        <input className="form-control mb-2" placeholder="Rating (1-5)"
          onChange={e => setRatingForm({ ...ratingForm, rating: e.target.value })} />
        <div className='d-flex justify-content-center'>
          <button className="btn btn-warning w-30">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UserDashboard;
