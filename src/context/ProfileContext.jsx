import { createContext, useContext } from 'react';
import { useProfile } from '../hooks/useProfile';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const profile = useProfile();

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
}
