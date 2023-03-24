import { useSpring, useChain, useSpringRef, useTransition, animated, config } from "@react-spring/web"

import styles from "../styles.module.css"

export default function MenuModal({ open, theme }) {

    const [style,] = useSpring({
        from: { opacity: 0, pointerEvents: "none" },
        to: { opacity: 1, pointerEvents: "all" },
        reverse: !open,
    }, [open])

    return (
        <animated.div style={{ ...style, color: theme.color, backgroundColor: theme.blur_bg }} className={styles.menu_modal}>
            <h3>TEST</h3>
        </animated.div>
    )
}