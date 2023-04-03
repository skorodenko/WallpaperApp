import { useSpring, useChain, useSpringRef, useTransition, animated, config } from "@react-spring/web"
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import styles from "../styles.module.css"

export default function MenuModal({ theme, open }) {
    const transition = useTransition(open ? [open] : [], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return createPortal(
        transition((style, item) => (
            <animated.div style={{ ...style, color: theme.color, backgroundColor: theme.blur_bg }} className={styles.menu_modal}>
                <Link className={styles.dom_link} to={"/"}>
                    <h2>Home</h2>
                </Link>
                <Link className={styles.dom_link} to={"/profile"}>
                    <h2>Profile</h2>
                </Link>
                <Link className={styles.dom_link} to={"/auth"}>
                    <h2>Log in</h2>
                </Link>
            </animated.div>)),
        document.getElementById("modal")
    )
}