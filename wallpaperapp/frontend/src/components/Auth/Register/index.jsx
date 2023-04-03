import { animated } from "@react-spring/web"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import styles from "../styles.module.css"
import {clientAxios} from "api/axios";


const REGISTER_URL = "/auth/register/"


export default function Register({ theme, to_login }) {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });

    const onSubmit = (form) => {
        const promise = clientAxios.post(REGISTER_URL, {
            username: form.username,
            email: form.email,
            password: form.password,
            password2: form.password2,
        }).then((response) => {
            console.log(response)
            to_login()
        }).catch((err) => {
            if (err.response) {
                const data = err.response.data
                console.log(data)
                data?.email && toast.error(data.email)
                data?.password && toast.error(data.password)
            } else if (err.requset) {
                console.log(err.requset)
            } else {
                console.log(err)
                toast.error(err.message)
            }
            throw err
        })

        toast.promise(promise, {
            loading: "Registring ...",
            error: "Failed to register",
            success: "Registerd successfully",
        })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.title}>Register</h2>
            <div className={styles.inputbox}>
                <input type="text" placeholder=" " autoComplete="off" {...register("username", { required: true })} />
                <label>Username</label>
            </div>
            <div className={styles.inputbox}>
                <input type="email" placeholder=" " autoComplete="off" {...register("email", { required: true })} />
                <label>Email</label>
            </div>
            <div className={styles.inputbox}>
                <input type="password" placeholder=" "  autoComplete="off" {...register("password", { required: true })} />
                <label>Password</label>
            </div>
            <div className={styles.inputbox}>
                <input type="password" placeholder=" "  autoComplete="off" {...register("password2", { required: true })} />
                <label>Confirm password</label>
            </div>
            <div className={styles.links}>
                <p className={styles.register} onClick={to_login}>Log in</p>
            </div>
            <animated.button className={styles.login} type="submit" style={{ backgroundColor: theme.color, color: theme.backgroundColor }}>Register</animated.button>
        </form>
    )
}