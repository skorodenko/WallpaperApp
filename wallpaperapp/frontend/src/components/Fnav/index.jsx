import React, { useEffect, useState } from "react"
import {useSpring, animated, config} from "@react-spring/web"
import { themes } from "themes/theming"
import { useSelector } from 'react-redux';
import { selectTheme } from "redux/themeSlice"

import { useDispatch } from "react-redux";
import { toggle } from "redux/themeSlice";

import styles from "./styles.module.css"

export default function Fnav() {
    const [atTop, setAtTop] = useState(window.scrollY >= 15)
    const mode = useSelector(selectTheme)
    const dispatch = useDispatch()

    const [theme_props,] = useSpring(() => ({
        from:{backgroundColor: themes.light.fnav_primary},
        to:{backgroundColor: themes.dark.fnav_primary},
        reverse: mode === "light",
        config: config.gentle,
    }), [mode])

    const [props,] = useSpring(() => ({
        from: {maxWidth:"100%", borderRadius:"0px", margin:"0px"},
        to: {maxWidth:"90%", borderRadius:"6px", margin:"8px"},
        reverse: !atTop,
    }), [atTop])

    function handleScrollTop() {
        window.scrollY >= 15 ? setAtTop(true) : setAtTop(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScrollTop)
        return () => window.removeEventListener("scroll", handleScrollTop)
    })

    return (
        <div className={styles.header}>
            <animated.div className={styles.fnav_container} style={{...props, ...theme_props}}>
                <h2 className={styles.title}>WallpaperApp</h2>
                <button onClick={ () => dispatch(toggle()) }>Toggle Theme</button>
            </animated.div>
        </div>
    )
}