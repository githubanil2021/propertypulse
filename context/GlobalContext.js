"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getunreadMessageCount from "@/app/actions/getunreadMessageCount";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unreadCount, setunreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getunreadMessageCount().then((res) => {
        if (res.count) setunreadCount(res.count);
      });
    }
  }, [getunreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setunreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
