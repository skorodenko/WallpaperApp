import { useSpring, useChain, useSpringRef, useTransition, animated, config } from "@react-spring/web"

import styles from "../styles.module.css"

export default function Wrapper({ children, theme }) {
    return (
        <animated.div className={styles.wrapper} style={{...theme, backgroundColor: theme.blur_bg}}>
            {children}
        </animated.div>
    )
}