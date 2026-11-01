import { createContext, useContext, useEffect, useState } from "react";
import { getPortfolioData } from "../lib/api";

const PortfolioDataContext = createContext({ data: null, loading: false, error: null, refresh: () => {} });

export function PortfolioDataProvider({ children }) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const load = () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    getPortfolioData().then((data) => setState({ data, loading: false, error: null })).catch((error) => setState({ data: null, loading: false, error }));
  };
  useEffect(load, []);
  return <PortfolioDataContext.Provider value={{ ...state, refresh: load }}>{children}</PortfolioDataContext.Provider>;
}

export const usePortfolioData = () => useContext(PortfolioDataContext);
