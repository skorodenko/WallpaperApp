import { useTransition, animated } from "@react-spring/web"

import styles from "../styles.module.css"

export default function Wrapper({ children, theme, open, refr }) {
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