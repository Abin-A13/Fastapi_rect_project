import React from "react";
import { useUserContext } from "../UserContext";

const AdminPage: React.FC = () => {
  const { users, deleteAllUsers } = useUserContext();

  return (
    <div className="container mt-4">
      <h2>Admin Panel - Manage Users</h2>
      <button className="btn btn-danger mb-3" onClick={deleteAllUsers}>
        Delete All Users
      </button>

      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default AdminPage;
