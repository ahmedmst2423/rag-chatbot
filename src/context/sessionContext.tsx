import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SessionContextType = {
  session: number | null;
  setSession: React.Dispatch<React.SetStateAction<number | null>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<number | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionParam = searchParams.get('session_id');
    if (sessionParam && !isNaN(Number(sessionParam))) {
      setSession(Number(sessionParam));
    }
  }, [searchParams]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
