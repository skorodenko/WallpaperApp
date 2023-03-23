import { useSpring, useChain, useSpringRef, useTransition, animated, config } from "@react-spring/web"

import styles from "../styles.module.css"

export default function MenuModal({ open, theme }) {

    const [style,] = useSpring({
        from: { opacity: 0},
        to: { opacity: 0.95},
        reverse: !open,
    }, [open])

    const [theme_blur,] = useSpring({
        from: {opacity: 0, background: "rgba(0,0,0,0)"},
        to: {opacity: 1, background: theme.blur_bg},
        reverse: !open,
    }, [open])

    return (
        <animated.div style={theme_blur} className={styles.modal_overlay}>
            <animated.div style={{ ...style, color: theme.color, backgroundColor: theme.blur_bg }} className={styles.menu_modal}>
                <h3>TEST</h3>
            </animated.div>
        </animated.div>
    )
}