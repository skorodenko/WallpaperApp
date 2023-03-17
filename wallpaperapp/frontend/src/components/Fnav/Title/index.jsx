import {useSpring, config} from "@react-spring/web"
import { themes } from "themes/theming"

import styles from "../styles.module.css"

export default function Title(props) {
    const mode = props.mode

    const [theme_props,] = useSpring(() => ({
        from:{color: themes.light.base.color},
        to:{color: themes.dark.base.color},
        reverse: mode === "light",
        config: config.gentle,
    }), [mode])

    return (
        <h2 className={styles.title} style={theme_props}>WallpaperApp</h2>
    )
}