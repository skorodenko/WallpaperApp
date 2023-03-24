import { useSpring, useChain, useSpringRef, useTransition, animated, config } from "@react-spring/web"

import styles from "../styles.module.css"


export default function Overlay({ theme, open, closeModal }) {
    const [theme_blur,] = useSpring({
        from: {opacity: 0, background: "rgba(0,0,0,0)", pointerEvents: "none"},
        to: {opacity: 1, background: theme.blur_bg, pointerEvents: "all"},
        reverse: !open,
    }, [open])
    
    return (
        <animated.div onClick={closeModal} style={theme_blur} className={styles.modal_overlay}/>
    )
}