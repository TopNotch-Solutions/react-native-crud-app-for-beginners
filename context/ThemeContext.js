import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "../constants/Colors";

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) =>{
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    console.log("Here is the current color scheme: ",colorScheme);

    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
    console.log("theme: ",theme)

    return (
        <ThemeContext.Provider value={{colorScheme, setColorScheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}