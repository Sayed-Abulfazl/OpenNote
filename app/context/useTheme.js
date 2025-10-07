"use client"
import { useContext } from "react";
import { ThemeObject } from "./ThemeContext";

export function useTheme(){
    const  theme  = useContext(ThemeObject);
    return theme;
}