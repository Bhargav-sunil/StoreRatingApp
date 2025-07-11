import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const role = res.data.user.role;

      alert("Login successful!");
        setForm({ email: "", password: "" });
        if (role === "System Administrator") {
          navigate("/admin");
        } else if (role === "Normal User") {
          navigate("/user");
        } else {
          navigate("/owner");
        }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ minWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
        <p className="mt-3 text-center text-muted">
          Don’t have an account?
          <span
            className="text-primary fw-semibold text-decoration-underline hover-shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
