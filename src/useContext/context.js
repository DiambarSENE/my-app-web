import { createContext, useState  } from 'react';
export const AppContext = createContext();
export const AppContextParam = createContext();
export const AppContextParamByType = createContext();
export const AppContextSousParametre = createContext();

export const useAppState = () => {
    //const initialiser = [];
    const appState = useState([]);
    return appState;
};


export const useAppStateParam = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateParamByType = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateSousParametre = () => {
    const appState = useState([]);
    return appState;
}