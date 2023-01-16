import {Context, createContext, PropsWithChildren} from "react";

type ControlsContextValue = {};

export const ControlsContext: Context<ControlsContextValue> =
  createContext({});

export const ControlsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ControlsContext.Provider value={{}}>
      {children}
    </ControlsContext.Provider>
  );

}
