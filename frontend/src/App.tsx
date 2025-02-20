import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import ResultPage from "./pages/ResultPage";
import { UserProvider } from "./UserContext";
import AdminPage from "./pages/AdminPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
