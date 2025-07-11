import { useEffect, useState } from "react";
import API from "../utils/api";

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [store, setStore] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    API.get("/owner/ratings").then((res) => setRatings(res.data));
    API.get("/owner/average").then((res) => setAverage(res.data.average));
  }, []);

  const addStore = async (e) => {
    e.preventDefault();
    await API.post("/owner/add-store", store);
    alert("Store added");
    setStore({ name: "", email: "", address: "" });
  };

  return (
    <div className="container mt-4" style={{ minWidth: "1000px" }}>
      <h2 className="text-center">Store Owner Dashboard</h2>

      <div className="d-flex justify-content-center mb-4">
        <div className="col-md-4">
        <form className="card p-3 shadow-sm" onSubmit={addStore}>
          <h5>Add Store</h5>
          {["name", "email", "address"].map((field) => (
            <input
              key={field}
              className="form-control mb-2"
              placeholder={field}
              onChange={(e) => setStore({ ...store, [field]: e.target.value })}
            />
          ))}
          <button className="btn btn-success w-100">Add</button>
        </form>
      </div>
      </div>

      <div className="alert alert-info text-center">
        <strong>Average Rating:</strong> {average?.toFixed(2) || 0}
      </div>

      <h5>Ratings Received:</h5>
      <ul className="list-group">
        {ratings.map((r, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{r.name}</span>
            <span className="badge bg-success">{r.rating} ★</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
