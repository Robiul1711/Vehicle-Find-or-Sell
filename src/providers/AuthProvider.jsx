/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/context";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------- LOAD FROM LOCAL STORAGE -------- */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false);
  }, []);

  /* -------- SAVE AUTH (EMAIL / TOKEN / USER) -------- */
  const saveAuth = useCallback((data) => {
    if (!data) return;

    if (data.token || data.access) {
      const token = data.token || data.access;
      setToken(token);
      localStorage.setItem("token", token);
    }

    if (typeof data === "string") {
      const userObj = { email: data };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
    } else if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, []);

  /* -------- GET PROFILE -------- */
  const getProfile = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axiosSecure.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data.data);
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  /* -------- LOGOUT -------- */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setProfile(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        loading,
        saveAuth,
        getProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
