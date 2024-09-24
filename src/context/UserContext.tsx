import React, { createContext, useState, ReactNode } from 'react';

// Create a Context
export const UserContext = createContext<any>(null);

interface Props {
  children: ReactNode;
}

 const UserProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;