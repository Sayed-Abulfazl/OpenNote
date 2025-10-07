"use client"

import { createContext, useReducer } from "react"

export const ThemeObject = createContext();

const ThemeFUN = (state, action) => {
    switch (action.type) {
        case 'CM':
            return { ...state, noteV1Mode: action.payload };
        case 'CL':
            return { ...state, noteV1Lang: action.payload };
        default:
            return state
    }
}

const initial = {
    noteV1Mode : 'light',
    noteV1Lang : 'fa',
}

export const ThemeFunction = ({ children }) => {

    const [state, dispatch] = useReducer(ThemeFUN, initial);

    const chnageMode = (inputMode) => {
        dispatch({ type: "CM", payload: inputMode })
    }
    const chnageLang = (inputLang) => {
        dispatch({ type: "CL", payload: inputLang })
    }

    return (
        <ThemeObject.Provider value={{ ...state, chnageMode, chnageLang }}>
            {children}
        </ThemeObject.Provider>
    )
}