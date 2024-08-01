import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    
    const storedUsername = window.localStorage.getItem('username');
    const storedRole = window.localStorage.getItem('role');
    if (storedUsername) setUsername(storedUsername);
    if (storedRole) setRole(storedRole);
  }, []);

  const logout = () => {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('role');
    setUsername('');
    setRole('');
  };

  return (
    <UserContext.Provider value={{ username, setUsername, role, setRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};
