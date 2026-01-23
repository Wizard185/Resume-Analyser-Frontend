import { createContext, useContext, useEffect,useRef, useState } from "react";
import { getMe } from "../api/user.api";
import { refreshToken } from "../api/auth.api";


import { logoutUser, logoutAllDevices } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshRef = useRef(null);

  // 1️⃣ Initial user fetch (ONCE)
  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  

  // 2️⃣ Silent refresh (NO state change)
  const silentRefresh = async () => {
    try {
      await refreshToken();
    } catch {
      // ❌ DO NOTHING
      // No logout
      // No state change
    }
  };

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  // 3️⃣ Explicit logout ONLY on user action
  const logout = async () => {
    try {
      await logoutUser();
    } catch {}
    setUser(null);
    clearInterval(refreshRef.current);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        setUser,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);