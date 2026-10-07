import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_USERS = {
  buyer: {
    id: "buyer-demo-id",
    name: "Vikrant Rathod",
    email: "vikrantrathodofficial@gmail.com",
    password: "demo123456",
    phone: "+91 98765 12345",
    role: "buyer",
    city: "Hyderabad",
    plot_interest: ["open_plots", "villa_plots"],
    budget_range: "₹30L – ₹50L"
  },
  builder: {
    id: "builder-demo-id",
    name: "Sri Balaji Developers",
    company_name: "Sri Balaji Infra Projects",
    email: "builder@balajiinfra.com",
    password: "demo123456",
    phone: "+91 99887 76655",
    role: "builder",
    designation: "Managing Director",
    city: "Hyderabad",
    state: "Telangana"
  },
  admin: {
    id: "admin-master-id",
    name: "OnlyPlots Admin",
    email: "admin@onlyplots.online",
    password: "admin123456",
    phone: "+91 98765 43210",
    role: "admin",
    city: "Hyderabad"
  }
};

export const INITIAL_ACCOUNTS = [
  DEFAULT_USERS.buyer,
  DEFAULT_USERS.builder,
  DEFAULT_USERS.admin
];

// Helper to get all registered accounts from localStorage
export const getAccounts = () => {
  try {
    const raw = localStorage.getItem('onlyplots_accounts');
    if (!raw) {
      localStorage.setItem('onlyplots_accounts', JSON.stringify(INITIAL_ACCOUNTS));
      return [...INITIAL_ACCOUNTS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('onlyplots_accounts', JSON.stringify(INITIAL_ACCOUNTS));
      return [...INITIAL_ACCOUNTS];
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse onlyplots_accounts:', e);
    return [...INITIAL_ACCOUNTS];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      // Ensure seed demo accounts exist in localStorage
      getAccounts();

      const savedUser = localStorage.getItem('onlyplots_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Initially unauthenticated so the user sees the Login page initially
        setUser(null);
      }
    } catch (e) {
      console.error(e);
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  // Strict Real-Time Login: whoever signed up then only login!
  const login = async (email, password, role = 'buyer') => {
    if (!email || !email.trim()) {
      throw new Error("Please enter your registered email address.");
    }
    if (!password) {
      throw new Error("Please enter your account password.");
    }

    const cleanEmail = email.trim().toLowerCase();
    const accounts = getAccounts();

    // Look for exact registered account
    const found = accounts.find(
      (a) => a.email && a.email.trim().toLowerCase() === cleanEmail
    );

    // If account not registered -> STRICT ERROR: User must sign up first!
    if (!found) {
      throw new Error("No account found with this email. Please sign up first.");
    }

    // Verify password matches the password saved at signup
    if (found.password && found.password !== password) {
      throw new Error("Incorrect password. Please verify your credentials and try again.");
    }

    // Success: Set authenticated user session
    setUser(found);
    localStorage.setItem('onlyplots_user', JSON.stringify(found));
    return { record: found };
  };

  const guestLogin = () => {
    const guestUser = {
      ...DEFAULT_USERS.buyer,
      name: "Guest Explorer"
    };
    setUser(guestUser);
    localStorage.setItem('onlyplots_user', JSON.stringify(guestUser));
    return guestUser;
  };

  const oauthLogin = async (provider) => {
    const defaultUser = {
      id: `google_${Date.now()}`,
      name: "Google User",
      email: "user@gmail.com",
      phone: "+91 98765 43210",
      role: "buyer",
      provider
    };
    setUser(defaultUser);
    localStorage.setItem('onlyplots_user', JSON.stringify(defaultUser));
    return { record: defaultUser };
  };

  // Real-Time Signup: Saves account into persistent registry so they can log in
  const signup = async (signupData) => {
    if (!signupData.email || !signupData.email.trim()) {
      throw new Error("Email address is required.");
    }
    if (!signupData.password || signupData.password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const cleanEmail = signupData.email.trim().toLowerCase();
    const accounts = getAccounts();

    // Check if email already registered
    const exists = accounts.find(
      (a) => a.email && a.email.trim().toLowerCase() === cleanEmail
    );
    if (exists) {
      throw new Error("An account with this email already exists. Please log in instead.");
    }

    const newUser = {
      id: `buyer_${Date.now()}`,
      ...signupData,
      email: cleanEmail,
      role: 'buyer',
      createdAt: new Date().toISOString()
    };

    // Append new account and save to localStorage
    const updatedAccounts = [...accounts, newUser];
    localStorage.setItem('onlyplots_accounts', JSON.stringify(updatedAccounts));

    // Note: Do NOT setUser(newUser) here so user must log in through the login page
    return { record: newUser };
  };

  // Real-Time Builder Signup
  const signupWithFiles = async (email, password, details) => {
    if (!email || !email.trim()) {
      throw new Error("Email address is required.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const cleanEmail = email.trim().toLowerCase();
    const accounts = getAccounts();

    const exists = accounts.find(
      (a) => a.email && a.email.trim().toLowerCase() === cleanEmail
    );
    if (exists) {
      throw new Error("An account with this email already exists. Please log in instead.");
    }

    const newBuilder = {
      id: `builder_${Date.now()}`,
      email: cleanEmail,
      password,
      ...details,
      role: 'builder',
      createdAt: new Date().toISOString()
    };

    const updatedAccounts = [...accounts, newBuilder];
    localStorage.setItem('onlyplots_accounts', JSON.stringify(updatedAccounts));

    // Note: Do NOT setUser(newBuilder) here so builder must log in through the login page
    return { record: newBuilder };
  };

  const switchRole = (role) => {
    const targetUser = DEFAULT_USERS[role] || { ...user, role };
    setUser(targetUser);
    localStorage.setItem('onlyplots_user', JSON.stringify(targetUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('onlyplots_user');
  };

  const isAuthed = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        isAuthed,
        login,
        signup,
        signupWithFiles,
        guestLogin,
        oauthLogin,
        switchRole,
        logout,
        DEFAULT_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
