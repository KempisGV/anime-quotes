import React, { createContext, useState } from 'react';

// Crea el contexto
export const CharacterContext = createContext();

// Crea el proveedor del contexto
export const CharacterProvider = ({ children }) => {
  const [characterList, setCharacterList] = useState([]);

  return (
    <CharacterContext.Provider value={[characterList, setCharacterList]}>
      {children}
    </CharacterContext.Provider>
  );
};
