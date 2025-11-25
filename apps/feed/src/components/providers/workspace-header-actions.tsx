"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Ctx = {
  show: boolean
  actionsOnly: boolean
  title?: string
  set: (opts: { show: boolean; actionsOnly?: boolean; title?: string }) => void
}

const WorkspaceHeaderActionsContext = createContext<Ctx>({ show: false, actionsOnly: false, set: () => {} })

export function WorkspaceHeaderActionsProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  const [actionsOnly, setActionsOnly] = useState(false)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const set = ({ show, actionsOnly, title }: { show: boolean; actionsOnly?: boolean; title?: string }) => {
    setShow(show)
    setActionsOnly(Boolean(actionsOnly))
    setTitle(title)
  }
  return (
    <WorkspaceHeaderActionsContext.Provider value={{ show, actionsOnly, title, set }}>
      {children}
    </WorkspaceHeaderActionsContext.Provider>
  )
}

export function useWorkspaceHeaderActions() {
  return useContext(WorkspaceHeaderActionsContext)
}

export function WorkspaceHeaderActionsToggle({ enabled, actionsOnly = false, title }: { enabled: boolean; actionsOnly?: boolean; title?: string }) {
  const { set } = useWorkspaceHeaderActions()
  useEffect(() => {
    set({ show: enabled, actionsOnly, title })
    return () => set({ show: false, actionsOnly: false, title: undefined })
  }, [enabled, actionsOnly, title])
  return null
}
