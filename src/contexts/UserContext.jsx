import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) return null;

    return JSON.parse(atob(token.split('.')[1])).payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    localStorage.removeItem('token'); // Remove invalid token
    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
