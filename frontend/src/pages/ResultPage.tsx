import React from "react";
import { useUserContext } from "../UserContext";

const ResultPage: React.FC = () => {
  const { users } = useUserContext(); // Retrieve users from context

  return (
    <div className="container mt-4">
      <h2>Registered Users</h2>
      {users.length > 0 ? (
        <div>
          <h4>Last Registered: {users[users.length - 1].first_name}</h4>
        </div>
      ) : (
        <p>No users registered yet.</p>
      )}
    </div>
  );
};

export default ResultPage;
