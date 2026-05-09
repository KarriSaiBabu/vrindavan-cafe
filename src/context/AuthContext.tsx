import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { dbService } from '../services/db';
import { UserProfile } from '../types';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isStaticAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInAsStaticAdmin: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStaticAdmin, setIsStaticAdmin] = useState(false);

  useEffect(() => {
    const storedStaticAdmin = localStorage.getItem('staticAdmin');
    if (storedStaticAdmin === 'true') {
      setIsStaticAdmin(true);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          let userProfile = await dbService.getUserProfile(user.uid);
          if (!userProfile) {
            userProfile = await dbService.createUserProfile({
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              role: 'user'
            });
          }
          setProfile(userProfile);
        } catch (error) {
          console.error('Profile sync error:', error);
          toast.error('Identity recognition failed. Please try again.');
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in successfully');
    } catch (error) {
      console.error('Auth error', error);
      toast.error('Failed to sign in');
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully');
      return true;
    } catch (error: any) {
      console.error('Auth error', error);
      toast.error(error?.message || 'Failed to sign in');
      return false;
    }
  };

  const signInAsStaticAdmin = async (email: string, password: string) => {
    const staticEmail = 'saibabukarri@gmail.com';
    const staticPassword = '123456789';

    if (email === staticEmail && password === staticPassword) {
      localStorage.setItem('staticAdmin', 'true');
      setIsStaticAdmin(true);
      toast.success('Static admin login successful');
      return true;
    }

    toast.error('Invalid admin email or password');
    return false;
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Auth error', error);
      toast.error(error?.message || 'Failed to create account');
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('staticAdmin');
      setIsStaticAdmin(false);
      toast.success('Logged out successfully');
    } catch (error) {
       toast.error('Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isStaticAdmin, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsStaticAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
