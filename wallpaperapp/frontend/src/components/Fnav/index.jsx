import React, { useEffect, useState } from "react"
import {useSpring, animated} from "@react-spring/web"

import ThemeToggle from "./ThemeToggle";
import Title from "./Title";
import Menu from "./Menu";

import styles from "./styles.module.css"

export default function Fnav({theme}) {
    const [atTop, setAtTop] = useState(window.scrollY >= 20)
    
    const [float_props, fnav] = useSpring(() => ({maxWidth:"100%", borderRadius:"0px", margin:"0px"}))

    function handleScrollTop() {
        window.scrollY >= 20 ? setAtTop(true) : setAtTop(false)
    }

    useEffect(() => {
        atTop ? fnav.start({maxWidth:"90%", borderRadius:"6px", margin:"10px"})
              : fnav.start({maxWidth:"100%", borderRadius:"0px", margin:"0px"})
    })

    useEffect(() => {
        window.addEventListener("scroll", handleScrollTop)
        return () => window.removeEventListener("scroll", handleScrollTop)
    })

    return (
        <animated.div className={styles.header}>
            <animated.div className={styles.fnav_container} style={{...float_props, ...theme, backgroundColor: theme.blur_bg}}>
                <Menu theme={theme}/>
                <span className={styles.spacer}/>
                <Title/>
                <span className={styles.spacer}/>
                <ThemeToggle/>
            </animated.div>
        </animated.div>
    )
}