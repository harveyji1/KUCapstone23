import React, { useState, createContext, ReactNode } from 'react';

// Create the context with a default value
interface ContextType {
  state: any; // Replace 'any' with your state type
  setState: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your state type
}

export const LoginContext = createContext<ContextType>({
  state: '',
  setState: () => {}
});

// Provider component with typed children
interface MyProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [state, setState] = useState('');

  // Context value
  const contextValue = {
    state,
    setState,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};