import { animated } from "@react-spring/web"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setToken } from "redux/authSlice";

import styles from "../styles.module.css"
import axios from "api/axios";


const LOGIN_URL = "/auth/login/"

export default function Login({ theme, to_register }) {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm({shouldUseNativeValidation: true});

    const onSubmit = (data) => {
        const promise = axios.post(LOGIN_URL, {
            username: data.username,
            password: data.password,
        }).then((response) => {
            dispatch(setToken(response.data.access))
        }).catch((err) => {
            if (err.response) {
                const data = err.response.data
                console.log(data)
            } else if (err.requset) {
                console.log(err.requset)
            } else {
                console.log(err)
                toast.error(err.message)
            }
            throw err
        })

        toast.promise(promise, {
            loading: "Logging in...",
            success: "Logged in successfully",
            error: "Failed to login",
        })
    } 
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.title}>Log in</h2>
            <div className={styles.inputbox}>
                <input type="text" placeholder=" " autoComplete="off"  {...register("username", { required: true })} />
                <label>Username</label>
            </div>
            <div className={styles.inputbox}>
                <input type="password" placeholder=" " autoComplete="off"  {...register("password", { required: true })} />
                <label>Password</label>
            </div>
            <div className={styles.links}>
                <p className={styles.register} onClick={to_register}>Register</p>
                <p className={styles.forget}>Forgot password</p>
            </div>
            <animated.button type="submit" className={styles.login} style={{backgroundColor: theme.color, color: theme.backgroundColor}}>Log in</animated.button>
        </form>
    )
}