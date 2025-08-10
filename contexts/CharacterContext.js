import React, { createContext, useState } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characterList, setCharacterList] = useState([]);
  return (
    <CharacterContext.Provider value={[characterList, setCharacterList]}>
      {children}
    </CharacterContext.Provider>
  );
};
