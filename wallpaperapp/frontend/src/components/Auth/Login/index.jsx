import { animated } from "@react-spring/web"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setToken } from "redux/authSlice";

import styles from "../styles.module.css"
import {clientAxios} from "api/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "components/Root/themeProvider";


const LOGIN_URL = "/auth/login/"

export default function Login({ to_register }) {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm({shouldUseNativeValidation: true});
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)

    const onSubmit = (data) => {
        const promise = clientAxios.post(LOGIN_URL, {
            username: data.username,
            password: data.password,
        }).then((response) => {
            dispatch(setToken({token: response.data.access}))
            navigate("/profile")
        }).catch((err) => {
            toast.error(err.message)
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