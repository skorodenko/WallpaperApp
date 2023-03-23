import { useSpring } from "@react-spring/web"

import { useSelector } from "react-redux";
import { selectTheme } from "redux/themeSlice"
import Home from "components/Home"
import { themes } from "themes/theming";
import "./index.css"

export default function Root() {
    const mode = useSelector(selectTheme)

    const [theme_props,] = useSpring(() => ({
        from: { ...themes.light },
        to: { ...themes.dark },
        reverse: mode === "light",
    }), [mode])

    return(
        <Home theme={theme_props}/>
    )
}