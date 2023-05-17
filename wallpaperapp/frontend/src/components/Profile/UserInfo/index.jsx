import { animated } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { clientAxios } from "api/axios";
import styles from "../styles.module.css"

const userURL = "/auth/user/"

export default function UserInfo() {
    const { data } = useQuery({
        queryKey: ["userInfo"],
        queryFn: () =>
            clientAxios
                .get(userURL)
                .then((res) => res.data)
    })

    return (
        <animated.div className={styles.user_info}>
            <h1>User Info:</h1>
            <section>
                <h2>{data?.username || <Skeleton />}</h2>
                <h2>{data?.email || <Skeleton />}</h2>
            </section>
        </animated.div>
    )
}