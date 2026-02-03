/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/context";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileAttempted, setProfileAttempted] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  /* -------- LOGOUT -------- */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setProfile(null);
    setProfileAttempted(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");
  }, []);

  /* -------- GET PROFILE -------- */
  const getProfile = useCallback(async () => {
    if (!token || loadingProfile) return;
    setLoadingProfile(true);
    // Removed setLoading(true) to prevent UI flicker/reload feeling in PrivateRoute
    try {
      const res = await axiosSecure.get("/account/profile/");
      const userData = res.data?.data || res.data;
      setProfile(userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setProfileAttempted(true);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setProfileAttempted(true);
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
      setLoadingProfile(false);
    }
  }, [axiosSecure, token, logout, loadingProfile]);

  /* -------- SAVE AUTH (EMAIL / TOKEN / USER) -------- */
  const saveAuth = useCallback((data) => {
    if (!data) return;
    setProfile(null);
    setProfileAttempted(false);

    if (data.token || data.access) {
      const tokenString = data.token || data.access;
      setToken(tokenString);
      localStorage.setItem("token", tokenString);
    }

    if (typeof data === "string") {
      const userObj = { email: data };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
    } else if (data.userdata) {
      setUser(data.userdata);
      localStorage.setItem("user", JSON.stringify(data.userdata));
    } else if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, []);

  /* -------- LOAD FROM LOCAL STORAGE -------- */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Failed to parse saved user", e);
        }
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  /* -------- AUTO FETCH PROFILE WHEN TOKEN CHANGES -------- */
  useEffect(() => {
    // Only fetch if we don't have a profile yet, haven't attempted yet, and have a token
    if (token && !profile && !profileAttempted && !loading) {
      getProfile();
    }
  }, [token, profile, profileAttempted, loading, getProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        email,
        setEmail,
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
