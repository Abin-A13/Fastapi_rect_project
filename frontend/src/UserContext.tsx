import axios from "axios";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id?: number; // Optional id field, if provided by your backend
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => Promise<void>;
  deleteAllUsers: () => void;
  deleteUserById: (id: number) => Promise<void>;
  getUserById: (id: number) => Promise<User | null>;
}

const API_URL = "http://localhost:8000/users"; 

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Poll the API every 5 seconds for realtime updates
  useEffect(() => {
    fetchUsers(); // initial fetch
    const interval = setInterval(fetchUsers, 2000);
    return () => clearInterval(interval);
  }, []);

  // Add a new user
  const addUser = async (user: User) => {
    try {
      const response = await axios.post(API_URL, user, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("User created:", response.data);
      
      // Update the user list after creation
      await fetchUsers();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error adding user:", err.response?.data || err.message);
      } else {
        console.error("Error adding user:", err);
      }
      setError(err instanceof Error ? err.message : "Failed to register user");
    }
  };
  

  // Delete all users (from local state)
  const deleteAllUsers = async () => {
    try {
      await axios.delete(API_URL);
      setUsers([]);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
   
  };

  // Delete a user by ID
  const deleteUserById = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log(`User with id ${id} deleted`);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  // Get a user by ID
  const getUserById = async (id: number): Promise<User | null> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch user");
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteAllUsers, deleteUserById, getUserById }}>
      {children}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
