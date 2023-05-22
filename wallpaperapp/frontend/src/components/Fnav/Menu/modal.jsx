import { useTransition, animated } from "@react-spring/web"
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import styles from "../styles.module.css"
import { useContext } from "react";
import { ThemeContext } from "components/Root/themeProvider";
import { clientAxios } from "api/axios";


export default function MenuModal({ open, user }) {
    const { theme } = useContext(ThemeContext)

    const transition = useTransition(open ? [open] : [], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const logOut = () => {
        clientAxios.post("/auth/user/logout/").then(res => res.data);
    }

    return createPortal(
        transition((style, item) => (
            <animated.div style={{ ...style, color: theme.color, backgroundColor: theme.blur_bg }} className={styles.menu_modal}>
                <Link className={styles.dom_link} to={"/"}>
                    <h2>Home</h2>
                </Link>
                <Link hidden={!user} className={styles.dom_link} to={"/profile"}>
                    <h2>Profile</h2>
                </Link>
                <Link hidden={user} className={styles.dom_link} to={"/auth"}>
                    <h2>Log in</h2>
                </Link>
                <Link hidden={!user} className={styles.dom_link} reloadDocument={true} onClick={() => logOut()}>
                    <h2>Log out</h2>
                </Link>
            </animated.div>)),
        document.getElementById("modal")
    )
}