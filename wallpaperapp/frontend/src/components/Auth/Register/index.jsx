import { animated } from "@react-spring/web"

import styles from "../styles.module.css"

export default function Register({ theme, login }) {
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>Register</h2>
            <div className={styles.inputbox}>
                <input type="text" required />
                <label>Username</label>
            </div>
            <div className={styles.inputbox}>
                <input type="text" required />
                <label>Email</label>
            </div>
            <div className={styles.inputbox}>
                <input type="password" required />
                <label>Password</label>
            </div>
            <div className={styles.inputbox}>
                <input type="password" required />
                <label>Confirm password</label>
            </div>
            <div className={styles.links}>
                <p className={styles.register} onClick={login}>Log in</p>
            </div>
            <animated.button className={styles.login} style={{backgroundColor: theme.color, color: theme.backgroundColor}}>Register</animated.button>
        </form>
    )
}