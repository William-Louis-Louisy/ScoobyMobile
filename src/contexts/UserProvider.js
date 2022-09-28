import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("fr");
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
