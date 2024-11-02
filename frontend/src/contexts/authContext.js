import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const decodeToken = (token) => {
  if (!token) return null; // Return null if there's no token
  try {
    const decoded = jwtDecode(token);
    return decoded; // Return decoded token
  } catch (error) {
    console.error('Token decoding failed:', error);
    return null; // Return null if decoding fails
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      const decoded = decodeToken(savedToken);
      if (decoded) {
        if (decoded.exp < Date.now() / 1000) {
          logout();
        }
        setToken(savedToken);
        setUser({ userId: decoded.userId, email: decoded.email });
      } else {
        logout();
      }
    }

    setLoading(false);
  }, []);

  const login = async (token) => {
    try {
      Cookies.set('token', token);
      setToken(token);
      return true;
      //   setUser({ email }); // Optionally set user data
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
