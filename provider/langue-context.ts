import {createContext, useContext} from 'react';

export const AppContext = createContext<Partial<any>>({});

export const useAppContext = () => useContext(AppContext);
