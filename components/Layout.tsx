import React, { ReactNode } from "react";
import { SnackbarProvider } from "notistack";
import Header from "./Header";
import SubLayout from "./SubLayout";
import { ContinentsContextProvider } from "../contexts/continentsContext";
import { SelectionContextProvider } from "../contexts/selectionContext";

type LayoutProps = { children: ReactNode; noRedirect?: boolean };

export default function Layout({ children, noRedirect }: LayoutProps) {
  return (
    <SnackbarProvider maxSnack={5}>
      <ContinentsContextProvider>
        <SelectionContextProvider>
          <Header />
          <SubLayout noRedirect={noRedirect}>{children}</SubLayout>
        </SelectionContextProvider>
      </ContinentsContextProvider>
    </SnackbarProvider>
  );
}
