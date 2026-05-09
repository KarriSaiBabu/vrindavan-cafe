import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  addDoc,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { FoodItem, Order, UserProfile } from '../types';

export const dbService = {
  // Menu
  async getMenuItems() {
    const path = 'menu';
    try {
      const snapshot = await getDocs(collection(db, path));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FoodItem[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async addMenuItem(item: Omit<FoodItem, 'id'>) {
    const path = 'menu';
    try {
      const docRef = await addDoc(collection(db, path), item);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  // Users
  async getUserProfile(uid: string) {
    const path = `users/${uid}`;
    try {
      const docSnap = await getDoc(doc(db, 'users', uid));
      return docSnap.exists() ? docSnap.data() as UserProfile : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async createUserProfile(profile: UserProfile) {
    const path = `users/${profile.uid}`;
    try {
      await setDoc(doc(db, 'users', profile.uid), profile);
      return profile;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // Orders
  async placeOrder(orderData: Omit<Order, 'id' | 'createdAt'>) {
    const path = 'orders';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...orderData,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async getUserOrders(userId: string) {
    const path = 'orders';
    try {
      const q = query(collection(db, path), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  // Admin functions
  async getAllOrders() {
    const path = 'orders';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const path = `orders/${orderId}`;
    try {
      await setDoc(doc(db, 'orders', orderId), { status }, { merge: true });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async createAdminAccount() {
    const adminEmail = 'admin@vrindavancafe.com';
    const adminPassword = 'admin123456'; // This should be changed in production
    
    try {
      // Check if admin already exists
      const adminQuery = query(collection(db, 'users'), where('role', '==', 'admin'));
      const adminSnapshot = await getDocs(adminQuery);
      
      if (!adminSnapshot.empty) {
        return adminSnapshot.docs[0].data() as UserProfile;
      }

      // Create admin account
      const adminProfile: UserProfile = {
        uid: 'admin-' + Date.now(), // Generate a unique ID
        email: adminEmail,
        displayName: 'Admin',
        role: 'admin'
      };

      await setDoc(doc(db, 'users', adminProfile.uid), adminProfile);
      return adminProfile;
    } catch (error) {
      console.error('Error creating admin account:', error);
      throw error;
    }
  },

  async sendOrderNotification(orderData: Order) {
    const path = 'notifications';
    try {
      await addDoc(collection(db, path), {
        type: 'new_order',
        orderId: orderData.id,
        userId: orderData.userId,
        total: orderData.total,
        items: orderData.items.length,
        createdAt: serverTimestamp(),
        read: false
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }
};
