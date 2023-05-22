import { createContext, useState, useMemo, ReactNode } from "react";
import { Continent } from "../@types";

const initContinents: Continent[] = [];

type ContinentContextProviderProps = { children: ReactNode };
type Context = {
  continents: Continent[];
  setContinents: (c: Continent[]) => void;
};

const ContinentsContext = createContext<Context>({
  continents: initContinents,
  setContinents: () => {},
});

export function ContinentsContextProvider({
  children,
}: ContinentContextProviderProps) {
  const [continents, setContinents] = useState(initContinents);
  const value = useMemo(
    () => ({
      continents,
      setContinents,
    }),
    [continents]
  );

  return (
    <ContinentsContext.Provider value={value}>
      {children}
    </ContinentsContext.Provider>
  );
}

export default ContinentsContext;
