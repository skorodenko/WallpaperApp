import { animated } from "@react-spring/web";

import styles from "../styles.module.css"

export default function UserInfo() {
    return (
        <animated.div className={styles.user_info}>
            User info
        </animated.div>
    )
}