import { useSpring } from "@react-spring/web"
import { Toaster } from "react-hot-toast"

import { useSelector } from "react-redux";
import { selectTheme } from "redux/themeSlice"
import Home from "components/Home"
import Auth from "components/Auth"
import { themes } from "themes/theming";
import "./index.css"

export default function Root() {
    const mode = useSelector(selectTheme)

    const [theme_props,] = useSpring(() => ({
        from: { ...themes.light },
        to: { ...themes.dark },
        reverse: mode === "light",
    }), [mode])

    return (
        <>
            <div id="modal"></div>
            <div id="overlay"></div>
            
            <Auth theme={theme_props} />

            <Toaster 
                position="bottom-center"
                containerStyle={{
                    transform: "translateY(-5%)"
                }}
                toastOptions={{
                    style: {
                        background: mode === "light" 
                            ? themes.light.color 
                            : themes.dark.color,
                        color: mode === "light" 
                            ? themes.light.backgroundColor
                            : themes.dark.backgroundColor,
                    }
                }}
            />
        </>
    )
}