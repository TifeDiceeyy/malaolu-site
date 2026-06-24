import { createContext, useContext, useState, type ReactNode } from "react";

interface UIState {
  menuOpen: boolean;
  searchOpen: boolean;
  audioMuted: boolean;
  setMenuOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setAudioMuted: (v: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState<boolean>(() => {
    try {
      const v = sessionStorage.getItem("audioMuted");
      return v !== null ? v === "true" : true;
    } catch {
      return true;
    }
  });

  return (
    <UIContext.Provider
      value={{
        menuOpen,
        searchOpen,
        audioMuted,
        setMenuOpen,
        setSearchOpen,
        setAudioMuted,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
