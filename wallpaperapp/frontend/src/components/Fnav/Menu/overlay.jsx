import { useSpring, useChain, useSpringRef, useTransition, animated, config } from "@react-spring/web"
import { createPortal } from "react-dom";

import styles from "../styles.module.css"


export default function Overlay({ theme, open, closeModal }) {
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