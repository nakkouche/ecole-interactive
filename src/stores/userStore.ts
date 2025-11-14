import { writable } from 'svelte/store';

export interface User {
  prenom: string;
  classe: 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2';
}

// Récupération depuis localStorage si disponible
const storedUser =
  typeof window !== 'undefined' ? localStorage.getItem('ecole_user') : null;
const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

// Store pour l'utilisateur actuel
export const userStore = writable<User | null>(initialUser);

// Sauvegarde automatique dans localStorage
if (typeof window !== 'undefined') {
  userStore.subscribe((user) => {
    if (user) {
      localStorage.setItem('ecole_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ecole_user');
    }
  });
}

// Fonctions utilitaires
export function setUser(user: User) {
  userStore.set(user);
}

export function clearUser() {
  userStore.set(null);
}
