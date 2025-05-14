'use client'

import { createContext, useState,  } from 'react'

export const ActionsContext = createContext()

export const ActionsProvider = ({ children }) => {
  const [showSiderbarCatalogue, setShowSiderbarCatalogue] = useState(false)

  const toggleShowSiderbarCatalogue = () => setShowSiderbarCatalogue((prev) => !prev)

  const closeSession = () => {
    // signOut({ callbackUrl: "/" });
  };

  return (
    <ActionsContext.Provider
      value={{
        showSiderbarCatalogue,
        toggleShowSiderbarCatalogue,
        closeSession,
      }}
    >
      {children}
    </ActionsContext.Provider>
  )
}
