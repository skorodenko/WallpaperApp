import { useTransition, animated } from "@react-spring/web"
import { createPortal } from "react-dom";

import styles from "../styles.module.css"
import { useContext } from "react";
import { ThemeContext } from "components/Root/themeProvider";


export default function Overlay({ open, closeModal }) {
    const {theme} = useContext(ThemeContext)
    
    const transition = useTransition(open ? [open] : [], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return createPortal(
        transition((style,item) => (
            <animated.div style={{...style, backgroundColor: theme.blur_bg}} onClick={closeModal} className={styles.overlay}/>)),
        document.getElementById("overlay")
    )
}