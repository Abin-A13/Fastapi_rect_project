import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import { useUserContext } from "../UserContext";

const API_URL = "http://localhost:8000/users"; // Update with your actual API URL

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addUser } = useUserContext(); // Get context function
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission using Axios
  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      addUser(response.data); // Add user to context
      console.log("User created:", response.data);
      navigate("/results"); // Navigate to result page
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({ first_name: "", last_name: "", email: "" });
  };

  return (
    <form onSubmit={handleValidate}>
      {error && <div className="alert alert-danger">{error}</div>}
      <InputField
        label="First Name"
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <InputField
        label="Last Name"
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-success m-3" disabled={loading}>
        {loading ? "Submitting..." : "Validate"}
      </button>
      <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
        Reset
      </button>
    </form>
  );
};

export default RegistrationForm;
