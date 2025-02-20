import { useState } from "react";
import Button from "./ui/Button";
Button;

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    const response = await fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
      }),
    });

    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };
  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input
        type="text"
        placeholder="First Name"
        className="border p-2 w-full mb-2 rounded"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border p-2 w-full mb-2 rounded"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleRegister}
      >
        Register
      </button>
      <Button onClick={handleRegister}>Validate</Button>
      <Button variant="outline" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default RegisterForm;
