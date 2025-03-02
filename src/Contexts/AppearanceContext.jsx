import { createContext, useContext, useState } from "react";

const AppearanceContext = createContext();

export const AppearanceProvider = ({ children }) =>{
      const [Layout, setLayout] = useState("stack");
      const [InputFontColor, setInputFontColor] = useState("#111");
      const [btnfontColor, setbtnfontColor] = useState("#fff");
      const [btnFill, setbtnFill] = useState("");
      const [btnOutline, setbtnOutline] = useState("");
      const [btnShadow, setbtnShadow] = useState("");
      const [inputFont,setinputFont] = useState("");
      const [theme,setTheme] = useState("");

      return(
        <AppearanceContext.Provider
            value={{
                Layout,
                setLayout,
                InputFontColor,
                setInputFontColor,
                btnfontColor,
                setbtnfontColor,
                btnFill,setbtnFill,
                btnOutline,
                setbtnOutline,
                btnShadow,
                setbtnShadow,
                inputFont,
                setinputFont,
                theme,
                setTheme
            }}
        >
            {children}
        </AppearanceContext.Provider>
      )
}

export const useAppearance = () =>useContext(AppearanceContext);