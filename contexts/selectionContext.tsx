import { createContext, useState, useMemo, ReactNode } from "react";
import { Selection } from "../@types";

const initSelection: Selection = {
  continent: "",
  country: "",
};

type SelectionContextProviderProps = { children: ReactNode };
type Context = {
  selection: Selection;
  setSelection: (c: Selection) => void;
};

const SelectionContext = createContext<Context>({
  selection: initSelection,
  setSelection: () => {},
});

export function SelectionContextProvider({
  children,
}: SelectionContextProviderProps) {
  const [selection, setSelection] = useState(initSelection);
  const value = useMemo(
    () => ({
      selection,
      setSelection,
    }),
    [selection]
  );
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export default SelectionContext;
