import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage: React.FC = () => {
  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
