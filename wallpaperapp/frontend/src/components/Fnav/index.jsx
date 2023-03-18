import React, { useEffect, useState } from "react"
import {useSpring, animated} from "@react-spring/web"

import ThemeToggle from "./ThemeToggle";
import Title from "./Title";

import styles from "./styles.module.css"

export default function Fnav(props) {
    const [atTop, setAtTop] = useState(window.scrollY >= 20)
    const theme = props.theme
    
    const [float_props,] = useSpring(() => ({
        from: {maxWidth:"100%", borderRadius:"0px", margin:"0px"},
        to: {maxWidth:"90%", borderRadius:"6px", margin:"10px"},
        reverse: !atTop,
    }), [atTop])

    function handleScrollTop() {
        window.scrollY >= 20 ? setAtTop(true) : setAtTop(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScrollTop)
        return () => window.removeEventListener("scroll", handleScrollTop)
    })

    return (
        <div className={styles.header}>
            <animated.div className={styles.fnav_container} style={{...float_props, backgroundColor: theme.fnav_bg, color: theme.color}}>
                <span className={styles.spacer}/>
                <Title/>
                <span className={styles.spacer}/>
                <ThemeToggle/>
            </animated.div>
        </div>
    )
}