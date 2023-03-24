import {animated} from "@react-spring/web"

import styles from "../styles.module.css"

export default function Login({theme}) {
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>Log in</h2>
            <div className={styles.inputbox}>
                <input type="text" required />
                <label>Username/Email</label>
            </div>
            <div className={styles.inputbox}>
                <input type="password" required />
                <label>Password</label>
            </div>
            <div className={styles.links}>
                <a className={styles.register}>Register</a>
                <p className={styles.forget}>Forgot password</p>
            </div>
            <animated.button className={styles.login} style={{backgroundColor: theme.color, color: theme.backgroundColor}}>Log in</animated.button>
        </form>
    )
}