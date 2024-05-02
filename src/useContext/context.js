import { createContext, useState  } from 'react';
export const AppContext = createContext();
export const AppContextParam = createContext();
export const AppContextParamByType = createContext();
export const AppContextFonctionnalite = createContext();

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

export const useAppStateFonctionnalite = () => {
    const appState = useState([]);
    return appState;
}