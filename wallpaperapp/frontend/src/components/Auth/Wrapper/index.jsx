import { useTransition, animated } from "@react-spring/web"

import styles from "../styles.module.css"
import { useContext } from "react"
import { ThemeContext } from "components/Root/themeProvider"

export default function Wrapper({ children, open, refr }) {
    const {theme} = useContext(ThemeContext)

    const transition = useTransition(open ? [open] : [], {
        from: {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        enter: {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        },
        leave: {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        ref: refr,
    })

    return transition((style, item) => (
        <animated.div className={styles.wrapper} style={{ ...style, ...theme, backgroundColor: theme.blur_bg, transform: "translate(-50%,-50%)" }}>
            {children}
        </animated.div>
    ))
}