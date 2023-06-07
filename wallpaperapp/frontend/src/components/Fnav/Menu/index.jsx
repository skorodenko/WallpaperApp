import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web"

import MenuModal from "./modal";
import Overlay from "./overlay"

import styles from "../styles.module.css"
import { clientAxios } from "api/axios";
import { useQuery } from "@tanstack/react-query";

const verifyAuth = async () => {
    const res = await clientAxios.get("/auth/user/").then(res => res.data)
    return res
}

export default function Menu() {
    const [open, setOpen] = useState(false)
    const [domReady, setDomReady] = useState(false)

    const { data } = useQuery({
        queryKey: ["verifyUser"],
        queryFn: verifyAuth,
        cacheTime: 100,
    })
    
    useEffect(() => setDomReady(true), [domReady])

    const theme_central = useSpring({ from: { x1: 3, x2: 21 }, to: { x1: 12, x2: 12 }, reverse: !open })
    const theme_upper = useSpring({ from: { y2: 4 }, to: { y2: 20 }, reverse: !open })
    const theme_lower = useSpring({ from: { y2: 20 }, to: { y2: 4 }, reverse: !open })

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.menu}
                onClick={() => setOpen(!open)}
            >
                <animated.line x1="3" y1="4" x2="21" y2={theme_upper.y2} />
                <animated.line x1={theme_central.x1} y1="12" x2={theme_central.x2} y2="12" />
                <animated.line x1="3" y1="20" x2="21" y2={theme_lower.y2} />
            </svg>

            {domReady && <MenuModal open={open} user={data} />}
            {domReady && <Overlay open={open} closeModal={() => setOpen(false)} />}
        </>
    )
}