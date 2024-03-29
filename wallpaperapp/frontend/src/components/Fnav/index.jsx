import React, { useContext, useEffect, useState } from "react"
import {useSpring, animated} from "@react-spring/web"

import ThemeToggle from "./ThemeToggle";
import Title from "./Title";
import Menu from "./Menu";

import styles from "./styles.module.css"
import { ThemeContext } from "components/Root/themeProvider";

export default function Fnav() {
    const [atTop, setAtTop] = useState(window.scrollY >= 20)
    const { theme } = useContext(ThemeContext)
    const [float_props, fnav] = useSpring(() => ({maxWidth:"100%", borderRadius:"0px", marginTop:"0px"}))

    function handleScrollTop() {
        window.scrollY >= 20 ? setAtTop(true) : setAtTop(false)
    }

    useEffect(() => {
        atTop ? fnav.start({maxWidth:"90%", borderRadius:"6px", marginTop:"15px"})
              : fnav.start({maxWidth:"100%", borderRadius:"0px", marginTop:"0px"})
    })

    useEffect(() => {
        window.addEventListener("scroll", handleScrollTop)
        return () => window.removeEventListener("scroll", handleScrollTop)
    })

    return (
        <animated.div className={styles.header}>
            <animated.div className={styles.fnav_container} style={{...float_props, ...theme, backgroundColor: theme.blur_bg}}>
                <Menu />
                <span className={styles.spacer}/>
                <Title/>
                <span className={styles.spacer}/>
                <ThemeToggle/>
            </animated.div>
        </animated.div>
    )
}