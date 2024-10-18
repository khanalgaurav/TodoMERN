import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLogin,
        setUserLogin,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserContextProvider, useGlobalContext };
